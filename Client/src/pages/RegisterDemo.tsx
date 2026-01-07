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
    opacity: 0.6;
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
