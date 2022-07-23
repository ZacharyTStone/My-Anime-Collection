import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../Components/Atoms";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, showAlert, setupUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    const { name, email, password, isDemo } = {
      name: "DEMO",
      email:
        "DEMO" +
        Math.floor(Math.random() * 100) +
        Math.floor(Math.random() * 101) +
        Math.floor(Math.random() * 102) +
        "@demo.com",
      password: "DEMO" + Math.floor(Math.random() * 100) + "DEMO",
      isDemo: true,
    };

    const currentUser = {
      name,
      email,
      password,
      isDemo,
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
        navigate("/my-animes");
      }, 3000);
    }
  }, [user, navigate]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
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
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          labelText={t("register.email")}
          value={values.email}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          labelText={t("register.password")}
          value={values.password}
        />
        <button type="submit" className="btn btn-block" disabled={true}>
          {t("register.submit")}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
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
