import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { MUINavbar } from "../Components";


// Types and Interfaces
interface DashboardProps {
  className?: string;
}

// Constants
const TOAST_POSITION = "bottom-left";
const TOAST_AUTO_CLOSE = 2000;
const TOAST_THEME = "light";

// Styled Components
const DashboardContainer = styled.div`
  background-color: var(--grey-50);
  min-height: 100vh;
`;

const DashboardWrapper = styled.section`
  .dashboard {
    min-height: 100vh;
    height: 100%;
    background-color: var(--grey-50);
  }

  .dashboard-page {
    width: 100%;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    max-width: 1240px;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 92%;
      padding: 2.5rem 0;
    }
  }
`;

/**
 * Dashboard component that serves as the main layout for authenticated users
 */
const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  return (
    <DashboardContainer className={className}>
      <ToastContainer
        position={TOAST_POSITION}
        autoClose={TOAST_AUTO_CLOSE}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={TOAST_THEME}
      />
      <DashboardWrapper>
        <main className="dashboard">
          <MUINavbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </main>
      </DashboardWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
