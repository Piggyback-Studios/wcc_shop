import React from "react";

import styles from "./component.module.css";
import { leftMenuItems, logoText, rightMenuItems } from "./content.json";

interface IMenuItem {
  name: string;
}

interface ISideMenu {
  menuItems: IMenuItem[];
  className: string;
}

const SideMenu = ({ menuItems, className }: ISideMenu) => {
  return (
    <div className={className}>
      {menuItems.map((item) => (
        <span className={styles.menu_item}>{item.name}</span>
      ))}
    </div>
  );
};

interface INavLogo {
  logoText: string;
  className: string;
}
const NavLogo = ({ logoText }: INavLogo) => {
  return <div>{logoText}</div>;
};

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <SideMenu className={styles.nav_menu} menuItems={leftMenuItems} />
      <NavLogo className={styles.logo} logoText={logoText} />
      <SideMenu className={styles.nav_menu} menuItems={rightMenuItems} />
    </div>
  );
};

export default Navbar;
