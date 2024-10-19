import Spacer from "@/src/blocks/ui/Spacer";

import Contact from "@/src/blocks/Contact";

import { contactFormData } from "@/src/shared/data/pages/contact.data";

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <Contact {...contactFormData} />
      <Spacer size="lg" />
    </main>
  );
}
