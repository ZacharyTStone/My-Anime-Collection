import { Alert } from "../../Components/UI";
import { SearchContainer } from "../../Components";
import { MyAnimesContainer } from "../../Components";
import { useAuthSelector } from "../../stores/hooks";

const MyAnimes = () => {
  const { showAlert } = useAuthSelector((s) => ({ showAlert: s.showAlert }));
  return (
    <main className="content full-page">
      {showAlert && <Alert />}
      <SearchContainer />
      <MyAnimesContainer />
    </main>
  );
};

export default MyAnimes;
