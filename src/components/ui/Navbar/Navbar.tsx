"use client";

import React from "react";
import Link from "next/link";

import styles from "./component.module.css";
import { logoText, rightMenuItems } from "./content.json";
import { useCartContext } from "@/src/context/Cart";
import { IMenuItem, ISideMenu } from "./navbar.types";
import ContentContainer from "@/src/components/common/ContentContainer";

const CartMenuItem = ({ link }: IMenuItem) => {
  const [cart] = useCartContext();
  return (
    <Link href={link || ""} className={styles.menu_item}>
      {cart.totalCartItemsQuantity > 0 && (
        <span className={styles.cart_total_items}>
          {cart.totalCartItemsQuantity}
        </span>
      )}
      cart
    </Link>
  );
};

const SideMenu = ({ menuItems, className }: ISideMenu) => {
  return (
    <div className={className}>
      {menuItems.map((item: IMenuItem) => {
        switch (item.name) {
          case "cart":
            return (
              <CartMenuItem
                {...item}
                key={item.name + Math.round(Math.random() * 100)}
              />
            );
          default:
            return (
              <Link
                href={item.link || ""}
                className={styles.menu_item}
                key={item.name + Math.round(Math.random() * 100)}
              >
                {item.name}
              </Link>
            );
        }
      })}
    </div>
  );
};

interface INavLogo {
  logoText: string;
  className: string;
}
const NavLogo = ({ logoText }: INavLogo) => {
  return (
    <h1>
      <Link href="/">{logoText}</Link>
    </h1>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-center bg-primary-500 h-24 z-50">
      <ContentContainer>
        <div className="flex justify-between items-center">
          <NavLogo className={styles.logo} logoText={logoText} />
          <SideMenu
            className={styles.nav_menu}
            menuItems={rightMenuItems as IMenuItem[]}
          />
        </div>
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
