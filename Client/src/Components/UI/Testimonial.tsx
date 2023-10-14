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
`;

const TestimonialDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  margin: 20px 0 20px 20px;
  border: 2px solid var(--primary-500);
  min-width: 140px;
  width: 10vw;
  height: fit-content;
  padding: 10px;

  @media (min-width: 1040px) {
    width: 15vw;
  }
`;

const TestimonialText = styled.div`
  min-height: 300px;
`;

const Wrapper = styled.section`
  margin-top: 50px;
`;

const Review = styled.p`
  font-size: 1rem;
  min-height: 100px;
  min-height: 175px;

  @media (min-width: 1040px) {
    font-size: 1.2rem;
  }
`;

const Name = styled.h3``;
export default Testimonial;
