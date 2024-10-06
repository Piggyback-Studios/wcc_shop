import { SpacerProps, SpacerSize } from "@/src/shared/types";

const Spacer = ({ size }: SpacerProps) => {
  const determineClass = (size: SpacerSize) => {
    switch (size) {
      case "sm":
        return "h-12 md:h-16";
      case "md":
        return "h-16 md:h-24";
      case "lg":
        return "h-24 md:h-32";
      default:
        return;
    }
  };
  return <div className={determineClass(size)}></div>;
};

export default Spacer;
