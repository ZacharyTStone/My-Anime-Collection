import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FormRow, Logo } from "../Components/UI";
import { Button } from "@/Components/UI/button";
import { useAuthSelector } from "../stores/hooks";

const NOOP = () => {};

const SECTION_CLASS = "full-page min-h-screen grid items-center justify-center relative overflow-hidden register-bg before:content-[''] before:absolute before:top-[-50%] before:right-[-20%] before:w-[600px] before:h-[600px] before:rounded-full before:pointer-events-none before:bg-[radial-gradient(circle,rgba(212,54,124,0.08)_0%,transparent_70%)] after:content-[''] after:absolute after:bottom-[-30%] after:left-[-10%] after:w-[400px] after:h-[400px] after:rounded-full after:pointer-events-none after:bg-[radial-gradient(circle,rgba(212,54,124,0.06)_0%,transparent_70%)]";

const FORM_CLASS = "relative z-10 w-full max-w-[420px] m-8 p-10 rounded-2xl bg-[var(--outline-button-background)]/95 backdrop-blur-[10px] border border-primary-500/10 register-form-shadow max-[480px]:m-4 max-[480px]:px-6 max-[480px]:py-8";

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
        <h3 className="text-center mb-8 text-grey-800 text-[1.75rem] font-semibold gradient-heading max-[480px]:text-2xl">
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
