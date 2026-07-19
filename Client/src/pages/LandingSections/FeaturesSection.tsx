import { motion, type Variants } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useInViewAnimation } from "../../utils/hooks";
import aot from "../../assets/images/aot.png";

const LIST_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.3, duration: 0.5 },
  }),
};

const FEATURE_POINTS = ["point1", "point2", "point3", "point4", "point5", "point6"];

interface FeaturesSectionProps {
  controls: ReturnType<typeof useInViewAnimation>["controls"];
  ref: (node?: Element | null) => void;
  fadeIn: Variants;
  imageAnim: Variants;
  sectionClass: string;
  twoColClass: string;
}

const FeaturesSection = ({ controls, ref, fadeIn, imageAnim, sectionClass, twoColClass }: FeaturesSectionProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={`${sectionClass} ${twoColClass}`}
      initial="hidden"
      animate={controls}
      ref={ref}
      variants={fadeIn}
    >
      <div className="hidden lg:block">
        <motion.img
          src={aot}
          alt="anime character"
          loading="lazy"
          className="h-auto w-full rounded-xl object-cover"
          initial="hidden"
          animate={controls}
          variants={imageAnim}
        />
      </div>
      <div>
        <h3 className="font-semibold mb-6 leading-[1.4] text-xl lg:text-[2rem] lg:mb-8">
          <span className="gradient-heading">
            {t("landing.why.title")}
          </span>
        </h3>
        <motion.ul initial="hidden" animate="visible" variants={LIST_ITEM_VARIANTS}>
          {FEATURE_POINTS.map((point, index) => (
            <motion.li
              key={point}
              custom={index}
              variants={LIST_ITEM_VARIANTS}
              className="mb-3 flex items-start gap-3 text-base leading-[1.6] text-muted-foreground"
            >
              <FaCheck color="var(--primary-500)" className="mt-1.5 shrink-0" />
              <span className="font-normal text-foreground">{t(`landing.why.${point}`)}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;
