import React, { forwardRef } from "react";

import { default as NextLink } from "next/link";

const Link = ({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  props?: any;
}) => {
  return (
    <NextLink href={href} passHref={true}>
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

interface MenuLinkProps {
  children: React.ReactNode;
  href: string;
  props?: any;
}

export const MenuLink = forwardRef(
  ({ children, href, ...props }: MenuLinkProps, ref: any) => {
    return (
      <NextLink href={href}>
        <a ref={ref} {...props}>
          {children}
        </a>
      </NextLink>
    );
  }
);

export default Link;
