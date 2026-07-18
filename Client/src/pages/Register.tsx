import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FormRow, Logo, RunningImg } from "../Components/UI";
import narutoRun from "../assets/images/narutoRun.gif";
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

const SECTION_CLASS = "full-page min-h-screen grid items-center justify-center relative overflow-hidden register-bg before:content-[''] before:absolute before:top-[-50%] before:right-[-20%] before:w-[600px] before:h-[600px] before:rounded-full before:pointer-events-none before:bg-[radial-gradient(circle,rgba(212,54,124,0.08)_0%,transparent_70%)] after:content-[''] after:absolute after:bottom-[-30%] after:left-[-10%] after:w-[400px] after:h-[400px] after:rounded-full after:pointer-events-none after:bg-[radial-gradient(circle,rgba(212,54,124,0.06)_0%,transparent_70%)]";

const FORM_CLASS = "relative z-10 w-full max-w-[420px] m-8 p-10 rounded-2xl bg-[var(--outline-button-background)]/95 backdrop-blur-[10px] border border-primary-500/10 register-form-shadow max-[480px]:m-4 max-[480px]:px-6 max-[480px]:py-8";

const Register = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(initialState);
  const { user, isLoading, setupUser } = useAuthSelector((s) => ({
    user: s.user,
    isLoading: s.isLoading,
    setupUser: s.setupUser,
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
        <h3 className="text-center mb-8 text-grey-800 text-[1.75rem] font-semibold gradient-heading max-[480px]:text-2xl">
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
        <button
          type="submit"
          className="btn btn-block btn-submit mt-7 w-full font-semibold py-3.5 px-6 text-base"
          disabled={isLoading}
        >
          {values.existingUser ? t("login.submit") : t("register.submit")}
        </button>
        <p className="m-0 mt-7 text-center text-grey-600 text-[0.95rem]">
          {values.existingUser ? t("login.switch1") : t("register.switch1")}
          <button
            type="button"
            onClick={toggleExistingUser}
            className="bg-transparent border-none text-primary-500 cursor-pointer tracking-wide font-semibold px-1 transition-all duration-200 underline underline-offset-2 hover:text-primary-600 hover:decoration-2"
          >
            {values.existingUser ? t("login.switch2") : t("register.switch2")}
          </button>
        </p>
      </form>
      <div className="absolute top-[80vh] left-0 w-screen z-[1]">
        <RunningImg img={narutoRun} />
      </div>
    </section>
  );
};

export default Register;
