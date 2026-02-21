import { lazy, Suspense } from "react";
import { motion, type Variants } from "framer-motion";
import { BackgroundAnimeCards } from "../Components";
import { useInViewAnimation } from "../utils/hooks";
import narutoRun from "../assets/images/narutoRun.gif";
import HeroSection from "./LandingSections/HeroSection";
import FeaturesSection from "./LandingSections/FeaturesSection";
import CTASection from "./LandingSections/CTASection";

const Testimonials = lazy(() => import("../Components/Testimonials"));
const FlagContainer = lazy(() => import("../Components/FlagContainer"));
const RunningImg = lazy(() => import("../Components/UI/RunningImg"));

const FADE_IN: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" as const } },
};

const IMAGE_ANIM: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" as const } },
};

const SECTION_CLASS = "container py-16 lg:py-24";
const TWO_COL_CLASS = "lg:grid lg:grid-cols-2 lg:gap-x-20 lg:items-center";

const Landing = () => {
  const { controls: heroControls, ref: heroRef } = useInViewAnimation();
  const { controls: testimonialsControls, ref: testimonialsRef } = useInViewAnimation();
  const { controls: featuresControls, ref: featuresRef } = useInViewAnimation();
  const { controls: ctaControls, ref: ctaRef } = useInViewAnimation();

  return (
    <div className="landing-wrapper overflow-hidden bg-[var(--backgroundColor)]">
      <nav className="mx-auto flex items-center w-[var(--fluid-width)] max-w-[var(--max-width)] h-[var(--nav-height)]">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-row justify-between items-center fixed top-[5%] right-[5%] z-[100]">
            <FlagContainer />
          </div>
        </Suspense>
      </nav>
      <main className="pb-0 relative">
        <Suspense fallback={<div>Loading...</div>}>
          <RunningImg img={narutoRun} />
        </Suspense>

        <HeroSection
          controls={heroControls}
          ref={heroRef}
          fadeIn={FADE_IN}
          imageAnim={IMAGE_ANIM}
          sectionClass={SECTION_CLASS}
          twoColClass={TWO_COL_CLASS}
        />

        <motion.div
          className={`${SECTION_CLASS} flex flex-col items-center justify-center`}
          initial="hidden"
          animate={testimonialsControls}
          ref={testimonialsRef}
          variants={FADE_IN}
        >
          <Testimonials />
        </motion.div>

        <FeaturesSection
          controls={featuresControls}
          ref={featuresRef}
          fadeIn={FADE_IN}
          imageAnim={IMAGE_ANIM}
          sectionClass={SECTION_CLASS}
          twoColClass={TWO_COL_CLASS}
        />

        <CTASection
          controls={ctaControls}
          ref={ctaRef}
          fadeIn={FADE_IN}
          imageAnim={IMAGE_ANIM}
          sectionClass={SECTION_CLASS}
          twoColClass={TWO_COL_CLASS}
        />

        <BackgroundAnimeCards />
      </main>
    </div>
  );
};

export default Landing;
