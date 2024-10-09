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
      className="flex items-center gap-4"
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
