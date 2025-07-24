import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Alert, FormRow, Logo, RunningImg } from "../Components/UI";
import narutoRun from "../assets/images/narutoRun.gif";
import { useAppContext } from "../context/appContext";
import { User } from "../utils/types";

interface FormValues extends Partial<User> {
  password?: string;
  existingUser?: boolean;
}

const initialState: FormValues = {
  id: "",
  username: "",
  email: "",
  password: "",
  existingUser: false,
};

const Register: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser, siteLanguage } =
    useAppContext();

  const toggleExistingUser = () => {
    setValues({ ...values, existingUser: !values.existingUser });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, existingUser } = values;
    const isDemo = false;
    const theme = "light";

    if (!email || !password || (!existingUser && !username)) {
      displayAlert();
      return;
    }
    const currentUser = { id: "", username: username || "", email, password };

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
              name="username"
              labelText={t("register.name")}
              value={values.username || ""}
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
  background-color: var(--grey-50);
  .run {
    position: absolute;
    top: 80vh;
    left: 0;
    width: 100vw;
  }
  display: grid;
  align-items: center;

  .form {
    max-width: 420px;
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--grey-200);
    background-color: var(--white);
    transition: var(--transition);
  }

  h3 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--grey-900);
  }

  p {
    margin: 0;
    margin-top: 1.5rem;
    text-align: center;
    color: var(--grey-600);
  }

  .btn {
    margin-top: 1.5rem;
    width: 100%;
    font-weight: 500;
  }

  .existing-user-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-600);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
    font-weight: 500;
    padding: 0 0.25rem;
    transition: var(--transition);

    &:hover {
      color: var(--primary-700);
    }
  }
`;
export default Register;
