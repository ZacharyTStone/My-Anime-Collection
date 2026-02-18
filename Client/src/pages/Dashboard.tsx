import { Outlet } from "react-router";
import { MUINavbar } from "../Components";

interface DashboardProps {
  className?: string;
}

const Dashboard = ({ className }: DashboardProps) => {
  return (
    <div
      className={`min-h-screen relative ${className || ""}`}
      style={{ background: "var(--backgroundColor)" }}
    >
      <section className="relative z-[1]">
        <main className="min-h-screen h-full bg-transparent lg:grid-cols-[auto_1fr]">
          <MUINavbar />
          <div className="w-full mx-auto px-6 py-8 max-w-[1240px] relative lg:w-[92%] lg:px-0 lg:py-10">
            <Outlet />
          </div>
        </main>
      </section>
    </div>
  );
};

export default Dashboard;
