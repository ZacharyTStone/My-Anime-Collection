import goku from "../assets/images/goku.png";
import aot from "../assets/images/aot.png";
import lucy from "../assets/images/lucy.png";
import narutoRun from "../assets/images/narutoRun.gif";
import { Logo } from "../Components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import { FaBuromobelexperte } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Landing = () => {
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
        </nav>
        <div className="container page">
          <div>
            <Slide left>
              <h1>
                <span> My Anime Collection</span>
              </h1>
              <p>
                My Anime Collection also called M.A.C. is an application that
                let's you track, and find new animes.
              </p>
              <div className="login-div">
                <Link to="/register" className="btn btn-hero">
                  Login/Register
                </Link>
                <Link to="/register-demo" className="btn btn-hipster">
                  Demo
                </Link>
              </div>
            </Slide>
          </div>
          <img
            src={narutoRun}
            loading="lazy"
            alt="anime character"
            className="img naruto"
          />
          <Fade>
            <img src={goku} alt="anime character" className="img main-img" />
          </Fade>
        </div>
        <div className="container">
          <Fade>
            <div className="features" id="icon-row">
              <h3>
                <span>How do I use M.A.C.?</span>
              </h3>
              <Slide left>
                <div className="icon-row">
                  <div className="icon">
                    <div className="icon-img">
                      <FaBuromobelexperte
                        size={"50px"}
                        color="var(--primary-500)"
                      />
                    </div>
                    <p>
                      <span>1.</span> Log the anime you like.
                    </p>
                  </div>
                  <div className="icon">
                    <FaSortAmountDown
                      size={"50px"}
                      color="var(--primary-500)"
                    />
                    <p>
                      <span>2.</span> Sort your collection by title, rating,
                      creation date, etc.
                    </p>
                  </div>
                  <div className="icon">
                    <FaSearch size={"50px"} color="var(--primary-500)" />
                    <p>
                      <span>3.</span> Use My Anime Collection's built in tools
                      to find new animes.
                    </p>
                  </div>
                </div>
              </Slide>
            </div>
          </Fade>
        </div>
        <div className="container page">
          <Fade>
            <img
              src={aot}
              alt="anime character"
              loading="lazy"
              className="img main-img"
            />
          </Fade>
          <div>
            <Slide right>
              <h3>
                <span> Why use My Anime Collection?</span>
              </h3>
              <ul>
                <li>
                  <FaCheck /> It's 100% free and contains no ads.
                </li>
                <li>
                  <FaCheck /> It's easy to use and intuitive.
                </li>
                <li>
                  {" "}
                  <FaCheck />
                  We take security very seriously and use advanced encyrption to
                  protect your information from breaches, and hacking attempts.
                </li>
                <li>
                  {" "}
                  <FaCheck />
                  My Anime Collection does not use cookies to track you for
                  advertising purposes and does not request personal data from
                  any third parties.
                </li>
                <li>
                  {" "}
                  <FaCheck />
                  We're always working on adding new features and improvements.
                </li>
              </ul>
            </Slide>
          </div>
        </div>

        <div className="container page">
          <div>
            <Slide right>
              <div>
                <h3>Let's go!!!!</h3>
                <div className="login-div">
                  <Link to="/register" className="btn btn-hero">
                    Login/Register
                  </Link>
                  <Link
                    to="/register-demo"
                    className="btn btn-hero btn-hipster"
                  >
                    Demo
                  </Link>
                </div>
                <h5
                  style={{
                    marginTop: "2rem",
                  }}
                >
                  For all inquieres please contact Zach Stone at{" "}
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
            </Slide>
          </div>
          <Fade>
            <img
              src={lucy}
              alt="anime character"
              loading="lazy"
              className="img main-img"
            />
          </Fade>
        </div>
      </Wrapper>
    </>
  );
};
export default Landing;

const Wrapper = styled.main`
  .naruto {
    width: 100px;
    position: absolute;
    animation-name: run;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    top: 94%;
  }

  @keyframes run {
    from {
      left: -100px;
    }
    to {
      left: 93%;
    }
  }
  .btn:hover {
    transform: scale(1.1);
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
    }
  }
`;
