import styled from "styled-components";

interface testimonailProps {
  name: string;
  img: string;
  text: string;
}

const Testimonial = ({ name, img, text }: testimonailProps) => {
  return (
    <Wrapper>
      <TestimonialDiv>
        <TestimonialImg src={img} alt="testimonial" loading="lazy" />
        <TestimonialText>
          <Review>{text}</Review>
          <Name>{name}</Name>
        </TestimonialText>
      </TestimonialDiv>
    </Wrapper>
  );
};

const TestimonialImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid var(--mainColor);
  transform: translateY(-80%);
  z-index: 1;
  position: absolute;
  border: 1px solid var(--primary-500);
`;

const TestimonialDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  margin: 20px 0 20px 20px;
  border: 1px solid var(--primary-500);
  min-width: 140px;
  width: 200px;
  height: fit-content;
  padding: 10px;
`;

const TestimonialText = styled.div`
  margin-top: 20px;
  padding: 5px;
`;

const Wrapper = styled.section`
  margin-top: 50px;
`;

const Review = styled.p`
  font-size: 1rem;

  min-height: 125px;
`;

const Name = styled.h3`
  font-size: 1.1rem;
`;
export default Testimonial;
