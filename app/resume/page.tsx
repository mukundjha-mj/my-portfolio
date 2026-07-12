import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `Resume | ${profile.name}`,
  description: `Resume — ${profile.name}, ${profile.role}.`,
};

export default function ResumePage() {
  return (
    <div className="h-screen w-full">
      <iframe
        src="/resume.pdf#view=Fit"
        title={`${profile.name} — Resume`}
        className="h-full w-full"
      />
    </div>
  );
}
