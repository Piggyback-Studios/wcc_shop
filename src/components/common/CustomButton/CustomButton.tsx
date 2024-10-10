import { Button } from "@/src/shared/types";
import { useState } from "react";

const CustomButton = ({
  label,
  type = "submit",
  disabled = false,
  onClick,
}: Button) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="btn-bordered"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{label.toUpperCase()}</span>
    </button>
  );
};

export default CustomButton;
