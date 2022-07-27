import styled from "styled-components";

const Testimonial = ({ name, img, text }) => {
  return (
    <Wrapper>
      <div className="testimonial">
        <img src={img} alt="testimonial" loading="lazy" />
        <div className="testimonial-text">
          <p>{text}</p>
          <h3>{name}</h3>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 50px;
  .testimonial {
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
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 10px solid var(--mainColor);
    transform: translateY(-80%);
    z-index: 1;
    position: absolute;
    overflow: visible;
  }

  p {
    font-size: 1rem;
    min-height: 100px;
  }

  @media (min-width: 1040px) {
    .testimonial {
      width: 15vw;
    }

    p {
      font-size: 1.2rem;
    }
  }
`;

export default Testimonial;
