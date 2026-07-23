import { motion } from "framer-motion";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/Components/UI/button";

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-24 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="page-glow relative overflow-hidden rounded-2xl border border-primary-500/15 bg-card px-6 py-16 text-center shadow-sm sm:px-16"
      >
        <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
          {t("landing.call_to_action.title")}
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 px-8 text-base shadow-md shadow-primary-500/20">
            <Link to="/register">{t("landing.login_button")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
            <Link to="/register-demo">{t("landing.demo_button")}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
