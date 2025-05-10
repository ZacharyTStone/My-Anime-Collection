import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { MUINavbar } from "../Components";
import { useAppContext } from "../context/appContext";

const Dashboard = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--grey-50)",
      }}
    >
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Wrapper>
        <main className="dashboard">
          <MUINavbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </main>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section`
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

export default Dashboard;
