import styled, { keyframes } from "styled-components";
import { sampleAnimes } from "../assets/images/sampleAnimes";

const BackgroundAnimeCards = () => {
  return (
    <Wrapper>
      <div className="animesLeft">
        {sampleAnimes.slice(0, 3).map((anime, index) => (
          <AnimeCard
            key={index}
            src={anime}
            alt="anime character"
            className="animeCard left"
            loading="lazy"
          />
        ))}
      </div>

      <div className="animesRight">
        {sampleAnimes.slice(4, 8).map((anime, index) => (
          <AnimeCard
            key={index}
            src={anime}
            alt="anime character"
            className="animeCard right"
            loading="lazy"
          />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .animesLeft {
    height: 90%;
    display: none;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    animation: fadeIn 2s ease-in-out;
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
    animation: fadeIn 2s ease-in-out;
  }
  .animeCard {
    transform: scale(0.4);
    border: 1px solid var(--primary-200);
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
      animation: fadeIn 2s ease-in-out;
    }
    .animesRight {
      display: flex;
      right: 0%;
      animation: fadeIn 2s ease-in-out;
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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const AnimeCard = styled.img`
  transform: scale(0.4);
  border: 1px solid var(--primary-200);
  animation: ${shimmerBorder} 1.5s infinite linear, ${fadeIn} 2s ease-in-out;

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
