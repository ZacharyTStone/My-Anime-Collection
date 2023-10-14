import styled from "styled-components";
import narutoImage from "./naruto.png"; // Replace with the actual path to your Naruto image

const RunningImg = ({ img }: { img: string }) => {
  return (
    <Wrapper>
      <NarutoImg src={img} alt="Naruto running" />
    </Wrapper>
  );
};

const NarutoImg = styled.img`
  display: none;

  @media (min-width: 992px) {
    display: block;
    width: 100px;
    position: absolute;
    animation-name: run;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    top: 94%;

    @keyframes run {
      from {
        left: -100px;
      }
      to {
        left: 93%;
      }
    }

    // special styles for Naruto
    @media (min-height: 1200px) {
      top: 73%;
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

export default RunningImg;
