import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "react-simply-carousel";
import Testimonial from "./Testimonial";
import vegeta from "../assets/images/testimonials/vegeta.webp";
import pikachu from "../assets/images/testimonials/pickachu.jpeg";
import shinji from "../assets/images/testimonials/shinji.jpeg";
import pegasus from "../assets/images/testimonials/pegasus.jpeg";
function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Wrapper>
      <div className="testimonials">
        <h1 className="testimonials-title">Testimonials</h1>
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
            children: ">",
            style: {
              width: 40,
              height: 40,
              alignSelf: "center",
              borderRadius: "50%",
              color: "var(--primary-500)",
              backgroundColor: "var(--primary-50)",
              border: "none",
              marginLeft: "20px",
            },
          }}
          backwardBtnProps={{
            children: "<",
            style: {
              width: 40,
              height: 40,
              alignSelf: "center",
              borderRadius: "50%",
              color: "var(--primary-500)",
              backgroundColor: "var(--primary-50)",
              border: "none",
              marginRight: "20px",
            },
          }}
          itemsToShow={3}
          speed={400}
        >
          <Testimonial
            name="Vegeta"
            img={vegeta}
            text="Get out of my way. I don't have time to use your dumb website."
          />
          <Testimonial
            name="Pikachu"
            img={pikachu}
            text="Pika pika Pikachu! Pika PIKA pika pika. Pika PIKA pika pika."
          />
          <Testimonial
            name="Shinji Ikari"
            img={shinji}
            text="I guess I like My Anime Collection. Please don't make me pilot the EVA anymore..."
          />
          <Testimonial
            name="Pegasus"
            img={pegasus}
            text="The best thing ever creAATED~~~ Good job, Zachy boy!"
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
    margin-top: 0px;
    margin-bottom: 100px;
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
