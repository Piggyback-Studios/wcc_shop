"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import ContentContainer from "@/src/components/common/ContentContainer";
import { NavbarProps } from "@/src/shared/types";
import CustomHamburger from "@/src/components/ui/AnimatedHamburgerIcon";
import { getSession, logout } from "@/src/utils/auth";
import { useRouter } from "next/navigation";
import { useTotalsContext } from "@/src/context/Totals";

const Navbar = ({ logo, links }: NavbarProps) => {
  const [totals] = useTotalsContext();
  const [sessionState, setSessionState] = useState();
  const router = useRouter();

  const determineSize = () => {
    if (totals.totalCartProductsQuantity < 10) return "p-2";
    else if (totals.totalCartProductsQuantity < 100) return "p-3";
    else return "p-4";
  };
  const handleSignOut = async () => {
    const res = await fetch("/api/auth/sign-out", { method: "POST" });
    router.push("/");
    console.log(res);
  };
  // TODO: this is stupid and we need to fix it
  const handleLoad = async () => {
    const session = await getSession();
    setSessionState(session);
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <nav className="fixed top-0 w-full flex items-center justify-center h-24 z-50">
      <ContentContainer>
        <div className="flex justify-between items-center">
          <Link href="/">{logo}</Link>
          <CustomHamburger />
          <ul className="hidden md:flex flex-row gap-6">
            {links.map((link, idx) => (
              <li key={idx} className="relative">
                {link.label === "cart" && totals.totalCartProductsQuantity ? (
                  <span
                    className={`bg-primary-500 rounded-full absolute top-0 right-0 -translate-y-2/3 translate-x-1/2 h-4 w-4 flex items-center justify-center ${determineSize()}  text-xs`}
                  >
                    {totals.totalCartProductsQuantity < 100
                      ? totals.totalCartProductsQuantity
                      : "100+"}
                  </span>
                ) : (
                  ""
                )}
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            {sessionState && <li onClick={() => handleSignOut()}>Sign Out</li>}
          </ul>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
