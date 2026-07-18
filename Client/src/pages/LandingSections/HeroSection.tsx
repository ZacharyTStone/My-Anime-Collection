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
        <h1 className="font-bold tracking-[-0.03em] leading-[1.2] mb-6 text-3xl lg:text-5xl">
          <span className="text-primary-600">{t("landing.title")}</span>
        </h1>
        <p className="text-left text-muted-foreground text-[1.1rem] leading-[1.7] mb-0 lg:text-[1.2rem]">
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
          className="img main-img h-auto w-full rounded-xl object-cover"
          initial="hidden"
          animate={controls}
          variants={imageAnim}
        />
      </div>
    </motion.div>
  );
};

export default HeroSection;
