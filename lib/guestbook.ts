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

export async function getEntries() {
  return prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}
