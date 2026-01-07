import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { BackgroundAnimeCards } from "../Components";
import { useInViewAnimation } from "../utils/hooks";
import aot from "../assets/images/aot.png";
import goku from "../assets/images/goku.webp";
import lucy from "../assets/images/lucy.webp";
import narutoRun from "../assets/images/narutoRun.gif";

const Testimonials = React.lazy(() => import("../Components/Testimonials"));
const FlagContainer = React.lazy(() => import("../Components/FlagContainer"));
const RunningImg = React.lazy(() => import("../Components/UI/RunningImg"));

const StyledFlagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 5%;
  right: 5%;
  z-index: 100;
`;

const StyledButton = styled(Link)`
  &:hover {
    transform: translateY(-2px) !important;
  }
`;

const StyledLoginDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1rem;
`;

// Animation configurations
const FADE_IN_ANIMATION = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const IMAGE_ANIMATION = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" },
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

const FEATURE_POINTS = ["point1", "point2", "point3", "point4", "point5"];

const Landing = () => {
  const { t } = useTranslation();

  const { controls: controls1, ref: ref1 } = useInViewAnimation();
  const { controls: controls2, ref: ref2 } = useInViewAnimation();
  const { controls: controls3, ref: ref3 } = useInViewAnimation();
  const { controls: controls4, ref: ref4 } = useInViewAnimation();

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Wrapper>
        <nav>
          <Suspense fallback={<div>Loading...</div>}>
            <StyledFlagContainer>
              <FlagContainer />
            </StyledFlagContainer>
          </Suspense>
        </nav>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <RunningImg img={narutoRun} />
          </Suspense>
          <HeroSection
            className="container page"
            initial="hidden"
            variants={FADE_IN_ANIMATION}
            animate={controls1}
            ref={ref1}
          >
            <HeroContent>
              <h1>
                <span>{t("landing.title")}</span>
              </h1>
              <p>{t("landing.title_description")}</p>
              <StyledLoginDiv>
                <StyledButton to="/register" className="btn btn-primary">
                  {t("landing.login_button")}
                </StyledButton>
                <StyledButton to="/register-demo" className="btn btn-outline">
                  {t("landing.demo_button")}
                </StyledButton>
              </StyledLoginDiv>
            </HeroContent>
            <ImageContainer>
              <motion.img
                src={goku}
                alt="anime character"
                className="img main-img"
                initial="hidden"
                animate={controls1}
                variants={IMAGE_ANIMATION}
              />
            </ImageContainer>
          </HeroSection>

          <TestimonialsSection
            className="container page"
            initial="hidden"
            animate={controls2}
            ref={ref2}
            variants={FADE_IN_ANIMATION}
          >
            <Testimonials />
          </TestimonialsSection>

          <FeaturesSection
            className="container page"
            initial="hidden"
            animate={controls3}
            ref={ref3}
            variants={FADE_IN_ANIMATION}
          >
            <ImageContainer>
              <motion.img
                src={aot}
                alt="anime character"
                loading="lazy"
                className="img main-img oversized-img"
                initial="hidden"
                animate={controls3}
                variants={IMAGE_ANIMATION}
              />
            </ImageContainer>

            <FeaturesContent>
              <h3>
                <span>{t("landing.why.title")}</span>
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
                  >
                    <FaCheck color="var(--primary-500)" />
                    <span>{t(`landing.why.${point}`)}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </FeaturesContent>
          </FeaturesSection>

          <CallToActionSection
            className="container page last-page"
            initial="hidden"
            animate={controls4}
            ref={ref4}
            variants={FADE_IN_ANIMATION}
          >
            <CallToActionContent>
              <h3>{t("landing.call_to_action.title")}</h3>
              <ButtonGroup>
                <StyledButton to="/register" className="btn btn-primary">
                  {t("landing.login_button")}
                </StyledButton>
                <StyledButton
                  to="/register-demo"
                  className="btn btn-primary btn-outline"
                >
                  {t("landing.demo_button")}
                </StyledButton>
              </ButtonGroup>
              <ContactInfo>
                {t("landing.call_to_action.contact_info")}{" "}
                <ContactLink
                  href="https://zstone.dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  ZStone.dev
                </ContactLink>
              </ContactInfo>
            </CallToActionContent>

            <ImageContainer>
              <motion.img
                src={lucy}
                alt="anime character"
                loading="lazy"
                className="img main-img"
                initial="hidden"
                animate={controls4}
                variants={IMAGE_ANIMATION}
              />
            </ImageContainer>
          </CallToActionSection>
          <BackgroundAnimeCards />
        </main>
      </Wrapper>
    </div>
  );
};

export default Landing;

// Styled Components
const HeroSection = styled(motion.div)``;

const HeroContent = styled.div``;

const ImageContainer = styled.div``;

const TestimonialsSection = styled(motion.div)``;

const FeaturesSection = styled(motion.div)``;

const FeaturesContent = styled.div``;

const CallToActionSection = styled(motion.div)``;

const CallToActionContent = styled.div``;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ContactInfo = styled.h5`
  margin-top: 2.5rem;
  font-weight: 400;
  color: var(--grey-600);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ContactLink = styled.a`
  text-decoration: underline;
  color: var(--primary-500);
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-600);
  }
`;

const Wrapper = styled.main`
  overflow: hidden;
  background-color: var(--backgroundColor);

  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3rem auto;
    padding: 2rem 0;
  }

  .page.last-page {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  main {
    padding-bottom: 0;
  }

  p {
    text-align: left;
    color: var(--grey-600);
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 0;

    span {
      color: var(--primary-600);
      font-weight: 600;
    }
  }

  .gallery {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.2;
    margin-bottom: 1.5rem;

    span {
      color: var(--primary-600);
    }
  }

  h3 {
    font-weight: 600;
    margin-bottom: 1.5rem;
    line-height: 1.4;

    span {
      text-decoration: underline;
      text-decoration-color: var(--primary-500);
      text-decoration-thickness: 3px;
      text-underline-offset: 6px;
    }
  }

  li {
    color: var(--grey-700);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    line-height: 1.6;

    svg {
      margin-right: 0.75rem;
      flex-shrink: 0;
    }

    span {
      font-weight: 400;
      color: var(--black);
    }
  }

  .main-img {
    display: none;
    overflow: visible;
    position: relative;
    transform: none !important;
  }

  @media (min-width: 992px) {
    .page {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 5rem;
      min-height: 90vh;
      position: relative;
      margin: 4rem auto;
      padding: 3rem 0;
    }

    .page.last-page {
      margin-bottom: 0;
      padding-bottom: 0;
      min-height: auto;
    }

    main {
      padding-bottom: 0;
    }

    .main-img {
      display: block;
      height: auto;
      width: 100%;
      position: static;
      overflow: visible;
      overflow-x: hidden;
      border-radius: 12px;
      object-fit: cover;
    }

    .oversized-img {
      height: 110%;
      width: 110%;
      overflow: visible;
    }

    ${HeroContent}, ${FeaturesContent}, ${CallToActionContent} {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem 0;
    }

    ${ButtonGroup} {
      flex-wrap: nowrap;
      margin-top: 2.5rem;
    }

    ${HeroContent} {
      h1 {
        font-size: 3rem;
        margin-bottom: 1.5rem;
      }

      p {
        font-size: 1.2rem;
        margin-bottom: 0;
      }
    }

    ${FeaturesContent}, ${CallToActionContent} {
      h3 {
        font-size: 2rem;
        margin-bottom: 2rem;
      }
    }
  }
`;
