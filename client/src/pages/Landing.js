import goku from "../assets/images/goku.png";
import aot from "../assets/images/aot.png";
import lucy from "../assets/images/lucy.png";
import narutoRun from "../assets/images/narutoRun.gif";
import RunningImg from "../Components/RunningImg";
import { Logo } from "../Components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import A1 from "../assets/images/sampleAnimes/A1.png";
import A2 from "../assets/images/sampleAnimes/A2.png";
import A3 from "../assets/images/sampleAnimes/A3.png";
import A4 from "../assets/images/sampleAnimes/A4.png";
import A5 from "../assets/images/sampleAnimes/A5.png";
import A6 from "../assets/images/sampleAnimes/A6.png";
import A7 from "../assets/images/sampleAnimes/A7.png";
import A8 from "../assets/images/sampleAnimes/A8.png";
import america from "../assets/images/america.webp";
import japan from "../assets/images/japan.webp";
import Testimonials from "../Components/Testimonials";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { changeSiteLanguage } = useAppContext();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    toast.success(
      "Hi! 👋 This app is currently in development. Want me to add a feature? Let me know at Zach.Stone.Developer@gmail.com",
      {
        position: "top-left",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }, []);

  return (
    <>
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
          <Logo />
          <div className="full-flag-div">
            <div className="flag-div nav-button">
              {i18n.language === "en" ? (
                <div className="flag-div">
                  <div className="flag-div-holder">
                    <img
                      className="flag"
                      src={japan}
                      alt="Japan Flag"
                      onClick={() => changeSiteLanguage("jp")}
                    />
                  </div>
                </div>
              ) : (
                <div className="Japanese">
                  <div className="flag-div-holder">
                    <img
                      className="flag"
                      src={america}
                      alt="America Flag"
                      onClick={() => changeSiteLanguage("en")}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
        <main>
          <RunningImg img={narutoRun} />
          <div className="container page">
            <div>
              <h1>
                <span>{t("landing.title")}</span>
              </h1>
              <p>{t("landing.title_description")}</p>
              <div className="login-div">
                <Link to="/register" className="btn btn-hero">
                  {t("landing.login_button")}
                </Link>
                <Link to="/register-demo" className="btn btn-hipster">
                  {t("landing.demo_button")}
                </Link>
              </div>
            </div>

            <img src={goku} alt="anime character" className="img main-img" />
          </div>
          <Testimonials />
          <div className="container page">
            <img
              src={aot}
              alt="anime character"
              loading="lazy"
              className="img main-img"
            />

            <div>
              <h3>
                <span>{t("landing.why.title")}</span>
              </h3>
              <ul>
                <li>
                  <FaCheck /> {t("landing.why.point1")}
                </li>
                <li>
                  <FaCheck /> {t("landing.why.point2")}
                </li>
                <li>
                  {" "}
                  <FaCheck />
                  {t("landing.why.point3")}
                </li>
                <li>
                  {" "}
                  <FaCheck />
                  {t("landing.why.point4")}
                </li>
                <li>
                  {" "}
                  <FaCheck />
                  {t("landing.why.point5")}
                </li>
              </ul>
            </div>
          </div>

          <div
            className="container page"
            style={{
              height: "fit-content",
            }}
          >
            <div>
              <div>
                <h3>{t("landing.call_to_action.title")}</h3>
                <div className="login-div">
                  <Link to="/register" className="btn btn-hero">
                    {t("landing.login_button")}
                  </Link>
                  <Link
                    to="/register-demo"
                    className="btn btn-hero btn-hipster"
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
                      target={"_blank"}
                      rel="noreferrer"
                      style={{
                        textDecoration: "underline",
                        color: "black",
                      }}
                    >
                      ZStone.dev
                    </a>
                  </span>
                </h5>
              </div>
            </div>
            <img
              src={lucy}
              alt="anime character"
              loading="lazy"
              className="img main-img"
            />
          </div>
          <div className="animesLeft">
            <img
              src={A1}
              alt="anime character"
              className="animeCard left"
              loading="lazy"
            />
            <img
              src={A2}
              alt="anime character"
              className="animeCard left"
              loading="lazy"
            />
            <img
              src={A3}
              alt="anime character"
              className="animeCard left"
              loading="lazy"
            />
          </div>
          <div className="animesRight">
            <img
              src={A4}
              alt="anime character"
              className="animeCard left"
              loading="lazy"
            />
            <img
              src={A5}
              alt="anime character"
              className="animeCard right"
              loading="lazy"
            />
            <img
              src={A6}
              alt="anime character"
              className="animeCard right"
              loading="lazy"
            />

            <img
              src={A7}
              alt="anime character"
              className="animeCard right"
              loading="lazy"
            />
            <img
              src={A8}
              alt="anime character"
              className="animeCard right"
              loading="lazy"
            />
          </div>
        </main>
      </Wrapper>
    </>
  );
};
export default Landing;

const Wrapper = styled.main`
  overflow: hidden;
  // special css for anime cards

  .flag-div-holder {
    position: fixed;
    top: 5%;
    right: 5%;
    z-index: 100;
  }
  .flag {
    width: 3rem;
    height: 2rem;
    cursor: pointer;
  }
  .animesLeft {
    height: 90%;
    display: none;
    flex-direction: column;
    /* justify-content: space-evenly; */
    position: absolute;
    top: 0;
    left: 0;
  }

  .animesRight {
    height: 90%;
    width: min-content;
    padding: 0px;
    margin: 0px;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    top: 0;
    right: 0;
  }
  .animeCard {
    transform: scale(0.4);
    border: 1px solid var(--primary-200);
  }

  .animeCard.left {
    // rotate slight left
    transform: rotate(-5deg) scale(0.4);
    transition: 1s ease-out;
  }
  .animeCard.right {
    // rotate slight right
    transform: rotate(5deg) scale(0.4);
    transition: 1s ease-out;
  }

  .animeCard.left:hover {
    transform-origin: center;
    transform: scale(0.7) rotate(0deg) translateX(70px);
    transition: 1s ease-out;
  }
  .animeCard.right:hover {
    transform-origin: center;
    // slow down the animation
    transition: 1s ease-out;
    // move the slightly closer to the center
    transform: scale(0.7) rotate(0deg) translateX(-70px);
  }
  @media (min-width: 1574px) {
    .animesLeft {
      display: flex;
      left: 0%;
    }
    .animesRight {
      display: flex;
      right: 0%;
      top: 300px;
    }

    .animeCard {
      margin-bottom: 300px;
    }

    @media (min-width: 1800px) {
      .animesLeft {
        left: 5%;
      }
      .animesRight {
        right: 5%;
      }
    }
  }

  // end of anime cards css

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
    display: grid;
    align-items: center;
    margin-top: -3rem;
    height: 80vh;
  }
  .features {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
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

  .features {
    text-align: center;
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
  }
`;
