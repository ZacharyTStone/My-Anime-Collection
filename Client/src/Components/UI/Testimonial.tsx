interface TestimonialProps {
  name: string;
  img: string;
  text: string;
}

const Testimonial = ({ name, img, text }: TestimonialProps) => {
  return (
    <section className="mt-[50px]">
      <div className="flex flex-col items-center justify-start text-center my-5 ml-5 border border-primary-500 min-w-[140px] w-[200px] h-fit p-2.5">
        <img
          src={img}
          alt="testimonial"
          loading="lazy"
          className="w-[100px] h-[100px] rounded-full border border-primary-500 -translate-y-[80%] z-[1] absolute"
        />
        <div className="mt-5 p-[5px]">
          <p className="text-base min-h-[125px]">{text}</p>
          <h3 className="text-[1.1rem]">{name}</h3>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
