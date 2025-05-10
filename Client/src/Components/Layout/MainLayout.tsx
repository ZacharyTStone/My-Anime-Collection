import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { SkeletonLoadingBlock } from "../UI";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <LayoutContainer>{children || <Outlet />}</LayoutContainer>;
};

export const LoadingLayout: React.FC = () => (
  <FallBackDiv>
    <SkeletonLoadingBlock height="100%" width="100%" borderRadius={8} />
  </FallBackDiv>
);

const LayoutContainer = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: var(--grey-50);
  padding: 16px;
`;

const FallBackDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--grey-50);
  padding: 16px;
`;

export default MainLayout;
