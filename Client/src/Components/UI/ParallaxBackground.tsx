import React from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <BackgroundWrapper>
      <motion.div className="parallax-bg" style={{ y }} />
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  .parallax-bg {
    width: 100%;
    height: 120%;
    background: linear-gradient(
      to bottom,
      var(--primary-100),
      var(--primary-200)
    );
    opacity: 0.1;
  }
`;

export default ParallaxBackground;
