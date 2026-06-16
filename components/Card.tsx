import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-soft border border-line bg-white shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
