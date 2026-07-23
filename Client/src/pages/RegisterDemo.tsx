import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FormRow, Logo } from "../Components/UI";
import { Button } from "@/Components/UI/button";
import { useAuthSelector } from "../stores/hooks";

const NOOP = () => {};

const SECTION_CLASS = "page-glow relative grid min-h-screen items-center justify-center overflow-hidden px-4 py-12";

const FORM_CLASS = "relative z-10 w-full max-w-[420px] rounded-2xl border border-border/70 bg-card p-8 shadow-lg sm:p-10";

const RegisterDemo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setupUser } = useAuthSelector((s) => ({
    user: s.user,
    setupUser: s.setupUser,
  }));

  const onSubmit = () => {
    setupUser({
      currentUser: { isDemo: true },
      endPoint: "register",
      alertText: t("register.alert_text"),
    });
  };

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        navigate("/top-animes");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <section className={SECTION_CLASS}>
      <form
        className={FORM_CLASS}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Logo />
        <h3 className="text-center mb-8 text-2xl font-bold">
          {t("login.title")}
        </h3>
        <FormRow
          type="email"
          name="email"
          labelText={t("register.email")}
          value=""
          handleChange={NOOP}
          disabled
        />
        <FormRow
          type="password"
          name="password"
          labelText={t("register.password")}
          value=""
          handleChange={NOOP}
          disabled
        />
        <Button
          type="submit"
          size="lg"
          className="mt-7 w-full text-base font-semibold"
          disabled
        >
          {t("register.submit")}
        </Button>
      </form>
    </section>
  );
};

export default RegisterDemo;
