import { ContactProps } from "@/src/shared/types";
import { globalContactFormData, SITE_INFO } from "../global.data";

export const contactFormData: ContactProps = {
  title: "Contact Us",
  addressLine1: SITE_INFO.ADDRESS_LINE_1,
  addressLine2: SITE_INFO.ADDRESS_LINE_2,
  phoneNumber: {
    label: SITE_INFO.PHONE_NUMBER,
    href: SITE_INFO.PHONE_NUMBER_LINK,
  },
  email: {
    label: SITE_INFO.EMAIL_ADDRESS,
    href: SITE_INFO.EMAIL_ADDRESS_LINK,
  },
  socials: [],
  ...globalContactFormData,
};
