import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../Components/UI";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  theme: "light",
};

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, showAlert, setupUser, theme, siteLanguage } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const localTheme = theme ? theme : "light";
  const onSubmit = () => {
    const currentUser = {
      isDemo: true,
      theme: localTheme,
      language: siteLanguage,
    };

    console.log("wow", currentUser);

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
    <div data-theme={theme ? theme : "light"}>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>{values.isMember ? t("login.title") : t("register.title")}</h3>
          {showAlert && <Alert />}
          {/* name input */}
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              labelText={t("register.name")}
              value={values.name}
              handleChange={handleChange}
              disabled={true}
            />
          )}

          {/* email input */}
          <FormRow
            type="email"
            name="email"
            labelText={t("register.email")}
            value={values.email}
            handleChange={handleChange}
            disabled={true}
          />
          {/* password input */}
          <FormRow
            type="password"
            name="password"
            labelText={t("register.password")}
            value={values.password}
            handleChange={handleChange}
            disabled={true}
          />
          <button type="submit" className="btn btn-block" disabled={true}>
            {t("register.submit")}
          </button>
        </form>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section`
  background-color: var(--white);
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
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
