import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "react-simply-carousel";
import Testimonial from "./UI/Testimonial";
import { useTranslation } from "react-i18next";
import {
  pegasus,
  pikachu,
  shinji,
  vegeta,
} from "../assets/images/testimonials/index";

function Testimonials() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Wrapper>
      <div className="testimonials">
        <h1 className="testimonials-title">
          {t("landing.testimonials.title")}
        </h1>
        <Carousel
          updateOnItemClick
          containerProps={{
            style: {
              width: "100vw",
              justifyContent: "center",
              marginTop: "50px",
            },
          }}
          activeSlideIndex={activeSlide}
          activeSlideProps={{
            style: {
              background: "var(--primary-500)",
            },
          }}
          onRequestChange={setActiveSlide}
          forwardBtnProps={{
            children: ">", // Unicode right arrow
            style: {
              // large font size
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3em",
              width: 40,
              height: 40,
              alignSelf: "center",
              paddingBottom: "10px",
              borderRadius: "none", // Remove border-radius
              color: "var(--primary-500)",
              backgroundColor: "transparent", // Remove background color
              border: "none", // Add border to make it thicker
              marginLeft: "20px",
            },
          }}
          backwardBtnProps={{
            children: "<", // Unicode left arrow
            style: {
              // large font size
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3em",
              width: 40,
              height: 40,
              alignSelf: "center",
              paddingBottom: "10px",
              borderRadius: "none", // Remove border-radius
              color: "var(--primary-500)",
              backgroundColor: "transparent", // Remove background color
              border: "none", // Add border to make it thicker
              marginRight: "20px",
            },
          }}
          itemsToShow={3}
          speed={400}
        >
          <Testimonial
            name={t("landing.testimonials.vegeta.name")}
            img={vegeta}
            text={t("landing.testimonials.vegeta.description")}
          />
          <Testimonial
            name={t("landing.testimonials.pikachu.name")}
            img={pikachu}
            text={t("landing.testimonials.pikachu.description")}
          />
          <Testimonial
            name={t("landing.testimonials.shinji.name")}
            img={shinji}
            text={t("landing.testimonials.shinji.description")}
          />
          <Testimonial
            name={t("landing.testimonials.pegasus.name")}
            img={pegasus}
            text={t("landing.testimonials.pegasus.description")}
          />
        </Carousel>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .testimonials {
    width: 100vw;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px 0px 100px 0px;
    /* border: 5px solid var(--primary-500); */
    min-width: 250px;
  }
  h1 {
    color: var(--primary-500);
  }

  .Carousel {
    width: 100%;
    max-width: 100vw;
  }
`;

export default Testimonials;
