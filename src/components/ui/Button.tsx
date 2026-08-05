import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  href: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo text-white hover:bg-indigo-deep shadow-[0_10px_30px_-10px_rgba(79,70,229,0.55)]",
  secondary:
    "bg-transparent border border-[#25D366]/40 rounded-full text-[#25D366] hover:bg-[#25D366]/10 active:bg-[#25D366]/20",
  ghost:
    // "bg-transparent text-ink border border-ink-line hover:border-indigo hover:text-indigo",
    "bg-transparent text-indigo border border-indigo hover:border-indigo hover:text-indigo",
};

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
