import { Outlet } from "react-router";
import { MUINavbar } from "../Components";

interface DashboardProps {
  className?: string;
}

const Dashboard = ({ className }: DashboardProps) => {
  return (
    <div
      className={`min-h-screen relative bg-background ${className || ""}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <section className="relative z-[1]">
        <main className="min-h-screen h-full bg-transparent lg:grid-cols-[auto_1fr]">
          <MUINavbar />
          <div id="main-content" className="w-full mx-auto px-6 py-8 max-w-[1240px] relative lg:w-[92%] lg:px-0 lg:py-10">
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
};

export default Dashboard;
