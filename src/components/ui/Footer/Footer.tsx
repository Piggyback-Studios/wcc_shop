import dayjs from "dayjs";

import Link from "next/link";
import ContentContainer from "@/src/components/common/ContentContainer";
import { FooterProps } from "@/src/shared/types";
import { pageLinks } from "@/src/shared/data/global.data";

const Footer = ({}: FooterProps) => {
  return (
    <footer className="flex justify-center my-8">
      <ContentContainer>
        <div className="grid md:grid-cols-3 mb-8">
          <div>
            <h6>LINKS</h6>
            <ul>
              {pageLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6>FOLLOW</h6>
            <ul>
              {pageLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6>LEGAL</h6>
            <ul>
              {pageLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-end">
          Built with love by{" "}
          <Link href="https://www.piggybackstudios.co">
            Piggyback Studios, LLC
          </Link>{" "}
          {dayjs().year()}
        </div>
      </ContentContainer>
    </footer>
  );
};

export default Footer;
