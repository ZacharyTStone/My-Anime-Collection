import { useState } from "react";
import { FormRow, Alert } from "../../Components/UI";

import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import { BiCoffeeTogo } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Pokemon } from "../../Components";
import { User } from "../../utils/types";

const Profile = () => {
  const { t } = useTranslation();
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    deleteUser,
    logoutUser,
  } = useAppContext();

  const [name, setName] = useState<User["name"]>(user?.name);
  const [email, setEmail] = useState<User["email"]>(user?.email);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email) {
      displayAlert();
      return;
    }
    updateUser({ name, email, theme: "light" });
  };

  const handleDelete = () => {
    if (!window.confirm(t("profile.confirm"))) {
      return;
    }
    deleteUser();
    logoutUser();
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{t("profile.title")}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            disabled={isLoading || user?.isDemo}
            type="text"
            name="name"
            labelText={t("profile.name")}
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            disabled={isLoading || user?.isDemo}
            type="email"
            name="email"
            labelText={t("profile.email")}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="btn btn-block btn-submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? t("profile.wait") : t("profile.save")}
          </button>
        </div>
        <Pokemon />
        <div className="bottom-half ">
          <div>
            <span
              style={{
                marginRight: "10px",
              }}
            >
              {t("profile.enjoy")}
            </span>
            <ButtonDiv>
              <div>
                <button className="btn btn-outline" type="button">
                  <a
                    href="https://www.buymeacoffee.com/zachinjapan"
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <BiCoffeeTogo color="var(--primary-500)" />
                      <span>{t("profile.buy_me_a_coffee")}</span>
                    </div>
                  </a>
                </button>
                <button className="btn btn-outline" type="button">
                  <a
                    href="https://commerce.coinbase.com/checkout/ae3c63d4-ddd8-485e-a6d9-8b1dce89ee42"
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaBitcoin color="var(--primary-500)" />
                      <span>{t("profile.crypto")}</span>
                    </div>
                    <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
                  </a>
                </button>
              </div>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete()}
                >
                  {t("profile.delete")}
                </button>
              </div>
            </ButtonDiv>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.section`
  .btn-submit {
    margin-top: 2rem !important;
  }

  .btn-outline:hover {
    background-color: var(--primary-50);
    color: var(--primary-700);
    border-color: var(--primary-400);
  }

  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 2.5rem;
  box-shadow: var(--shadow);

  h3 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 600;
    color: var(--grey-900);
    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: -0.75rem;
      left: 0;
      width: 4rem;
      height: 3px;
      background-color: var(--primary-500);
      border-radius: 2px;
    }
  }

  .btn-danger {
    position: relative;
    background-color: var(--grey-300);
    color: var(--grey-700);
    transition: all 0.2s ease;

    :hover {
      background-color: var(--red-dark);
      color: white;
    }
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 1.5rem;
  }

  .form-center {
    display: grid;
    row-gap: 1rem;
  }

  .form-center button {
    align-self: end;
    height: 42px;
    margin-top: 1.5rem;
  }

  .bottom-half {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--grey-200);
  }

  .bottom-half span {
    color: var(--grey-700);
    font-weight: 500;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1.5rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }

    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Profile;
