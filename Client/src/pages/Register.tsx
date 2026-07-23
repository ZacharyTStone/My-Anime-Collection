import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { FormRow, Logo } from "../Components/UI";
import { Button } from "@/Components/UI/button";
import { useAuthSelector } from "../stores/hooks";
import { User } from "../utils/types";

interface FormValues extends Partial<User> {
  password?: string;
  existingUser?: boolean;
}

const initialState: FormValues = {
  id: "",
  name: "",
  email: "",
  password: "",
  existingUser: false,
};

const SECTION_CLASS = "page-glow relative grid min-h-screen items-center justify-center overflow-hidden px-4 py-12";

const FORM_CLASS = "relative z-10 w-full max-w-[420px] rounded-2xl border border-border/70 bg-card p-8 shadow-lg sm:p-10";

const Register = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(initialState);
  const { user, isLoading, setupUser, googleSSO } = useAuthSelector((s) => ({
    user: s.user,
    isLoading: s.isLoading,
    setupUser: s.setupUser,
    googleSSO: s.googleSSO,
  }));
  const toggleExistingUser = () => {
    setValues({ ...values, existingUser: !values.existingUser });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, existingUser } = values;

    if (!email || !password || (!existingUser && !name)) {
      toast.error(t("register.provide_all_values", { defaultValue: "Please provide all values!" }));
      return;
    }
    const currentUser = { id: "", name: name || "", email, password };

    if (existingUser) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: t("login.alert_text"),
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: t("register.alert_text"),
      });
    }
  };

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        navigate("/top-animes");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <section className={SECTION_CLASS}>
      <form className={FORM_CLASS} onSubmit={onSubmit}>
        <Logo />
        <h3 className="text-center mb-8 text-2xl font-bold">
          {values.existingUser ? t("login.title") : t("register.title")}
        </h3>
        {!values.existingUser && (
          <FormRow
            type="text"
            name="name"
            labelText={t("register.name")}
            value={values.name || ""}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          labelText={t("register.email")}
          value={values.email || ""}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          labelText={t("register.password")}
          value={values.password || ""}
          handleChange={handleChange}
        />
        <Button
          type="submit"
          size="lg"
          className="mt-7 w-full text-base font-semibold"
          disabled={isLoading}
        >
          {values.existingUser ? t("login.submit") : t("register.submit")}
        </Button>
        {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
          <>
            <div className="flex items-center gap-3 my-5 text-muted-foreground text-[0.85rem]">
              <span className="flex-1 h-px bg-grey-300" aria-hidden="true" />
              {t("sso.or", { defaultValue: "or" })}
              <span className="flex-1 h-px bg-grey-300" aria-hidden="true" />
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(response) => {
                  if (!response.credential) {
                    toast.error(
                      t("sso.error", { defaultValue: "Google sign-in failed. Please try again." })
                    );
                    return;
                  }
                  googleSSO({
                    credential: response.credential,
                    alertText: t("sso.alert_text", { defaultValue: "Signed in with Google!" }),
                  });
                }}
                onError={() => {
                  toast.error(
                    t("sso.error", { defaultValue: "Google sign-in failed. Please try again." })
                  );
                }}
              />
            </div>
          </>
        )}
        <p className="m-0 mt-7 text-center text-muted-foreground text-[0.95rem]">
          {values.existingUser ? t("login.switch1") : t("register.switch1")}
          <Button
            type="button"
            variant="link"
            onClick={toggleExistingUser}
            className="px-1 font-semibold text-primary-500"
          >
            {values.existingUser ? t("login.switch2") : t("register.switch2")}
          </Button>
        </p>
      </form>
    </section>
  );
};

export default Register;
