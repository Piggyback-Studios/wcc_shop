import Link from "next/link";

import ContactForm from "@/src/components/common/ContactForm";
import ContentContainer from "@/src/components/common/ContentContainer";
import { ContactProps } from "@/src/shared/types";
import { globalContactFormData } from "@/src/shared/data/global.data";

const Contact = ({
  title,
  addressLine1,
  addressLine2,
  phoneNumber,
  email,
  socials,
}: ContactProps) => {
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-full flex flex-col justify-between gap-4">
            <h1>{title}</h1>
            <div>
              <Link href={phoneNumber.href}>
                <p>{phoneNumber.label}</p>
              </Link>
              <p>{addressLine1}</p>
              <p>{addressLine2}</p>
              <Link href={email.href}>
                <p>{email.label}</p>
              </Link>
            </div>
            <ul className="flex gap-4">
              {socials.map(({ href, label }, idx) => (
                <Link key={idx} href={href}>
                  {label}
                </Link>
              ))}
            </ul>
          </div>
          <ContactForm {...globalContactFormData} alignment="left" />
        </div>
      </ContentContainer>
    </section>
  );
};

export default Contact;
