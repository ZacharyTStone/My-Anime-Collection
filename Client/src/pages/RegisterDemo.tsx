import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Alert, FormRow, Logo } from "../Components/UI";
import { useAuthContext } from "../context/AuthContext";
import { useLanguageContext } from "../context/LanguageContext";
import { User } from "../utils/types";

const initialState = {
  name: "",
  email: "",
  password: "",
  existingUser: true,
  theme: "light",
};

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, showAlert, setupUser } = useAuthContext();
  const { siteLanguage } = useLanguageContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const currentUser = {
      isDemo: true,
    };

    console.log("wow", currentUser);

    setupUser({
      currentUser: currentUser as any,
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
  background-color: var(--grey-50);
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
    opacity: 0.6;
  }
`;

export default Register;
