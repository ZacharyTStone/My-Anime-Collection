import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Testimonial from "./UI/Testimonial";
import { TESTIMONIALS, TESTIMONIALS_TYPE } from "../utils/constants";

const VISIBLE_TESTIMONIALS = 6;

function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border/70 bg-muted/40">
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            {t("landing.testimonials.title")}
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.slice(0, VISIBLE_TESTIMONIALS).map(
              (testimonial: TESTIMONIALS_TYPE) => (
                <Testimonial
                  key={testimonial.nameKey}
                  name={t(`landing.testimonials.${testimonial.nameKey}.name`)}
                  img={testimonial.img}
                  text={t(testimonial.textKey)}
                />
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
