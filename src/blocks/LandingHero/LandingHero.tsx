import ContentContainer from "@/src/components/common/ContentContainer";
import { LandingHeroProps } from "@/src/shared/types";
import Image from "next/image";

const LandingHero = ({
  tagline,
  headline,
  description,
  cta,
}: LandingHeroProps) => {
  return (
    <section className="min-h-screen">
      <ContentContainer>
        <div className="grid md:grid-cols-2">
          <div>
            <h3>{tagline}</h3>
            <h1>{headline}</h1>
            <p>{description}</p>
            <>{cta}</>
          </div>
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
