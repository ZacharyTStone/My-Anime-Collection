import { useState } from "react";
import Carousel from "react-simply-carousel";
import Testimonial from "./UI/Testimonial";
import { useTranslation } from "react-i18next";
import { useMobile } from "../utils/hooks";
import { TESTIMONIALS, TESTIMONIALS_TYPE } from "../utils/constants";

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

function Testimonials() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const onMobile = useMobile();

  return (
    <div className="w-screen max-w-[100vw] flex flex-col items-center justify-center mb-[100px] min-w-[250px]">
      <h1 className="text-primary-500">
        {t("landing.testimonials.title") as string}
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
    </div>
  );
}

export default Testimonials;
