import main from "../assets/images/main.svg";
import computer from "../assets/images/computer.svg";
import hello from "../assets/images/hello.svg";
import thumb1 from "../assets/images/thumb1.png";
import thumb2 from "../assets/images/thumb2.png";
import thumb3 from "../assets/images/thumb3.png";
import thumb4 from "../assets/images/thumb4.png";
import { Logo } from "../Components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import { FaBuromobelexperte } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const images = [
  {
    original: thumb1,
    thumbnail: thumb1,
  },
  {
    original: thumb2,
    thumbnail: thumb2,
  },
  {
    original: thumb3,
    thumbnail: thumb3,
  },
  {
    original: thumb4,
    thumbnail: thumb4,
  },
];

const Landing = () => {
  useEffect(() => {
    toast.success(
      "Hi! 👋 This app is currently in development. Want me to add a feature? Let me know at Zach.Stone.Developer@gmail.com",
      {
        position: "top-right",
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
        position="top-right"
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
                Haku <span> job tracker</span>
              </h1>
              <p>
                Haku pronounced "ha koo" is an application that let's you track,
                and compare jobs during the the interview process.
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
          <Fade>
            <img src={main} alt="job hunt" className="img main-img" />
          </Fade>
        </div>
        <div className="container">
          <Fade>
            <div className="features" id="icon-row">
              <h3>
                {" "}
                <span>How do I use Haku?</span>
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
                      <span>1.</span> Log the jobs you apply for.
                    </p>
                  </div>
                  <div className="icon">
                    <FaEdit size={"50px"} color="var(--primary-500)" />
                    <p>
                      <span>2.</span> Hear back from the company? Update that
                      job to reflect your interview status
                    </p>
                  </div>
                  <div className="icon">
                    <FaSortAmountDown
                      size={"50px"}
                      color="var(--primary-500)"
                    />
                    <p>
                      <span>3.</span> Use Haku's built in tools to compare and
                      contrast job offers.
                    </p>
                  </div>
                </div>
              </Slide>
            </div>
          </Fade>
        </div>
        <div className="container page">
          <Fade>
            <img src={computer} alt="job hunt" className="img main-img" />
          </Fade>
          <div>
            <Slide right>
              <h3>
                <span> Why use Haku?</span>
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
                  Unlike other job trackers, Haku does not use cookies to track
                  you for advertising purposes and does not request personal
                  data from any third parties.
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
        <div className="container page gallery">
          <div
            style={{
              width: "90%",
            }}
          >
            <h3 style={{ textAlign: "center" }}>
              <span>Haku in action!</span>
            </h3>
            <ImageGallery items={images} showNav={false} />
          </div>
        </div>
        <div className="container page">
          <div>
            <Slide right>
              <div>
                <h3>Time to land that dream job!</h3>
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
            <img src={hello} alt="job hunt" className="img main-img" />
          </Fade>
        </div>
      </Wrapper>
    </>
  );
};
export default Landing;

const Wrapper = styled.main`
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
    }
  }
`;
