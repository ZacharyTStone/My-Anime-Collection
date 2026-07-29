import { SearchContainer } from "../../components";
import { MyAnimesContainer } from "../../components";
import CollectionToolbar from "../../components/CollectionToolbar";

const MyAnimes = () => {
  return (
    <main className="min-h-screen">
      <CollectionToolbar />
      <SearchContainer className="mt-6" />
      <MyAnimesContainer />
    </main>
  );
};

export default MyAnimes;
