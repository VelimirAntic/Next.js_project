import Link from "next/link";
import React from "react";

interface NavLinkProps {
  className?: string;
  children: any;
  to: string;
}

const NavLink = ({ className, children, to }: NavLinkProps) => {
  return (
    <Link href={to}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default NavLink;
