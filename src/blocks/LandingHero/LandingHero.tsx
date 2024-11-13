import ContentContainer from "@/src/components/common/ContentContainer";
import { LandingHeroProps } from "@/src/shared/types";

const LandingHero = ({
  tagline,
  headline,
  description,
  cta,
  videos,
}: LandingHeroProps) => {
  return (
    <section className="w-full flex justify-center">
      <ContentContainer>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h6>{tagline}</h6>
            <h1>{headline}</h1>
            <p>{description}</p>
            {cta}
          </div>
          <div className="grid grid-rows-3 grid-cols-3 gap-4 md:gap-8">
            {videos &&
              videos.map((video, idx) => (
                <div key={idx}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`rounded-lg object-cover position-center h-full w-auto border-2 ${
                      (idx === 3 || idx === 4 || idx === 5) && "ml-4 md:ml-8"
                    }`}
                    width={video.width}
                    height={video.height}
                    preload="none"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
              ))}
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default LandingHero;
