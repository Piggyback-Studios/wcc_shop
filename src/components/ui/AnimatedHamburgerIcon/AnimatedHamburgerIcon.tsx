import Hamburger from "hamburger-react";

import { useSidebarContext } from "@/src/context/Sidebar";

const CustomHamburger = () => {
  const [sidebar, setSidebar] = useSidebarContext();

  return (
    <Hamburger
      toggled={sidebar.isOpen || undefined}
      toggle={() => setSidebar({ isOpen: !sidebar.isOpen })}
    />
  );
};

export default CustomHamburger;
