import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FormRow } from "../../components";
import { Pokemon } from "../../components";
import StreamingServicesPicker from "../../components/StreamingServicesPicker";
import { useAuthSelector } from "../../hooks/storeSelectors";
import { useDeleteUserMutation, useUpdateUserMutation } from "../../queries/auth";
import { User } from "../../utils/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { t } = useTranslation();
  const { user, logoutUser } = useAuthSelector((s) => ({
    user: s.user,
    logoutUser: s.logoutUser,
  }));
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();
  const isLoading = updateUserMutation.isPending;

  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<User["email"]>(user?.email || "");
  const isDemoUser = Boolean(user?.isDemo);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error(t("profile.provide_all_values"));
      return;
    }
    const theme = user?.theme || "light";
    updateUserMutation.mutate({ name, email, id: user?.id ?? "", theme });
  };

  const handleDelete = () => {
    if (user) {
      deleteUserMutation.mutate();
      logoutUser();
    }
  };

  return (
    <section className="w-full rounded-xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
      <form className="w-full" onSubmit={handleSubmit}>
        <h3 className="mb-6 mt-0">{t("profile.title")}</h3>
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

          <div className="col-span-full mt-4 flex justify-start">
            <Button type="submit" disabled={isLoading || isDemoUser}>
              {isLoading ? t("profile.wait") : t("profile.save")}
            </Button>
          </div>
        </div>
        <StreamingServicesPicker />
        <Pokemon />
        <Separator className="my-12" />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">{t("profile.delete")}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("profile.delete")}</AlertDialogTitle>
              <AlertDialogDescription>{t("profile.confirm")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("profile.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleDelete}
              >
                {t("profile.delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </section>
  );
};

export default Profile;
