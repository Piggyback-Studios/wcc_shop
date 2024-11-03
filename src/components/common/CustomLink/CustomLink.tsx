"use client";

import Link from "next/link";

import { Link as LinkT } from "@/src/shared/types";
import { useState } from "react";

const CustomLink = ({
  href,
  label,
  arrowColor = "white",
}: LinkT & { arrowColor?: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="w-fit bg-light-100 hover:bg-dark-900 hover:text-light-100 font-semibold py-2 px-4 border border-dark hover:border-transparent rounded"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={`transition-all ${hovered ? "scale-105" : ""}`}>
        {label.toUpperCase()}
      </span>
    </Link>
  );
};

export default CustomLink;
