import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  BadgeCheck,
  MousePointerClick,
  ShieldCheck,
  EyeOff,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface FeaturePoint {
  key: string;
  icon: LucideIcon;
}

const FEATURE_POINTS: FeaturePoint[] = [
  { key: "point1", icon: BadgeCheck },
  { key: "point2", icon: MousePointerClick },
  { key: "point3", icon: ShieldCheck },
  { key: "point4", icon: EyeOff },
  { key: "point5", icon: Rocket },
  { key: "point6", icon: Sparkles },
];

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold sm:text-4xl">
          {t("landing.why.title")}
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_POINTS.map(({ key, icon: Icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              className="rounded-xl border border-border/70 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <p className="leading-relaxed text-foreground">{t(`landing.why.${key}`)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
