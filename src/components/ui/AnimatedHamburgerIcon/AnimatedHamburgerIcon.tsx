import Hamburger from "hamburger-react";

import { useSidebarContext } from "@/src/context/Sidebar";

const CustomHamburger = () => {
  const [sidebar, setSidebar] = useSidebarContext();

  return (
    <div className="md:hidden z-50">
      <Hamburger
        toggled={sidebar.isOpen || undefined}
        toggle={() => setSidebar({ isOpen: !sidebar.isOpen })}
      />
    </div>
  );
};

export default CustomHamburger;
