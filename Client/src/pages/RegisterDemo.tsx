import { useEffect, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Alert, FormRow, Logo } from "../Components/UI";
import { useAuthSelector } from "../stores/hooks";

const initialState = {
  name: "",
  email: "",
  password: "",
  existingUser: true,
};

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, showAlert, setupUser } = useAuthSelector((s) => ({
    user: s.user,
    showAlert: s.showAlert,
    setupUser: s.setupUser,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const currentUser = {
      isDemo: true,
    };

    setupUser({
      currentUser,
      endPoint: "register",
      alertText: t("register.alert_text"),
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/top-animes");
      }, 3000);
    }
  }, [user, navigate]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <section
      className="full-page min-h-screen grid items-center justify-center relative overflow-hidden before:content-[''] before:absolute before:top-[-50%] before:right-[-20%] before:w-[600px] before:h-[600px] before:rounded-full before:pointer-events-none before:bg-[radial-gradient(circle,rgba(212,54,124,0.08)_0%,transparent_70%)] after:content-[''] after:absolute after:bottom-[-30%] after:left-[-10%] after:w-[400px] after:h-[400px] after:rounded-full after:pointer-events-none after:bg-[radial-gradient(circle,rgba(212,54,124,0.06)_0%,transparent_70%)]"
      style={{
        background: "linear-gradient(135deg, var(--grey-50) 0%, var(--white) 50%, rgba(212, 54, 124, 0.05) 100%)",
      }}
    >
      <form
        className="relative z-10 w-full max-w-[420px] m-8 p-10 rounded-2xl bg-white/95 backdrop-blur-[10px] border border-primary-500/10 max-[480px]:m-4 max-[480px]:px-6 max-[480px]:py-8"
        style={{
          boxShadow: "0 4px 24px rgba(212, 54, 124, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Logo />
        <h3 className="text-center mb-8 text-grey-800 text-[1.75rem] font-semibold bg-[linear-gradient(135deg,var(--primary-500)_0%,var(--anime-pink)_50%,var(--primary-600)_100%)] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] max-[480px]:text-2xl">
          {values.existingUser ? t("login.title") : t("register.title")}
        </h3>
        {showAlert && <Alert />}
        {!values.existingUser && (
          <FormRow
            type="text"
            name="name"
            labelText={t("register.name")}
            value={values.name}
            handleChange={handleChange}
            disabled={true}
          />
        )}

        <FormRow
          type="email"
          name="email"
          labelText={t("register.email")}
          value={values.email}
          handleChange={handleChange}
          disabled={true}
        />
        <FormRow
          type="password"
          name="password"
          labelText={t("register.password")}
          value={values.password}
          handleChange={handleChange}
          disabled={true}
        />
        <button
          type="submit"
          className="btn btn-block mt-7 w-full font-semibold py-3.5 px-6 text-base opacity-60"
          disabled={true}
        >
          {t("register.submit")}
        </button>
      </form>
    </section>
  );
};

export default Register;
