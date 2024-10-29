import { LandingHeroProps } from "@/src/shared/types";

import CustomButton from "@/src/components/common/CustomButton";

export const heroData: LandingHeroProps = {
  tagline: "New Arrivals",
  headline: "WINTER COLLECTION 2024",
  description:
    "Lorem ipsum dolor sit amet consectetur. At ultrices libero et congue mauris sed nisl. Eu ac congue arcu urna lorem pellentesque nulla quam. Nunc est ornare at tincidunt velit. Elit viverra feugiat volutpat lorem vulputate dui enim ultricies. ",
  cta: <CustomButton label="SHOP NOW" />,
  videos: [
    {
      src: "/videos/landing-hero/0.mp4",
      alt: "carpentry video 0",
      width: 320,
      height: 240,
    },
    {
      src: "/videos/landing-hero/1.mp4",
      alt: "carpentry video 1",
      width: 320,
      height: 240,
    },
    {
      src: "/videos/landing-hero/2.mp4",
      alt: "carpentry video 2",
      width: 320,
      height: 150,
    },
    {
      src: "/videos/landing-hero/3.mp4",
      alt: "carpentry video 3",
      width: 320,
      height: 150,
    },
    {
      src: "/videos/landing-hero/4.mp4",
      alt: "carpentry video 4",
      width: 320,
      height: 240,
    },
    {
      src: "/videos/landing-hero/5.mp4",
      alt: "carpentry video 5",
      width: 320,
      height: 240,
    },
    {
      src: "/videos/landing-hero/6.mp4",
      alt: "carpentry video 6",
      width: 320,
      height: 240,
    },
    {
      src: "/videos/landing-hero/7.mp4",
      alt: "carpentry video 7",
      width: 320,
      height: 240,
    },
    {
      src: "/videos/landing-hero/8.mp4",
      alt: "carpentry video 8",
      width: 320,
      height: 240,
    },
  ],
};
