"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export type GuestbookState = {
  error?: string;
  success?: boolean;
};

export async function addEntry(
  _prev: GuestbookState,
  formData: FormData,
): Promise<GuestbookState> {
  const user = await currentUser();
  if (!user) {
    return { error: "You must be signed in to post." };
  }

  const body = ((formData.get("message") as string | null) ?? "").trim();
  if (!body) return { error: "Message can't be empty." };
  if (body.length > 500) return { error: "Message is too long (500 max)." };

  await prisma.guestbookEntry.create({
    data: {
      body,
      authorId: user.id,
      authorName: user.fullName ?? user.username ?? null,
      authorImage: user.imageUrl,
    },
  });

  revalidatePath("/guestbook");
  return { success: true };
}

export async function addReply(
  _prev: GuestbookState,
  formData: FormData,
): Promise<GuestbookState> {
  const user = await currentUser();
  if (!user) {
    return { error: "You must be signed in to reply." };
  }

  const parentId = (formData.get("parentId") as string | null) ?? "";
  const body = ((formData.get("message") as string | null) ?? "").trim();
  if (!parentId) return { error: "Missing parent note." };
  if (!body) return { error: "Reply can't be empty." };
  if (body.length > 500) return { error: "Reply is too long (500 max)." };

  const parent = await prisma.guestbookEntry.findUnique({
    where: { id: parentId },
    select: { id: true, parentId: true },
  });
  if (!parent) return { error: "That note no longer exists." };

  // Keep threading single-level: replying to a reply attaches to its
  // top-level parent instead of nesting further.
  const targetParentId = parent.parentId ?? parent.id;

  await prisma.guestbookEntry.create({
    data: {
      body,
      authorId: user.id,
      authorName: user.fullName ?? user.username ?? null,
      authorImage: user.imageUrl,
      parentId: targetParentId,
    },
  });

  revalidatePath("/guestbook");
  return { success: true };
}

export async function editEntry(
  _prev: GuestbookState,
  formData: FormData,
): Promise<GuestbookState> {
  const user = await currentUser();
  if (!user) {
    return { error: "You must be signed in to edit." };
  }

  const entryId = (formData.get("entryId") as string | null) ?? "";
  const body = ((formData.get("message") as string | null) ?? "").trim();
  if (!entryId) return { error: "Missing note." };
  if (!body) return { error: "Message can't be empty." };
  if (body.length > 500) return { error: "Message is too long (500 max)." };

  const entry = await prisma.guestbookEntry.findUnique({
    where: { id: entryId },
    select: { id: true, authorId: true, deleted: true },
  });
  if (!entry || entry.deleted) return { error: "That note no longer exists." };
  // Only the original author can edit — never someone else's words.
  if (entry.authorId !== user.id) {
    return { error: "You can only edit your own messages." };
  }

  await prisma.guestbookEntry.update({
    where: { id: entryId },
    data: { body, editedAt: new Date() },
  });

  revalidatePath("/guestbook");
  return { success: true };
}

export async function deleteEntry(entryId: string): Promise<GuestbookState> {
  const user = await currentUser();
  if (!user) {
    return { error: "You must be signed in to delete." };
  }

  const entry = await prisma.guestbookEntry.findUnique({
    where: { id: entryId },
    select: { id: true, deleted: true },
  });
  if (!entry) return { error: "That note no longer exists." };
  if (entry.deleted) return { success: true };

  // Soft delete (Reddit-style): the row stays — so reply threads don't
  // break — but the body is hidden and replaced with a "deleted by" note
  // in the UI. Any signed-in guestbook user can delete any entry.
  await prisma.guestbookEntry.update({
    where: { id: entryId },
    data: {
      deleted: true,
      deletedByName: user.fullName ?? user.username ?? "someone",
    },
  });

  revalidatePath("/guestbook");
  return { success: true };
}

export async function getEntries() {
  return prisma.guestbookEntry.findMany({
    where: { parentId: null },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      replies: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}
