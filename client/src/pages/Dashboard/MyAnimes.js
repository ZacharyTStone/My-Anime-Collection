import { AnimesContainer, SearchContainer, Alert } from "../../Components";
import { useAppContext } from "../../context/appContext";

const MyAnimes = () => {
  const { showAlert } = useAppContext();
  return (
    <>
      <main className="content full-page" datatype="">
        {showAlert && <Alert />}
        <SearchContainer />
        <AnimesContainer />
      </main>
    </>
  );
};

export default MyAnimes;
