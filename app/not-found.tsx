import Spacer from "@/src/blocks/ui/Spacer";
import ContentContainer from "@/src/components/common/ContentContainer";
import Image from "next/image";
import Link from "next/link";

const FourOhFourPage = () => {
  return (
    <main className="flex flex-col items-center">
      <Spacer size="lg" />
      <section className="w-full flex justify-center">
        <ContentContainer>
          <div className="flex flex-col items-center justify-center text-center gap-8">
            <Image
              src="/images/404.png"
              width={1024}
              height={1024}
              alt="404 image"
              className="w-full h-auto max-h-[450px] object-contain"
            />
            <h1>There doesn&apos;t seem to be anything here...</h1>
            <p>
              Try going back to the <Link href="/">home page</Link> to find what
              you are looking for!
            </p>
          </div>
        </ContentContainer>
      </section>
      <Spacer size="lg" />
    </main>
  );
};

export default FourOhFourPage;
