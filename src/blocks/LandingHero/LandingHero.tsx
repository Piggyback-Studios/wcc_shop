import ContentContainer from "@/src/components/common/ContentContainer";
import Image from "next/image";

const LandingHero = () => {
  return (
    <section className="min-h-screen">
      <ContentContainer>
        <div className="grid md:grid-cols-2">
          <p>hello</p>
          <div>
            <Image
              width={1024}
              height={1024}
              src="/svg/blob-shape.svg"
              alt="blob"
            />
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default LandingHero;
