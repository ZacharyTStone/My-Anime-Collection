import { SearchContainer } from "../../Components";
import { MyAnimesContainer } from "../../Components";
import CollectionToolbar from "../../Components/CollectionToolbar";

const MyAnimes = () => {
  return (
    <main className="content full-page">
      <CollectionToolbar />
      <SearchContainer />
      <MyAnimesContainer />
    </main>
  );
};

export default MyAnimes;
