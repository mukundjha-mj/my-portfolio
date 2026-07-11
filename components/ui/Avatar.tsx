import Image from "next/image";
import { profile } from "@/content/profile";

/**
 * Circular avatar that zooms into the subject so the surrounding background
 * doesn't show at the edges of the circle. The wrapper clips (overflow-hidden)
 * and carries the ring; the inner image is scaled up from a point near the
 * face so the head stays in frame.
 */
export function Avatar({
  size,
  className = "",
  priority = false,
}: {
  size: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ring-1 ring-border ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={profile.photo}
        alt={profile.name}
        fill
        sizes={`${size}px`}
        preload={priority}
        className="scale-[1.1] object-cover origin-[50%_0]"
      />
    </span>
  );
}
