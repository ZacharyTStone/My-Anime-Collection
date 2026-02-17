import { Link } from "react-router";
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

const Error: React.FC<ErrorProps> = ({
  className,
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE,
  homeLink = DEFAULT_HOME_LINK,
}) => {
  return (
    <main
      className={`text-center flex items-center justify-center h-screen bg-cover bg-center ${className || ""}`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="full-page bg-white p-8 opacity-90 rounded-default max-w-[500px] mx-4" style={{ boxShadow: "var(--shadow-lg)" }}>
        <h1 className="mb-2 text-grey-900 text-[1.75rem] font-semibold">{title}</h1>
        <p className="mt-0 mb-6 text-grey-500 text-base leading-relaxed">{message}</p>
        <Link
          to={homeLink}
          className="text-primary-500 underline capitalize font-medium transition-colors duration-300 hover:text-primary-600"
        >
          back home
        </Link>
      </div>
    </main>
  );
};

export default Error;
