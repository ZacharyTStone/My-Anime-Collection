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

const Landing = () => {
  const { theme } = useAppContext();
  const { t } = useTranslation();

  const { controls: controls1, ref: ref1 } = useInViewAnimation();
  const { controls: controls2, ref: ref2 } = useInViewAnimation();
  const { controls: controls3, ref: ref3 } = useInViewAnimation();
  const { controls: controls4, ref: ref4 } = useInViewAnimation();

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const parallax = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <div data-theme={theme ? theme : "light"}>
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
            <FlagContainer />
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
              <div className="login-div">
                <Link to="/register" className="btn btn-primary">
                  {t("landing.login_button")}
                </Link>
                <Link to="/register-demo" className="btn btn-outline">
                  {t("landing.demo_button")}
                </Link>
              </div>
            </div>
            <div>
              <motion.img
                src={goku}
                alt="anime character"
                className="img main-img"
                initial="hidden"
                animate={controls1}
                variants={parallax}
              />
            </div>
          </motion.div>
          <motion.div
            style={{ height: "80vh" }}
            initial="hidden"
            animate={controls2}
            variants={fadeIn}
            ref={ref2}
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
              variants={parallax}
            />

            <div>
              <h3>
                <span>{t("landing.why.title")}</span>
              </h3>
              <ul>
                <li>
                  <FaCheck color="var(--primary-500)" />{" "}
                  <span style={{ color: "var(--black)" }}>
                    {t("landing.why.point1")}
                  </span>
                </li>
                <li>
                  <FaCheck color="var(--primary-500)" />{" "}
                  <span style={{ color: "var(--black)" }}>
                    {t("landing.why.point2")}
                  </span>
                </li>
                <li>
                  <FaCheck color="var(--primary-500)" />{" "}
                  <span style={{ color: "var(--black)" }}>
                    {t("landing.why.point3")}
                  </span>
                </li>
                <li>
                  <FaCheck color="var(--primary-500)" />{" "}
                  <span style={{ color: "var(--black)" }}>
                    {t("landing.why.point4")}
                  </span>
                </li>
                <li>
                  <FaCheck color="var(--primary-500)" />{" "}
                  <span style={{ color: "var(--black)" }}>
                    {t("landing.why.point5")}
                  </span>
                </li>
              </ul>
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
                  <Link to="/register" className="btn btn-primary">
                    {t("landing.login_button")}
                  </Link>
                  <Link
                    to="/register-demo"
                    className="btn btn-primary btn-outline"
                  >
                    {t("landing.demo_button")}
                  </Link>
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
              variants={parallax}
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
      border: 3px solid var(--primary-200);
    }
    50% {
      border: 3px solid var(--primary-500);
    }
    100% {
      border: 3px solid var(--primary-200);
    }
  }

  overflow: hidden;
  background-color: var(--white);
  // special css for anime cards

  .flag-div-holder {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 5%;
    right: 5%;
    z-index: 100;
  }

  .btn:hover {
    transform: scale(1.1) !important;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .login-div {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 2rem;
  }
  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    text-align: left;
    span {
      color: var(--primary-500);
      font-weight: bold;
      font-size: 1.5rem;
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

  .icon {
    background-color: var(--grey-50);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .icon:hover {
    background-color: var(--primary-50);
    color: white;
    transform: scale(1.1);
    transform-style: flat;
    // slow transition
    transition: all 0.5s ease-in-out;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  h3 {
    span {
      text-decoration: underline var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
    size: 120%;
  }
  .main-img {
    display: none;
    overflow: visible;
  }
  @media (min-width: 992px) {
    .page {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
      min-height: 90fvh;
    }
    .main-img {
      display: block;
      height: auto;
      width: 100%;
      overflow: visible;
      overflow-x: hidden;
    }

    .oversized-img {
      height: 110%;
      width: 110%;
      overflow: visible;
    }
  }
`;
