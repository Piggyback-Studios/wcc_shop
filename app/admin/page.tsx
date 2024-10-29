import Spacer from "@/src/blocks/ui/Spacer";

import SignIn from "@/src/blocks/SignIn";

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <SignIn />
      <Spacer size="lg" />
    </main>
  );
}
