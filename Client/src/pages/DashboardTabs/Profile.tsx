import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FormRow, Alert } from "../../Components/UI";
import { Pokemon } from "../../Components";
import { useAuthStore } from "../../stores/authStore";
import { useShallow } from "zustand/react/shallow";
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
  } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      showAlert: s.showAlert,
      displayAlert: s.displayAlert,
      updateUser: s.updateUser,
      isLoading: s.isLoading,
      deleteUser: s.deleteUser,
      logoutUser: s.logoutUser,
    }))
  );

  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<User["email"]>(user?.email || "");
  const isDemoUser = Boolean(user?.isDemo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email) {
      displayAlert();
      return;
    }
    const theme = user?.theme || "light";
    updateUser({ name, email, id: user?.id ?? "", theme });
  };

  const handleDelete = () => {
    if (!window.confirm(t("profile.confirm"))) {
      return;
    }
    if (user) {
      deleteUser();
      logoutUser();
    }
  };

  return (
    <Wrapper>
      <form className="form form-embedded" onSubmit={handleSubmit}>
        <h3>{t("profile.title")}</h3>
        {showAlert && <Alert />}
        <div className="form-center form-grid">
          <FormRow
            disabled={isLoading || isDemoUser}
            type="text"
            name="name"
            labelText={t("profile.name")}
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            disabled={isLoading || isDemoUser}
            type="email"
            name="email"
            labelText={t("profile.email")}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <div className="btn-container">
            <button
              className="btn btn-submit"
              type="submit"
              disabled={isLoading || isDemoUser}
            >
              {isLoading ? t("profile.wait") : t("profile.save")}
            </button>
          </div>
        </div>
        <Pokemon />
        <div className="bottom-half">
          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            {t("profile.delete")}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
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

  .btn-submit {
    margin-top: 2rem !important;
  }

  .btn-container {
    display: flex;
    justify-content: flex-start;
    margin-top: 1rem;
    grid-column: 1 / -1;
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

  .bottom-half {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--grey-200);
  }

  @media (min-width: 1120px) {
    .form-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default Profile;
