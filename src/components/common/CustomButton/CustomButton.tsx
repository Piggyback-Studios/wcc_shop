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
      className={`w-fit bg-light-100 hover:bg-primary-600 font-semibold py-2 px-4 border border-dark hover:border-transparent rounded ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label.toUpperCase()}
    </button>
  );
};

export default CustomButton;
