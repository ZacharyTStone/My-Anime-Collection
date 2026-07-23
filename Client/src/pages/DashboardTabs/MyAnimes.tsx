import { SearchContainer } from "../../Components";
import { MyAnimesContainer } from "../../Components";
import CollectionToolbar from "../../Components/CollectionToolbar";

const MyAnimes = () => {
  return (
    <main className="full-page">
      <CollectionToolbar />
      <SearchContainer className="mt-6" />
      <MyAnimesContainer />
    </main>
  );
};

export default MyAnimes;
