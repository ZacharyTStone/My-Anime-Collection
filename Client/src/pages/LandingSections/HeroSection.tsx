import { motion } from "framer-motion";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { Button } from "@/Components/UI/button";
import { sampleAnimes } from "../../assets/images/sampleAnimes";

const POSTER_TILTS = [
  "-rotate-6 translate-y-6",
  "-rotate-3 translate-y-2",
  "rotate-0",
  "rotate-2 translate-y-1",
  "rotate-6 translate-y-5",
];

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="page-glow relative overflow-hidden">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 pb-20 pt-32 text-center lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/5 px-4 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400">
            <Sparkles className="size-4" aria-hidden="true" />
            {t("landing.hero_badge")}
          </span>

          <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
            <span className="gradient-heading">{t("landing.title")}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("landing.title_description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base shadow-md shadow-primary-500/20">
              <Link to="/register">{t("landing.login_button")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
              <Link to="/register-demo">{t("landing.demo_button")}</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-20 flex items-end justify-center"
          aria-hidden="true"
        >
          {sampleAnimes.slice(0, 5).map((poster, i) => (
            <img
              key={poster}
              src={poster}
              alt=""
              loading={i < 3 ? "eager" : "lazy"}
              className={`${POSTER_TILTS[i]} ${i > 2 ? "hidden sm:block" : ""} -mx-3 aspect-2/3 w-32 rounded-xl border border-border/60 object-cover shadow-lg sm:w-40 lg:w-44`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
