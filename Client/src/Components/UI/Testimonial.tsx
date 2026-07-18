import { Avatar, AvatarFallback, AvatarImage } from "@/Components/UI/avatar";
import { Card, CardContent } from "@/Components/UI/card";

interface TestimonialProps {
  name: string;
  img: string;
  text: string;
}

const Testimonial = ({ name, img, text }: TestimonialProps) => {
  return (
    <section className="mt-[50px]">
      <Card className="relative ml-5 mt-14 h-fit w-[220px] min-w-[140px] border-primary-300 text-center">
        <Avatar className="absolute left-1/2 top-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 border-2 border-primary-300">
          <AvatarImage src={img} alt={name} loading="lazy" />
          <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <CardContent className="px-4 pb-4 pt-16">
          <p className="min-h-[125px] text-base">{text}</p>
          <h3 className="text-[1.1rem]">{name}</h3>
        </CardContent>
      </Card>
    </section>
  );
};

export default Testimonial;
