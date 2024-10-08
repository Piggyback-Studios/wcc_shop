import dayjs from "dayjs";

import Link from "next/link";
import ContentContainer from "@/src/components/common/ContentContainer";
import { FooterProps } from "@/src/shared/types";

const Footer = ({}: FooterProps) => {
  return (
    <footer>
      <ContentContainer>
        <div className="grid md: grid-cols-3"></div>
        <div>
          Built with love by{" "}
          <Link href="www.piggybackstudios.co">Piggyback Studios, LLC</Link>{" "}
          {dayjs().year()}
        </div>
      </ContentContainer>
    </footer>
  );
};

export default Footer;
