import styled, { keyframes } from "styled-components";
import A1 from "../assets/images/sampleAnimes/A1.webp";
import A2 from "../assets/images/sampleAnimes/A2.webp";
import A3 from "../assets/images/sampleAnimes/A3.webp";
import A4 from "../assets/images/sampleAnimes/A4.webp";
import A5 from "../assets/images/sampleAnimes/A5.webp";
import A6 from "../assets/images/sampleAnimes/A6.webp";
import A7 from "../assets/images/sampleAnimes/A7.webp";
import A8 from "../assets/images/sampleAnimes/A8.webp";

const BackgroundAnimeCards = () => {
  return (
    <Wrapper>
      <div className="animesLeft">
        <AnimeCard
          src={A1}
          alt="anime character"
          className="animeCard left"
          loading="lazy"
        />
        <AnimeCard
          src={A2}
          alt="anime character"
          className="animeCard left"
          loading="lazy"
        />
        <AnimeCard
          src={A3}
          alt="anime character"
          className="animeCard left"
          loading="lazy"
        />
      </div>

      <div className="animesRight">
        <AnimeCard
          src={A4}
          alt="anime character"
          className="animeCard left"
          loading="lazy"
        />
        <AnimeCard
          src={A5}
          alt="anime character"
          className="animeCard right"
          loading="lazy"
        />
        <AnimeCard
          src={A6}
          alt="anime character"
          className="animeCard right"
          loading="lazy"
        />
        <AnimeCard
          src={A7}
          alt="anime character"
          className="animeCard right"
          loading="lazy"
        />
        <AnimeCard
          src={A8}
          alt="anime character"
          className="animeCard right"
          loading="lazy"
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .animesLeft {
    height: 90%;
    display: none;
    flex-direction: column;
    /* justify-content: space-evenly; */
    position: absolute;
    top: 0;
    left: 0;
  }

  .animesRight {
    height: 90%;
    width: min-content;
    padding: 0px;
    margin: 0px;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    top: 0;
    right: 0;
  }
  .animeCard {
    transform: scale(0.4);
    border: 1px solid var(--primary-200);
    // shimer and bob animation
    animation: shimmerBorder 1.5s infinite linear;
  }

  .animeCard.left {
    // rotate slight left
    transform: rotate(-5deg) scale(0.4);
    transition: 1s ease-out;
  }
  .animeCard.right {
    // rotate slight right
    transform: rotate(5deg) scale(0.4);
    transition: 1s ease-out;
  }

  .animeCard.left:hover {
    transform-origin: center;
    transform: scale(0.7) rotate(0deg) translateX(70px);
    transition: 1s ease-out;
  }
  .animeCard.right:hover {
    transform-origin: center;
    // slow down the animation
    transition: 1s ease-out;
    // move the slightly closer to the center
    transform: scale(0.7) rotate(0deg) translateX(-70px);
  }
  @media (min-width: 1574px) {
    .animesLeft {
      display: flex;
      left: 0%;
    }
    .animesRight {
      display: flex;
      right: 0%;
      top: 300px;
    }

    .animeCard {
      margin-bottom: 300px;
    }

    @media (min-width: 1800px) {
      .animesLeft {
        left: 5%;
      }
      .animesRight {
        right: 5%;
      }
    }
  }
`;

const shimmerBorder = keyframes`
  0% {
    border: 1px solid var(--primary-200);
  }
  50% {
    border: 1px solid var(--primary-500);
  }
  100% {
    border: 1px solid var(--primary-200);
  }
`;

const AnimeCard = styled.img`
  transform: scale(0.4);
  border: 1px solid var(--primary-200);
  animation: ${shimmerBorder} 1.5s infinite linear;

  &.left {
    transform: rotate(-5deg) scale(0.4);
    transition: 1s ease-out;

    &:hover {
      transform-origin: center;
      transform: scale(0.7) rotate(0deg) translateX(70px);
      transition: 1s ease-out;
    }
  }

  &.right {
    transform: rotate(5deg) scale(0.4);
    transition: 1s ease-out;

    &:hover {
      transform-origin: center;
      transition: 1s ease-out;
      transform: scale(0.7) rotate(0deg) translateX(-70px);
    }
  }
`;

export default BackgroundAnimeCards;
