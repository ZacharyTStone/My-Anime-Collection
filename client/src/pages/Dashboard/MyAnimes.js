import { Alert } from "../../Components/Atoms";
import { SearchContainer } from "../../Components/Molecules";
import { MyAnimesContainer } from "../../Components/Organisms";
import { useAppContext } from "../../context/appContext";

const MyAnimes = () => {
  const { showAlert } = useAppContext();
  return (
    <>
      <main className="content full-page" datatype="">
        {showAlert && <Alert />}
        <SearchContainer />
        <MyAnimesContainer />
      </main>
    </>
  );
};

export default MyAnimes;
