import { motion, type Variants } from "framer-motion";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useInViewAnimation } from "../../utils/hooks";
import { Button } from "@/Components/UI/button";
import goku from "../../assets/images/goku.webp";

interface HeroSectionProps {
  controls: ReturnType<typeof useInViewAnimation>["controls"];
  ref: (node?: Element | null) => void;
  fadeIn: Variants;
  imageAnim: Variants;
  sectionClass: string;
  twoColClass: string;
}

const HeroSection = ({ controls, ref, fadeIn, imageAnim, sectionClass, twoColClass }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={`${sectionClass} ${twoColClass}`}
      initial="hidden"
      variants={fadeIn}
      animate={controls}
      ref={ref}
    >
      <div>
        <h1 className="leading-[1.1] mb-6 text-4xl lg:text-6xl" style={{ fontFamily: "var(--headingFont)" }}>
          <span className="gradient-heading">{t("landing.title")}</span>
        </h1>
        <p className="text-left text-muted-foreground text-[1.05rem] leading-[1.75] mb-0 max-w-xl lg:text-[1.15rem]">
          {t("landing.title_description")}
        </p>
        <div className="flex justify-start items-center mt-8 gap-4 flex-wrap lg:flex-nowrap">
          <Button asChild size="lg">
            <Link to="/register">{t("landing.login_button")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/register-demo">{t("landing.demo_button")}</Link>
          </Button>
        </div>
      </div>
      <div className="hidden lg:block">
        <motion.img
          src={goku}
          alt="anime character"
          className="h-auto w-full rounded-xl object-cover"
          initial="hidden"
          animate={controls}
          variants={imageAnim}
        />
      </div>
    </motion.div>
  );
};

export default HeroSection;
