import * as React from "react";
import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import styled from "styled-components";

const PageBtnContainer: React.FC = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const handlePageChange = (newPage: number) => {
    changePage(((newPage + numOfPages - 1) % numOfPages) + 1);
  };

  const renderPageButton = (pageNumber: number) => (
    <button
      type="button"
      className={`pageBtn ${pageNumber === page ? "active" : ""}`}
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  return (
    <Wrapper>
      <button className="prev-btn" onClick={() => handlePageChange(page - 1)}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <ButtonContainer>
        {Array.from({ length: numOfPages }, (_, index) =>
          renderPageButton(index + 1)
        )}
      </ButtonContainer>
      <button className="next-btn" onClick={() => handlePageChange(page + 1)}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

const ButtonContainer = styled.div`
  background: var(--primary-100);
  border-radius: var(--borderRadius);
`;

const Wrapper = styled.section`
  height: 6rem;
  margin: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 50px;

  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .active {
    background: var(--primary-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`;

export default PageBtnContainer;
