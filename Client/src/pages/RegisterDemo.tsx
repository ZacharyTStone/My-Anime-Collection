import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FormRow, Logo } from "../components";
import { Button } from "@/components/ui/button";
import { useSetupUserMutation } from "../queries/auth";

const NOOP = () => {};

const REDIRECT_DELAY_MS = 3000;

const SECTION_CLASS =
  "page-glow relative grid min-h-screen items-center justify-center overflow-hidden px-4 py-12";

const FORM_CLASS =
  "relative z-10 w-full max-w-[420px] rounded-2xl border border-border/70 bg-card p-8 shadow-lg sm:p-10";

const RegisterDemo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Destructure `mutate`, which useMutation keeps stable — the result object
  // around it is rebuilt on every state transition.
  const { mutate, isError } = useSetupUserMutation();
  const hasRequestedDemo = useRef(false);

  const createDemoUser = useCallback(() => {
    mutate(
      {
        currentUser: { isDemo: true },
        endPoint: "register",
        alertText: t("register.alert_text"),
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigate("/top-animes");
          }, REDIRECT_DELAY_MS);
        },
      }
    );
  }, [mutate, navigate, t]);

  // One demo account per visit. This effect used to depend on the whole
  // mutation object, whose identity changes on every render, so each
  // idle -> pending -> settled transition re-fired it: the page spent the
  // /register rate limit (10 per 10 minutes) in under a second and then
  // buried itself in error toasts.
  useEffect(() => {
    if (hasRequestedDemo.current) return;
    hasRequestedDemo.current = true;
    createDemoUser();
  }, [createDemoUser]);

  return (
    <section className={SECTION_CLASS}>
      <form
        className={FORM_CLASS}
        onSubmit={(e) => {
          e.preventDefault();
          createDemoUser();
        }}
      >
        <Logo className="mb-4" />
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
        {/* Enabled only after a failure, so a dead end becomes a deliberate retry */}
        <Button
          type="submit"
          size="lg"
          className="mt-7 w-full text-base font-semibold"
          disabled={!isError}
        >
          {isError ? t("register.retry") : t("register.submit")}
        </Button>
      </form>
    </section>
  );
};

export default RegisterDemo;
