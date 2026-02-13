import { Outlet } from "react-router";
import styled from "styled-components";
import { MUINavbar } from "../Components";


// Types and Interfaces
interface DashboardProps {
  className?: string;
}

// Styled Components
const DashboardContainer = styled.div`
  background: var(--backgroundColor);
  min-height: 100vh;
  position: relative;
`;

const DashboardWrapper = styled.section`
  position: relative;
  z-index: 1;
  
  .dashboard {
    min-height: 100vh;
    height: 100%;
    background: transparent;
  }

  .dashboard-page {
    width: 100%;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    max-width: 1240px;
    position: relative;
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
