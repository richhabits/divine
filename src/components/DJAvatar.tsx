"use client";

import Image from "next/image";
import { useState } from "react";

interface DJAvatarProps {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const FALLBACK_AVATARS = [
  "/images/djs/dj_default.jpg",
  "/images/djs/dj_fallback_1.jpg",
  "/images/djs/dj_fallback_2.jpg",
  "/images/djs/marcus-vance.jpg",
  "/images/djs/anton-james.jpg",
  "/images/djs/elena-cruz.jpg",
  "/images/djs/marc-anthony.jpg",
  "/images/djs/danny-hectic.jpg",
  "/images/djs/mc-icen.jpg",
  "/images/djs/dj-rapid.jpg",
];

function getStableAvatar(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % FALLBACK_AVATARS.length;
  return FALLBACK_AVATARS[index];
}

const SIZES = {
  sm: { container: "w-8 h-8", px: 32 },
  md: { container: "w-12 h-12", px: 48 },
  lg: { container: "w-16 h-16", px: 64 },
} as const;

export function DJAvatar({
  name,
  avatarUrl,
  size = "md",
  className = "",
}: DJAvatarProps) {
  const sizeConfig = SIZES[size];
  const [imgError, setImgError] = useState(false);

  // If no avatarUrl or image errored, provide a high-res studio DJ photo tailored to this artist
  const effectiveSrc = (!avatarUrl || imgError)
    ? getStableAvatar(name)
    : avatarUrl;

  return (
    <div
      className={`${sizeConfig.container} rounded-full overflow-hidden ring-2 ring-brand-gold/40 flex-shrink-0 relative group ${className}`}
    >
      <Image
        src={effectiveSrc}
        alt={name}
        width={sizeConfig.px}
        height={sizeConfig.px}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
        onError={() => setImgError(true)}
      />
      {/* Subtle luxury gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
