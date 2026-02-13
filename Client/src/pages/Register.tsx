import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Alert, FormRow, Logo, RunningImg } from "../Components/UI";
import narutoRun from "../assets/images/narutoRun.gif";
import { useAuthContext } from "../context/AuthContext";
import { useLanguageContext } from "../context/LanguageContext";
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

const Register: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } = useAuthContext();
  const { siteLanguage } = useLanguageContext();

  const toggleExistingUser = () => {
    setValues({ ...values, existingUser: !values.existingUser });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, existingUser } = values;
    const isDemo = false;
    const theme = "light";

    if (!email || !password || (!existingUser && !name)) {
      displayAlert();
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
      setTimeout(() => {
        navigate("/top-animes");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div>
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
              value={values.name || ""}
              handleChange={handleChange}
            />
          )}

          {/* email input */}
          <FormRow
            type="email"
            name="email"
            labelText={t("register.email")}
            value={values.email || ""}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type="password"
            name="password"
            labelText={t("register.password")}
            value={values.password || ""}
            handleChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-block btn-submit"
            disabled={isLoading}
          >
            {values.existingUser ? t("login.submit") : t("register.submit")}
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
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--grey-50) 0%,
    var(--white) 50%,
    rgba(212, 54, 124, 0.05) 100%
  );
  position: relative;
  overflow: hidden;

  /* Decorative background elements */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(212, 54, 124, 0.08) 0%,
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(212, 54, 124, 0.06) 0%,
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
  }

  .run {
    position: absolute;
    top: 80vh;
    left: 0;
    width: 100vw;
    z-index: 1;
  }

  .form {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 420px;
    margin: 2rem;
    padding: 2.5rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow:
      0 4px 24px rgba(212, 54, 124, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(212, 54, 124, 0.1);
  }

  h3 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--grey-800);
    font-size: 1.75rem;
    font-weight: 600;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin: 0;
    margin-top: 1.75rem;
    text-align: center;
    color: var(--grey-600);
    font-size: 0.95rem;
  }

  .btn {
    margin-top: 1.75rem;
    width: 100%;
    font-weight: 600;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  .existing-user-btn {
    background: transparent;
    border: none;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
    font-weight: 600;
    padding: 0 0.25rem;
    transition: all 0.2s ease;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: var(--primary-600);
      text-decoration-thickness: 2px;
    }
  }

  @media (max-width: 480px) {
    .form {
      margin: 1rem;
      padding: 2rem 1.5rem;
    }

    h3 {
      font-size: 1.5rem;
    }
  }
`;
export default Register;
