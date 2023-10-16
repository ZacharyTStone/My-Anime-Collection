import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MUINavbar } from "../Components";
import { useAppContext } from "../context/appContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { theme } = useAppContext();
  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
      }}
      data-theme={theme}
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
      />
      <Wrapper>
        <main className="dashboard" data-theme={theme}>
          <MUINavbar />
          <div className="dashboard-page" data-theme={theme}>
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
  }
  .dashboard-page {
    width: 100%;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 80%;
    }
  }
`;

export default Dashboard;
