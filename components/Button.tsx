import Link from "next/link";
import React from "react";

interface ButtonProps {
  onClick?: any;
  theme?: "primary" | "white";
  className?: string;
  children?: any;
  type?: "submit" | "button" | "reset";
  to?: string;
}

const Button = ({
  onClick,
  theme = "primary",
  className,
  children,
  type = "button",
  to,
}: ButtonProps) => {
  if (to)
    return (
      <Link href={to}>
        <a className={`btn btn-${theme} ${className}`}>{children}</a>
      </Link>
    );

  return (
    <button
      type={type}
      className={`btn btn-${theme} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
