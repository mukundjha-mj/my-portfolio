"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth, signIn, signOut } from "@/auth";

export type GuestbookState = {
  error?: string;
  success?: boolean;
};

export async function addEntry(
  _prev: GuestbookState,
  formData: FormData,
): Promise<GuestbookState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be signed in to post." };
  }

  const body = ((formData.get("message") as string | null) ?? "").trim();
  if (!body) return { error: "Message can't be empty." };
  if (body.length > 500) return { error: "Message is too long (500 max)." };

  await prisma.guestbookEntry.create({
    data: { body, userId: session.user.id },
  });

  revalidatePath("/guestbook");
  return { success: true };
}

export async function getEntries() {
  return prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { name: true, image: true } } },
  });
}

export async function signInGitHub() {
  await signIn("github", { redirectTo: "/guestbook" });
}

export async function signInGoogle() {
  await signIn("google", { redirectTo: "/guestbook" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/guestbook" });
}
