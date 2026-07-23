import { Avatar, AvatarFallback, AvatarImage } from "@/Components/UI/avatar";
import { Card, CardContent } from "@/Components/UI/card";

interface TestimonialProps {
  name: string;
  img: string;
  text: string;
}

const Testimonial = ({ name, img, text }: TestimonialProps) => {
  return (
    <Card className="h-full gap-0 py-0 shadow-sm">
      <CardContent className="flex h-full flex-col p-6">
        <p className="flex-1 leading-relaxed text-foreground">
          &ldquo;{text}&rdquo;
        </p>
        <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
          <Avatar className="size-10 border border-border/70">
            <AvatarImage src={img} alt={name} loading="lazy" />
            <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold">{name}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
