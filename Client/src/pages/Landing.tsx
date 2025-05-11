import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useInViewAnimation } from "../utils/hooks";
import { useAppContext } from "./../context/appContext";

// Images
import { BackgroundAnimeCards } from "../Components";
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

const createAnimation = (
  opacity: number,
  y: number,
  duration: number,
  ease: string
) => ({
  hidden: { opacity, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
});

const Landing = () => {
  const { theme } = useAppContext();
  const { t } = useTranslation();

  const { controls: controls1, ref: ref1 } = useInViewAnimation();
  const { controls: controls2, ref: ref2 } = useInViewAnimation();
  const { controls: controls3, ref: ref3 } = useInViewAnimation();
  const { controls: controls4, ref: ref4 } = useInViewAnimation();

  const fadeIn = createAnimation(0, 0, 0.8, "easeInOut");
  const imageAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const listItemVariants = {
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
          <motion.div
            className="container page"
            style={{ height: "80vh" }}
            initial="hidden"
            variants={fadeIn}
            animate={controls1}
            ref={ref1}
          >
            <div>
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
            </div>
            <div>
              <motion.img
                src={goku}
                alt="anime character"
                className="img main-img"
                initial="hidden"
                animate={controls1}
                variants={imageAnimation}
              />
            </div>
          </motion.div>

          <motion.div
            className="container page"
            initial="hidden"
            animate={controls2}
            ref={ref2}
            variants={fadeIn}
          >
            <Testimonials />
          </motion.div>

          <motion.div
            className="container page"
            style={{ height: "80vh" }}
            initial="hidden"
            animate={controls3}
            ref={ref3}
            variants={fadeIn}
          >
            <motion.img
              src={aot}
              alt="anime character"
              loading="lazy"
              className="img main-img oversized-img"
              initial="hidden"
              animate={controls3}
              variants={imageAnimation}
            />

            <div>
              <h3>
                <span>{t("landing.why.title")}</span>
              </h3>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={listItemVariants}
              >
                {["point1", "point2", "point3", "point4", "point5"].map(
                  (point, index) => (
                    <motion.li
                      key={point}
                      custom={index}
                      variants={listItemVariants}
                    >
                      <FaCheck color="var(--primary-500)" />{" "}
                      <span style={{ color: "var(--black)" }}>
                        {t(`landing.why.${point}`)}
                      </span>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </div>
          </motion.div>

          <motion.div
            className="container page"
            initial="hidden"
            animate={controls4}
            ref={ref4}
            variants={fadeIn}
          >
            <div>
              <div>
                <h3>{t("landing.call_to_action.title")}</h3>
                <div className="login-div">
                  <StyledButton to="/register" className="btn btn-primary">
                    {t("landing.login_button")}
                  </StyledButton>
                  <StyledButton
                    to="/register-demo"
                    className="btn btn-primary btn-outline"
                  >
                    {t("landing.demo_button")}
                  </StyledButton>
                </div>
                <h5
                  style={{
                    marginTop: "2rem",
                  }}
                >
                  {t("landing.call_to_action.contact_info")}{" "}
                  <span>
                    <a
                      href="https://zstone.dev"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: "underline",
                        color: "var(--primary-500)",
                      }}
                    >
                      ZStone.dev
                    </a>
                  </span>
                </h5>
              </div>
            </div>

            <motion.img
              src={lucy}
              alt="anime character"
              loading="lazy"
              className="img main-img"
              initial="hidden"
              animate={controls4}
              variants={imageAnimation}
            />
          </motion.div>
          <BackgroundAnimeCards />
        </main>
      </Wrapper>
    </div>
  );
};

export default Landing;

const Wrapper = styled.main`
  @keyframes shimmerBorder {
    0% {
      border-color: var(--primary-200);
    }
    50% {
      border-color: var(--primary-500);
    }
    100% {
      border-color: var(--primary-200);
    }
  }

  overflow: hidden;
  background-color: var(--white);

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
    margin: 2rem auto;
  }

  p {
    text-align: left;
    color: var(--grey-600);
    font-size: 1.1rem;
    line-height: 1.7;

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

    span {
      color: var(--primary-600);
    }
  }

  h3 {
    font-weight: 600;
    margin-bottom: 1.5rem;

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

    svg {
      margin-right: 0.75rem;
      flex-shrink: 0;
    }

    span {
      font-weight: 400;
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
      column-gap: 4rem;
      min-height: 90fvh;
      position: relative;
    }

    .main-img {
      display: block;
      height: auto;
      width: 100%;
      position: static;
      overflow: visible;
      overflow-x: hidden;
      border-radius: 8px;
      transition: none;
      will-change: auto;

      &:hover {
        transform: none;
        box-shadow: var(--shadow-md);
      }
    }

    .oversized-img {
      height: 110%;
      width: 110%;
      overflow: visible;
    }
  }
`;
