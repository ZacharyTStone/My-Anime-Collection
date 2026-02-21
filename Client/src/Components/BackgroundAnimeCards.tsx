import { sampleAnimes } from "../assets/images/sampleAnimes";

const BackgroundAnimeCards = () => {
  return (
    <>
      <div className="h-[90%] hidden flex-col absolute top-0 left-0 animate-[fadeIn_2s_ease-in-out] min-[1440px]:flex min-[1680px]:left-[0%]">
        {sampleAnimes.slice(0, 3).map((anime) => (
          <img
            key={anime}
            src={anime}
            alt="anime character"
            className="scale-[0.4] border border-primary-200 mb-[300px] -rotate-[5deg] transition-all duration-1000 ease-out animate-[shimmerBorder_1.5s_infinite_linear,fadeIn_2s_ease-in-out] hover:origin-center hover:scale-[0.7] hover:rotate-0 hover:translate-x-[70px]"
            loading="lazy"
          />
        ))}
      </div>

      <div className="h-[90%] hidden flex-col absolute top-0 right-0 animate-[fadeIn_2s_ease-in-out] min-[1440px]:flex min-[1680px]:right-[0%]">
        {sampleAnimes.slice(4, 8).map((anime) => (
          <img
            key={anime}
            src={anime}
            alt="anime character"
            className="scale-[0.4] border border-primary-200 mb-[300px] rotate-[5deg] transition-all duration-1000 ease-out animate-[shimmerBorder_1.5s_infinite_linear,fadeIn_2s_ease-in-out] hover:origin-center hover:scale-[0.7] hover:rotate-0 hover:-translate-x-[70px]"
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundAnimeCards;
