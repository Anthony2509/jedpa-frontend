import { cn } from "@/shared/lib/cn";

interface AvatarProps {
  name: string;
  size?: "sm" | "lg";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Avatar({ name, size = "sm" }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-200 font-semibold text-neutral-700",
        size === "sm" ? "size-8 text-xs" : "size-16 text-lg",
      )}
    >
      {getInitials(name)}
    </span>
  );
}
