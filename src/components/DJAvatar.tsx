interface DJAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((word) => !word.startsWith("("))
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const SIZES = {
  sm: { container: "w-8 h-8", text: "text-[10px]" },
  md: { container: "w-12 h-12", text: "text-sm" },
  lg: { container: "w-16 h-16", text: "text-lg" },
} as const;

export function DJAvatar({
  name,
  avatarUrl,
  size = "md",
  className = "",
}: DJAvatarProps) {
  const sizeClasses = SIZES[size];

  if (avatarUrl) {
    return (
      <div
        className={`${sizeClasses.container} rounded-full overflow-hidden ring-2 ring-brand-gold/40 flex-shrink-0 ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses.container} rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-brand-gold/30 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.05) 100%)",
      }}
    >
      <span
        className={`${sizeClasses.text} font-bold text-brand-gold tracking-wider`}
      >
        {getInitials(name)}
      </span>
    </div>
  );
}
