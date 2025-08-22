import { Alert } from "../../Components/UI";
import { SearchContainer } from "../../Components";
import { MyAnimesContainer } from "../../Components";
import { useAuthContext } from "../../context/AuthContext";

const MyAnimes = () => {
  const { showAlert } = useAuthContext();
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
