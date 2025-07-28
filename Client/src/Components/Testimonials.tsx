import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useMobile } from "../utils/hooks";
import { TESTIMONIALS, TESTIMONIALS_TYPE } from "../utils/constants";

function Testimonials() {
  const { t } = useTranslation();
  const onMobile = useMobile();

  return (
    <TestimonialsContainer>
      <TestimonialsTitle>{t("landing.testimonials.title")}</TestimonialsTitle>
      <TestimonialsGrid onMobile={onMobile}>
        {TESTIMONIALS.map((testimonial: TESTIMONIALS_TYPE) => (
          <TestimonialCard key={testimonial.nameKey}>
            <TestimonialImage
              src={testimonial.img}
              alt={t(`landing.testimonials.${testimonial.nameKey}.name`)}
            />
            <TestimonialContent>
              <TestimonialName>
                {t(`landing.testimonials.${testimonial.nameKey}.name`)}
              </TestimonialName>
              <TestimonialText>{t(testimonial.textKey)}</TestimonialText>
            </TestimonialContent>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsContainer>
  );
}

const TestimonialsContainer = styled.section`
  padding: 4rem 0;
  background: var(--grey-50);
`;

const TestimonialsTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--grey-900);
`;

const TestimonialsGrid = styled.div<{ onMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ onMobile }) =>
    onMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))"};
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TestimonialCard = styled.div`
  background: var(--white);
  border-radius: var(--borderRadius);
  padding: 2rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--grey-200);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
`;

const TestimonialImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid var(--primary-500);
`;

const TestimonialContent = styled.div`
  text-align: center;
`;

const TestimonialName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--grey-900);
  margin-bottom: 0.5rem;
`;

const TestimonialText = styled.p`
  color: var(--grey-700);
  line-height: 1.6;
  font-style: italic;
`;

export default Testimonials;
