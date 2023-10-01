import styled from "styled-components";
const RunningImg = ({ img }: { img: string }) => {
  return (
    <Wrapper>
      <img src={img} alt="anime character" className="img naruto" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .naruto {
    display: none;
  }

  @media (min-width: 992px) {
    .naruto {
      display: block;
      width: 100px;
      position: absolute;
      animation-name: run;
      animation-duration: 5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      top: 94%;
    }

    @keyframes run {
      from {
        left: -100px;
      }
      to {
        left: 93%;
      }
    }
  }

  // special styles for nartuto
  @media (min-height: 1200px) {
    .naruto {
      top: 73%;
    }
  }
`;

export default RunningImg;
