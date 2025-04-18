import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "react-simply-carousel";
import Testimonial from "./UI/Testimonial";
import { useTranslation } from "react-i18next";
import { useMobile } from "../utils/hooks";
import { TESTIMONIALS, TESTIMONIALS_TYPE } from "../utils/constants";

function Testimonials() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const onMobile = useMobile();

  return (
    <TestimonialsContainer>
      <TestimonialsTitle>
        {t("landing.testimonials.title") as string}
      </TestimonialsTitle>
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
        forwardBtnProps={arrowButtonProps("right")}
        backwardBtnProps={arrowButtonProps("left")}
        itemsToShow={onMobile ? 1 : 3}
        speed={400}
      >
        {TESTIMONIALS.map((testimonial: TESTIMONIALS_TYPE, index: number) => (
          <Testimonial
            key={index}
            name={t(`landing.testimonials.${testimonial.nameKey}.name`)}
            img={testimonial.img}
            text={t(testimonial.textKey)}
          />
        ))}
      </Carousel>
    </TestimonialsContainer>
  );
}

const TestimonialsContainer = styled.div`
  width: 100vw;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0px 0px 100px 0px;
  min-width: 250px;
`;

const TestimonialsTitle = styled.h1`
  color: var(--primary-500);
`;

const arrowButtonProps = (direction: "right" | "left") => ({
  children: direction === "right" ? ">" : "<",
  style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3em",
    width: 40,
    height: 40,
    alignSelf: "center",
    paddingBottom: "10px",
    borderRadius: "none",
    color: "var(--primary-500)",
    backgroundColor: "transparent",
    border: "none",
    marginLeft: direction === "right" ? "20px" : "0",
    marginRight: direction === "left" ? "20px" : "0",
  },
});

export default Testimonials;
