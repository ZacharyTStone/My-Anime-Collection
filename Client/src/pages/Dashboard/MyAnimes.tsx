import { Alert } from "../../Components/UI";
import { SearchContainer } from "../../Components";
import { MyAnimesContainer } from "../../Components";
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
