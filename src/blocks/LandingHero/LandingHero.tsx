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
          <div className="grid grid-rows-3 grid-cols-3 gap-4 md:gap-8">
            {/* TODO: make these videos gifs. performance is awful using video */}
            {/* TODO: make cart store in local storage */}
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
