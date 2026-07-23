import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/Components/UI/button";
import { Card } from "@/Components/UI/card";

interface ErrorProps {
  className?: string;
  title?: string;
  message?: string;
  homeLink?: string;
}

const DEFAULT_HOME_LINK = "/my-animes";

const Error = ({
  className,
  title,
  message,
  homeLink = DEFAULT_HOME_LINK,
}: ErrorProps) => {
  const { t } = useTranslation();

  return (
    <main
      className={`page-glow flex h-screen items-center justify-center px-4 text-center ${className || ""}`}
    >
      <Card className="mx-4 max-w-[500px] border-border/70 p-8 shadow-lg">
        <p className="mb-2 text-6xl font-bold text-primary-500" aria-hidden="true">
          404
        </p>
        <h1 className="mb-2 text-[1.75rem] font-semibold">
          {title ?? t("error_page.title")}
        </h1>
        <p className="mb-6 mt-0 text-base leading-relaxed text-muted-foreground">
          {message ?? t("error_page.message")}
        </p>
        <Button asChild>
          <Link to={homeLink}>{t("error_page.back_home")}</Link>
        </Button>
      </Card>
    </main>
  );
};

export default Error;
