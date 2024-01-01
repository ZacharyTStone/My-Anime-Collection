import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Logo, FormRow, Alert } from "../Components/UI";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { RunningImg } from "../Components/UI";
import narutoRun from "../assets/images/narutoRun.gif";
import { useTranslation } from "react-i18next";

interface FormValues {
  name: string;
  email: string;
  password: string;
  isDemo: boolean;
  theme: string;
  existingUser?: boolean;
}

const initialState: FormValues = {
  name: "",
  email: "",
  password: "",
  isDemo: false,
  theme: "light",
};

const Register: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(initialState);
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    setupUser,
    theme,
    siteLanguage,
  } = useAppContext();

  const toggleExistingUser = () => {
    setValues({ ...values, existingUser: !values.existingUser });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const localTheme = theme ? theme : "light";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, existingUser } = values;
    const isDemo = false;
    const theme = localTheme;

    if (!email || !password || (!existingUser && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password, theme, isDemo, siteLanguage };

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
      setTimeout(() => {
        navigate("/top-animes");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div data-theme={theme ? theme : "light"}>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>
            {values.existingUser ? t("login.title") : t("register.title")}
          </h3>
          {showAlert && <Alert />}
          {/* name input */}
          {!values.existingUser && (
            <FormRow
              type="text"
              name="name"
              labelText={t("register.name")}
              value={values.name}
              handleChange={handleChange}
            />
          )}

          {/* email input */}
          <FormRow
            type="email"
            name="email"
            labelText={t("register.email")}
            value={values.email}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type="password"
            name="password"
            labelText={t("register.password")}
            value={values.password}
            handleChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-block btn-submit"
            disabled={isLoading}
          >
            {t("register.submit")}
          </button>
          <p>
            {values.existingUser ? t("login.switch1") : t("register.switch1")}
            <button
              type="button"
              onClick={toggleExistingUser}
              className="existing-user-btn"
            >
              {values.existingUser ? t("login.switch2") : t("register.switch2")}
            </button>
          </p>
        </form>
        <div className="run">
          <RunningImg img={narutoRun} />
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section`
  background-color: var(--white);
  .run {
    position: absolute;
    top: 80vh;
    left: 0;
    width: 100vw;
  }
  display: grid;
  align-items: center;

  .form {
    max-width: 400px;
    border-top: 2px solid var(--primary-500);
    border-left: 1px solid var(--primary-500);
    border-right: 1px solid var(--primary-500);
    border-bottom: 2px solid var(--primary-500);
    box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.1);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .existing-user-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Register;
