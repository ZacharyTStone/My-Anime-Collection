import styled, { keyframes } from "styled-components";
import pokeball from "../../../assets/images/pokeball.png";

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .anime {
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }

  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
    margin: 10px 10px 10px 10px;
    color: var(--red-dark);
    background: var(--red-light);
    align-self: center;
  }

  .anime-cover-image {
    width: "100%";
    cursor: url(${pokeball}) 4 4, pointer !important;
  }

  @media (max-width: 1000px) {
    flex-direction: row;
    .anime-cover-image {
      height: 100px;
      width: 100px;
    }
    .info-container {
      display: flex;
      flex-direction: row;
    }
  }
`;

export const ImageDiv = styled.div<{ $onMobile?: boolean }>`
  min-height: ${(props) => (props.$onMobile ? "168px" : "378px")};
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%);
  padding: 2rem;
  border-radius: calc(var(--borderRadius) * 1.5);
  box-shadow: var(--shadow-anime-lg);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  border: 2px solid var(--primary-alpha-30);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
  }

  h5 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
    border-bottom: 2px solid var(--primary-alpha-20);
    padding-bottom: 0.75rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--grey-700);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const aiGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(196, 69, 105, 0.5))
            drop-shadow(0 0 8px rgba(78, 205, 196, 0.3));
  }
  33% {
    filter: drop-shadow(0 0 10px rgba(78, 205, 196, 0.7))
            drop-shadow(0 0 20px rgba(78, 205, 196, 0.3));
  }
  66% {
    filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.7))
            drop-shadow(0 0 20px rgba(196, 69, 105, 0.3));
  }
`;

const jiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  15% {
    transform: rotate(-8deg) scale(1.1);
  }
  30% {
    transform: rotate(6deg) scale(1.05);
  }
  45% {
    transform: rotate(-4deg) scale(1.1);
  }
  60% {
    transform: rotate(3deg) scale(1.05);
  }
  75% {
    transform: rotate(-1deg) scale(1.08);
  }
`;

export const ShimmerIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    var(--anime-purple) 0%,
    var(--anime-pink) 20%,
    var(--anime-blue) 40%,
    var(--anime-pink) 60%,
    var(--anime-purple) 80%,
    var(--anime-blue) 100%
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 2s linear infinite;

  svg {
    animation: ${aiGlow} 2s ease-in-out infinite, ${jiggle} 3s ease-in-out infinite;
  }
`;

export const AiModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(15, 20, 35, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

export const AiModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
  max-width: 520px;
  width: 92%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      var(--anime-purple),
      var(--anime-blue),
      var(--anime-pink)
    );
    border-radius: 16px 16px 0 0;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--grey-200);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--grey-300);
  }
`;

export const AiModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid var(--grey-100);
`;

export const AiModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--anime-purple), var(--anime-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const AiCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid var(--grey-200);
  background: transparent;
  color: var(--grey-400);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--grey-100);
    border-color: var(--grey-300);
    color: var(--grey-700);
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.92);
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const AiModalBody = styled.div`
  padding: 1rem 1.75rem 1.75rem;
`;

export const AiErrorMessage = styled.div`
  text-align: center;
  padding: 1.25rem;
  color: var(--red-dark);
  background: #fef2f2;
  border-radius: 10px;
  font-size: 0.875rem;
  border: 1px solid #fecaca;
`;

export const AiLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
`;

export const AiRecommendationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const AiRecommendationItem = styled.div`
  display: flex;
  gap: 0.875rem;
  padding: 1rem 1.125rem;
  border-radius: 12px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    border-color: var(--primary-alpha-30);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

export const AiRecNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--anime-purple), var(--anime-blue));
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  margin-top: 2px;
`;

export const AiRecContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AiRecTitle = styled.p`
  font-weight: 700;
  color: var(--grey-900);
  line-height: 1.3;
  font-size: 0.95rem;
  margin: 0 0 2px;
`;

export const AiRecSecondaryTitle = styled.p`
  color: var(--grey-400);
  font-size: 0.75rem;
  font-style: italic;
  margin: 0 0 8px;
`;

export const AiRecReason = styled.p`
  color: var(--grey-600);
  line-height: 1.55;
  font-size: 0.8125rem;
  margin: 0;

  span {
    color: var(--anime-purple);
    font-weight: 600;
  }
`;
