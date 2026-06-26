import Image from "next/image";
import { cn } from "@/lib/amison-crm/format";

const brandVariants = {
  full: {
    src: "/brand/amison-logo-light.jpg",
    alt: "AMISON S.A.",
    width: 760,
    height: 207,
  },
  icon: {
    src: "/brand/amison-icon.png",
    alt: "Isotipo AMISON",
    width: 112,
    height: 99,
  },
  light: {
    src: "/brand/amison-logo-light.jpg",
    alt: "AMISON S.A. logo claro",
    width: 760,
    height: 207,
  },
  dark: {
    src: "/brand/amison-logo-dark.jpg",
    alt: "AMISON S.A. logo oscuro",
    width: 760,
    height: 257,
  },
  horizontal: {
    src: "/brand/amison-horizontal.jpg",
    alt: "AMISON S.A. horizontal",
    width: 760,
    height: 204,
  },
} as const;

export type BrandLogoVariant = keyof typeof brandVariants;

export function BrandLogo({
  variant = "full",
  className,
  priority = false,
}: {
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
}) {
  const asset = brandVariants[variant];

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
      sizes={variant === "icon" ? "64px" : "(max-width: 768px) 180px, 280px"}
    />
  );
}
