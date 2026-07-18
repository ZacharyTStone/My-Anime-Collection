import { Link } from "react-router";
import { Button } from "@/Components/UI/button";
import { Card } from "@/Components/UI/card";
import img from "../assets/images/allanime.webp";

interface ErrorProps {
  className?: string;
  title?: string;
  message?: string;
  homeLink?: string;
}

const DEFAULT_TITLE = "Ohh! page not found";
const DEFAULT_MESSAGE = "We can't seem to find the page you're looking for";
const DEFAULT_HOME_LINK = "/my-animes";

const Error = ({
  className,
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE,
  homeLink = DEFAULT_HOME_LINK,
}: ErrorProps) => {
  return (
    <main
      className={`text-center flex items-center justify-center h-screen bg-cover bg-center ${className || ""}`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Card className="mx-4 max-w-[500px] p-8 opacity-95 shadow-lg">
        <h1 className="mb-2 text-[1.75rem] font-semibold">{title}</h1>
        <p className="mb-6 mt-0 text-base leading-relaxed text-muted-foreground">{message}</p>
        <Button asChild>
          <Link to={homeLink}>back home</Link>
        </Button>
      </Card>
    </main>
  );
};

export default Error;
