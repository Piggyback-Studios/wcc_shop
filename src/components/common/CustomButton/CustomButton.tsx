import { Button } from "@/src/shared/types";
import { useState } from "react";

const CustomButton = ({ label, type = "submit", disabled = false }: Button) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-primary-500 hover:bg-black hover:text-white p-4 flex items-center justify-between gap-4 text-xl w-fit rounded-lg"
      type={type}
      disabled={disabled}
    >
      <span>{label.toUpperCase()}</span>
    </button>
  );
};

export default CustomButton;
