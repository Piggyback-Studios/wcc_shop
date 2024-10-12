import { Button } from "@/src/shared/types";
import { useState } from "react";

const CustomButton = ({
  label,
  type = "submit",
  disabled = false,
  onClick,
  className = "",
}: Button) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-background hover:bg-primary-600 text-primary-800 font-semibold hover:text-white py-2 px-4 border border-primary-600 hover:border-transparent rounded ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label.toUpperCase()}
    </button>
  );
};

export default CustomButton;
