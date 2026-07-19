import CollectionStats from "./CollectionStats";
import RandomPickButton from "./RandomPickButton";
import ExportButtons from "./ExportButtons";

const CollectionToolbar = () => {
  return (
    <section className="flex flex-col gap-4 pt-2 lg:flex-row lg:items-start lg:justify-between">
      <CollectionStats />
      <div className="flex flex-wrap items-center gap-2">
        <RandomPickButton />
        <ExportButtons />
      </div>
    </section>
  );
};

export default CollectionToolbar;
