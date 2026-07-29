import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FormRow, Logo } from "../components";
import { Button } from "@/components/ui/button";
import { useSetupUserMutation } from "../queries/auth";

const NOOP = () => {};

const SECTION_CLASS =
  "page-glow relative grid min-h-screen items-center justify-center overflow-hidden px-4 py-12";

const FORM_CLASS =
  "relative z-10 w-full max-w-[420px] rounded-2xl border border-border/70 bg-card p-8 shadow-lg sm:p-10";

const RegisterDemo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setupUserMutation = useSetupUserMutation();

  const onSubmit = useCallback(() => {
    setupUserMutation.mutate(
      {
        currentUser: { isDemo: true },
        endPoint: "register",
        alertText: t("register.alert_text"),
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigate("/top-animes");
          }, 3000);
        },
      }
    );
  }, [navigate, setupUserMutation, t]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

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
        <h3 className="text-center mb-8 text-2xl font-bold">{t("login.title")}</h3>
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
        <Button type="submit" size="lg" className="mt-7 w-full text-base font-semibold" disabled>
          {t("register.submit")}
        </Button>
      </form>
    </section>
  );
};

export default RegisterDemo;
