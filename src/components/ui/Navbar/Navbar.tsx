"use client";

import React from "react";
import Link from "next/link";

import { useCartContext } from "@/src/context/Cart";
import ContentContainer from "@/src/components/common/ContentContainer";
import { NavbarProps } from "@/src/shared/types";
import CustomHamburger from "@/src/components/ui/AnimatedHamburgerIcon";

const Navbar = ({ logo, links }: NavbarProps) => {
  const [cart] = useCartContext();
  const determineSize = () => {
    if (cart.totalCartProductsQuantity < 10) return "p-2";
    else if (cart.totalCartProductsQuantity < 100) return "p-3";
    else return "p-4";
  };
  return (
    <nav className="fixed top-0 w-full flex items-center justify-center h-24 z-50">
      <ContentContainer>
        <div className="flex justify-between items-center">
          <Link href="/">{logo}</Link>
          <CustomHamburger />
          <ul className="hidden md:flex flex-row gap-6">
            {links.map((link, idx) => (
              <li key={idx} className="relative">
                {link.label === "cart" && cart.totalCartProductsQuantity ? (
                  <span
                    className={`bg-primary-500 rounded-full absolute top-0 right-0 -translate-y-2/3 translate-x-1/2 h-4 w-4 flex items-center justify-center ${determineSize()}  text-xs`}
                  >
                    {cart.totalCartProductsQuantity < 100
                      ? cart.totalCartProductsQuantity
                      : "100+"}
                  </span>
                ) : (
                  ""
                )}
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
