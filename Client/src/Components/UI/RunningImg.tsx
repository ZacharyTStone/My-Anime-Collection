const RunningImg = ({ img }: { img: string }) => {
  return (
    <div className="relative overflow-hidden w-full">
      <img
        src={img}
        alt="Naruto running"
        className="hidden lg:block w-[100px] absolute top-[94%] animate-[run_5s_linear_infinite] min-[1200px]:top-[73%]"
      />
    </div>
  );
};

export default RunningImg;
