import Link from "next/link";

const LOGO_URL =
  "https://media.base44.com/images/public/6a6b339f45b1c3b04b3ee678/9004751bf_dxbvipcom_logo.svg";

interface LogoProps {
  className?: string;
  light?: boolean;
  src?: string | null;
}

export default function Logo({
  className = "h-9",
  light = false,
  src,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="DXB-VIP home"
    >
      <img
        src={src || LOGO_URL}
        alt="DXB-VIP Business Setup Consultants"
        className={`h-full w-auto transition-all duration-500 ${
          light ? "brightness-0 invert" : ""
        }`}
      />
    </Link>
  );
}