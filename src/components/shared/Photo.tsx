"use client";
import Image from "next/image";
import { useState } from "react";
type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};
export default function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? "/images/fallback.svg" : src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
