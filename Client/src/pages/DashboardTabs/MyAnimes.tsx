import { Alert } from "../../Components/UI";
import { SearchContainer } from "../../Components";
import { MyAnimesContainer } from "../../Components";
import { useAuthStore } from "../../stores/authStore";

const MyAnimes = () => {
  const showAlert = useAuthStore((s) => s.showAlert);
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
