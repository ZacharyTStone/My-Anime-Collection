import type React from "react";
import { Outlet } from "react-router";
import { SkeletonLoadingBlock } from "../UI";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="min-h-screen w-full bg-grey-50">
      {children || <Outlet />}
    </main>
  );
};

export const LoadingLayout = () => (
  <div className="flex justify-center items-center h-screen w-screen bg-grey-50 p-4">
    <SkeletonLoadingBlock height="100%" width="100%" borderRadius={8} />
  </div>
);

export default MainLayout;
