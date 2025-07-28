import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useInViewAnimation } from "../utils/hooks";
import { useMobile } from "../utils/hooks";
import { FlagContainer } from "../Components";
import { RunningImg } from "../Components/UI";
import Testimonials from "../Components/Testimonials";

import goku from "../assets/images/goku.webp";
import narutoRun from "../assets/images/narutoRun.gif";

const Landing = () => {
  const { t } = useTranslation();

  const { inView: inView1, ref: ref1 } = useInViewAnimation();
  const { inView: inView2, ref: ref2 } = useInViewAnimation();
  const { inView: inView3, ref: ref3 } = useInViewAnimation();
  const { inView: inView4, ref: ref4 } = useInViewAnimation();

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
            animate={inView1 ? "visible" : "hidden"}
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
                animate={inView1 ? "visible" : "hidden"}
                variants={imageAnimation}
              />
            </div>
          </motion.div>

          <motion.div
            className="container page"
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            ref={ref2}
            variants={fadeIn}
          >
            <Testimonials />
          </motion.div>

          <motion.div
            className="container page"
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            ref={ref3}
            variants={fadeIn}
          >
            <div>
              <h2>{t("landing.features.title")}</h2>
              <motion.ul
                initial="hidden"
                animate={inView3 ? "visible" : "hidden"}
                variants={listItemVariants}
              >
                <motion.li custom={0}>
                  {t("landing.features.feature1")}
                </motion.li>
                <motion.li custom={1}>
                  {t("landing.features.feature2")}
                </motion.li>
                <motion.li custom={2}>
                  {t("landing.features.feature3")}
                </motion.li>
                <motion.li custom={3}>
                  {t("landing.features.feature4")}
                </motion.li>
              </motion.ul>
            </div>
            <div>
              <motion.img
                src={goku}
                alt="anime character"
                className="img main-img"
                initial="hidden"
                animate={inView3 ? "visible" : "hidden"}
                variants={imageAnimation}
              />
            </div>
          </motion.div>

          <motion.div
            className="container page"
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            ref={ref4}
            variants={fadeIn}
          >
            <div>
              <h2>{t("landing.cta.title")}</h2>
              <p>{t("landing.cta.description")}</p>
              <StyledLoginDiv>
                <StyledButton to="/register" className="btn btn-primary">
                  {t("landing.cta.button")}
                </StyledButton>
              </StyledLoginDiv>
            </div>
            <div>
              <motion.img
                src={goku}
                alt="anime character"
                className="img main-img"
                initial="hidden"
                animate={inView4 ? "visible" : "hidden"}
                variants={imageAnimation}
              />
            </div>
          </motion.div>
        </main>
      </Wrapper>
    </div>
  );
};

const createAnimation = (
  opacity: number,
  y: number,
  duration: number,
  ease: string
) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease },
  },
});

const Wrapper = styled.div`
  .container {
    width: 90vw;
    margin: 0 auto;
    max-width: 1120px;
  }
  .page {
    min-height: calc(100vh - 5rem);
    margin-top: 2.5rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  h2 {
    font-weight: 700;
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .main-img {
      display: block;
    }
  }
`;

const StyledFlagContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
`;

const StyledLoginDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const StyledButton = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default Landing;
