import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/Components/UI/button";
import Logo from "../Components/UI/Logo";
import FlagContainer from "../Components/FlagContainer";
import HeroSection from "./LandingSections/HeroSection";
import FeaturesSection from "./LandingSections/FeaturesSection";
import CTASection from "./LandingSections/CTASection";

const Testimonials = lazy(() => import("../Components/Testimonials"));

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
          <Logo width="72px" className="mx-0" />
          <div className="flex items-center gap-1">
            <FlagContainer />
            <Button asChild variant="ghost">
              <Link to="/register">{t("landing.login_button")}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        <CTASection />
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-2 px-6 py-10 text-center text-sm text-muted-foreground">
          <Logo width="56px" />
          <p className="mt-2">
            {t("landing.call_to_action.contact_info")}{" "}
            <a
              href="https://zstone.dev"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              ZStone.dev
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
