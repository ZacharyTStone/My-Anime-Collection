import { motion, type Variants } from "framer-motion";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useInViewAnimation } from "../../utils/hooks";
import { Button } from "@/Components/UI/button";
import lucy from "../../assets/images/lucy.webp";

interface CTASectionProps {
  controls: ReturnType<typeof useInViewAnimation>["controls"];
  ref: (node?: Element | null) => void;
  fadeIn: Variants;
  imageAnim: Variants;
  sectionClass: string;
  twoColClass: string;
}

const CTASection = ({ controls, ref, fadeIn, imageAnim, sectionClass, twoColClass }: CTASectionProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={`${sectionClass} ${twoColClass} pb-0 lg:pb-0`}
      initial="hidden"
      animate={controls}
      ref={ref}
      variants={fadeIn}
    >
      <div className="flex flex-col">
        <h3 className="font-semibold leading-[1.4] text-xl lg:text-[2rem]">
          {t("landing.call_to_action.title")}
        </h3>
        <div className="flex gap-4 mt-8 flex-wrap items-center lg:flex-nowrap">
          <Button asChild size="lg">
            <Link to="/register">{t("landing.login_button")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/register-demo">{t("landing.demo_button")}</Link>
          </Button>
        </div>
        <h5 className="mt-12 font-normal text-grey-600 text-[0.95rem] leading-[1.6]">
          {t("landing.call_to_action.contact_info")}{" "}
          <a
            href="https://zstone.dev"
            target="_blank"
            rel="noreferrer"
            className="underline text-primary-500 transition-colors duration-200 hover:text-primary-600"
          >
            ZStone.dev
          </a>
        </h5>
      </div>
      <div className="hidden lg:block">
        <motion.img
          src={lucy}
          alt="anime character"
          loading="lazy"
          className="img main-img h-auto w-full rounded-xl object-cover"
          initial="hidden"
          animate={controls}
          variants={imageAnim}
        />
      </div>
    </motion.div>
  );
};

export default CTASection;
