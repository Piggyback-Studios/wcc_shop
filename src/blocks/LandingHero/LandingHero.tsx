import ContentContainer from "@/src/components/common/ContentContainer";
import { LandingHeroProps } from "@/src/shared/types";
import Image from "next/image";

const LandingHero = ({
  tagline,
  headline,
  description,
  cta,
  videos,
}: LandingHeroProps) => {
  return (
    <section>
      <ContentContainer>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h6>{tagline}</h6>
            <h1 className="mb-4">{headline}</h1>
            <p>{description}</p>
            <>{cta}</>
          </div>
          <div className="grid grid-rows-3 grid-cols-3">
            {videos && videos.map((video, idx) => <div></div>)}
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default LandingHero;
