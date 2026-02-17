import { useState } from "react";
import { useTranslation } from "react-i18next";
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
    <section className="rounded-default w-full bg-white p-10 shadow">
      <form className="w-full p-4" onSubmit={handleSubmit}>
        <h3 className="relative mt-0 mb-8 font-semibold text-grey-900 after:content-[''] after:absolute after:bottom-[-0.75rem] after:left-0 after:w-16 after:h-[3px] after:bg-primary-500 after:rounded-sm">
          {t("profile.title")}
        </h3>
        {showAlert && <Alert />}
        <div className="grid gap-y-4 lg:grid-cols-2 lg:items-center lg:gap-x-6">
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

          <div className="flex justify-start mt-4 col-span-full">
            <button
              className="btn btn-submit mt-8!"
              type="submit"
              disabled={isLoading || isDemoUser}
            >
              {isLoading ? t("profile.wait") : t("profile.save")}
            </button>
          </div>
        </div>
        <Pokemon />
        <div className="mt-12 pt-8 border-t border-grey-200">
          <button
            className="btn btn-danger relative bg-grey-300 text-grey-700 transition-all duration-200 hover:bg-red-dark hover:text-white"
            onClick={handleDelete}
          >
            {t("profile.delete")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
