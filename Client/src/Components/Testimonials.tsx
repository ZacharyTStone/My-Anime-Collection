import { useState } from "react";
import Carousel from "react-simply-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Testimonial from "./UI/Testimonial";
import { useTranslation } from "react-i18next";
import { useMobile } from "../utils/hooks";
import { TESTIMONIALS, TESTIMONIALS_TYPE } from "../utils/constants";

const arrowButtonProps = (direction: "right" | "left") => ({
  children:
    direction === "right" ? <ChevronRight size={32} /> : <ChevronLeft size={32} />,
  className:
    "mx-2 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center self-center rounded-full border bg-card text-primary-500 shadow-sm transition-colors hover:bg-accent hover:text-primary-600",
  "aria-label":
    direction === "right" ? "Next testimonials" : "Previous testimonials",
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
