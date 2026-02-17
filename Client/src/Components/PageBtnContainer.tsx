import * as React from "react";
import { useAnimeStore } from "../stores/animeStore";
import { useShallow } from "zustand/react/shallow";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { cn } from "../utils/cn";

const PageBtnContainer: React.FC = () => {
  const { numOfPages, page, changePage } = useAnimeStore(
    useShallow((s) => ({ numOfPages: s.numOfPages, page: s.page, changePage: s.changePage }))
  );

  const handlePageChange = (newPage: number) => {
    changePage(((newPage + numOfPages - 1) % numOfPages) + 1);
  };

  const renderPageButton = (pageNumber: number) => (
    <button
      type="button"
      className={cn(
        "bg-transparent border-transparent w-[50px] h-[40px] font-bold text-[1.25rem] text-primary-500 transition-all rounded-default cursor-pointer",
        pageNumber === page && "bg-primary-500 text-white"
      )}
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  return (
    <section className="h-24 m-8 flex items-center justify-center flex-wrap gap-4 mt-[50px]">
      <button
        className="w-[100px] h-[40px] bg-white border-transparent rounded-default text-primary-500 capitalize tracking-[0.5px] flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-primary-500 hover:text-white"
        onClick={() => handlePageChange(page - 1)}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="bg-primary-100 rounded-default">
        {Array.from({ length: numOfPages }, (_, index) =>
          renderPageButton(index + 1)
        )}
      </div>
      <button
        className="w-[100px] h-[40px] bg-white border-transparent rounded-default text-primary-500 capitalize tracking-[0.5px] flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-primary-500 hover:text-white"
        onClick={() => handlePageChange(page + 1)}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </section>
  );
};

export default PageBtnContainer;
