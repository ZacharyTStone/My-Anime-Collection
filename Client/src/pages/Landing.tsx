import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaCheck } from "react-icons/fa";
import { BackgroundAnimeCards } from "../Components";
import { useInViewAnimation } from "../utils/hooks";
import aot from "../assets/images/aot.png";
import goku from "../assets/images/goku.webp";
import lucy from "../assets/images/lucy.webp";
import narutoRun from "../assets/images/narutoRun.gif";

const Testimonials = lazy(() => import("../Components/Testimonials"));
const FlagContainer = lazy(() => import("../Components/FlagContainer"));
const RunningImg = lazy(() => import("../Components/UI/RunningImg"));

const FADE_IN_ANIMATION = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" as const },
  },
};

const IMAGE_ANIMATION = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" as const },
  },
};

const LIST_ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.5,
    },
  }),
};

const FEATURE_POINTS = ["point1", "point2", "point3", "point4", "point5", "point6"];

const SECTION_CLASS = "container py-16 lg:py-24";
const TWO_COL_CLASS = "lg:grid lg:grid-cols-2 lg:gap-x-20 lg:items-center";

const Landing = () => {
  const { t } = useTranslation();

  const { controls: controls1, ref: ref1 } = useInViewAnimation();
  const { controls: controls2, ref: ref2 } = useInViewAnimation();
  const { controls: controls3, ref: ref3 } = useInViewAnimation();
  const { controls: controls4, ref: ref4 } = useInViewAnimation();

  return (
    <main className="landing-wrapper overflow-hidden" style={{ backgroundColor: "var(--backgroundColor)" }}>
      <nav
        className="mx-auto flex items-center"
        style={{ width: "var(--fluid-width)", maxWidth: "var(--max-width)", height: "var(--nav-height)" }}
      >
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

        {/* Hero Section */}
        <motion.div
          className={`${SECTION_CLASS} ${TWO_COL_CLASS}`}
          initial="hidden"
          variants={FADE_IN_ANIMATION}
          animate={controls1}
          ref={ref1}
        >
          <div>
            <h1 className="font-bold tracking-[-0.03em] leading-[1.2] mb-6 text-3xl lg:text-5xl">
              <span className="text-primary-600">{t("landing.title")}</span>
            </h1>
            <p className="text-left text-grey-600 text-[1.1rem] leading-[1.7] mb-0 lg:text-[1.2rem]">
              {t("landing.title_description")}
            </p>
            <div className="flex justify-start items-center mt-8 gap-4 flex-wrap lg:flex-nowrap">
              <Link to="/register" className="btn btn-primary hover:-translate-y-0.5!">
                {t("landing.login_button")}
              </Link>
              <Link to="/register-demo" className="btn btn-outline hover:-translate-y-0.5!">
                {t("landing.demo_button")}
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <motion.img
              src={goku}
              alt="anime character"
              className="img main-img h-auto w-full rounded-xl object-cover"
              style={{ transform: "none" }}
              initial="hidden"
              animate={controls1}
              variants={IMAGE_ANIMATION}
            />
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className={`${SECTION_CLASS} flex flex-col items-center justify-center`}
          initial="hidden"
          animate={controls2}
          ref={ref2}
          variants={FADE_IN_ANIMATION}
        >
          <Testimonials />
        </motion.div>

        {/* Features Section */}
        <motion.div
          className={`${SECTION_CLASS} ${TWO_COL_CLASS}`}
          initial="hidden"
          animate={controls3}
          ref={ref3}
          variants={FADE_IN_ANIMATION}
        >
          <div className="hidden lg:block">
            <motion.img
              src={aot}
              alt="anime character"
              loading="lazy"
              className="img main-img h-[110%] w-[110%] rounded-xl object-cover"
              style={{ transform: "none" }}
              initial="hidden"
              animate={controls3}
              variants={IMAGE_ANIMATION}
            />
          </div>

          <div>
            <h3 className="font-semibold mb-6 leading-[1.4] text-xl lg:text-[2rem] lg:mb-8">
              <span className="underline decoration-primary-500 decoration-[3px] underline-offset-[6px]">
                {t("landing.why.title")}
              </span>
            </h3>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={LIST_ITEM_VARIANTS}
            >
              {FEATURE_POINTS.map((point, index) => (
                <motion.li
                  key={point}
                  custom={index}
                  variants={LIST_ITEM_VARIANTS}
                  className="text-grey-700 mb-3 flex items-center text-base leading-[1.6]"
                >
                  <FaCheck color="var(--primary-500)" className="mr-3 shrink-0" />
                  <span className="font-normal text-[var(--black)]">{t(`landing.why.${point}`)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className={`${SECTION_CLASS} ${TWO_COL_CLASS} pb-0 lg:pb-0`}
          initial="hidden"
          animate={controls4}
          ref={ref4}
          variants={FADE_IN_ANIMATION}
        >
          <div className="flex flex-col">
            <h3 className="font-semibold leading-[1.4] text-xl lg:text-[2rem]">
              {t("landing.call_to_action.title")}
            </h3>
            <div className="flex gap-4 mt-8 flex-wrap items-center lg:flex-nowrap">
              <Link to="/register" className="btn btn-primary hover:-translate-y-0.5!">
                {t("landing.login_button")}
              </Link>
              <Link
                to="/register-demo"
                className="btn btn-primary btn-outline hover:-translate-y-0.5!"
              >
                {t("landing.demo_button")}
              </Link>
            </div>
            <h5 className="mt-12 font-normal text-grey-600 text-[0.95rem] leading-[1.6]">
              {t("landing.call_to_action.contact_info")}{" "}
              <a
                href="https://zstone.dev"
                target="_blank"
                rel="noreferrer"
                className="underline text-primary-500 transition-colors duration-200 hover:text-primary-600"
              >
                ZStone.dev
              </a>
            </h5>
          </div>

          <div className="hidden lg:block">
            <motion.img
              src={lucy}
              alt="anime character"
              loading="lazy"
              className="img main-img h-auto w-full rounded-xl object-cover"
              style={{ transform: "none" }}
              initial="hidden"
              animate={controls4}
              variants={IMAGE_ANIMATION}
            />
          </div>
        </motion.div>
        <BackgroundAnimeCards />
      </main>
    </main>
  );
};

export default Landing;
