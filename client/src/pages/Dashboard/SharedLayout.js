import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MUINavbar } from "../../Components";
import { useAppContext } from "../../context/appContext";
import { ToastContainer } from "react-toastify";
const SharedLayout = () => {
  const { user } = useAppContext();
  return (
    <div
      style={{
        backgroundColor: user?.theme === "light" ? "#f5f5f5" : "#1e1e1e",
      }}
      data-theme={user.theme}
    >
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />{" "}
      <Wrapper>
        <main className="dashboard" data-theme={user.theme}>
          <MUINavbar />
          <div className="dashboard-page" data-theme={user.theme}>
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
    /* width: 100vh; */
  }
  .dashboard-page {
    width: 100%;
    /* height: 100vh; */
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

export default SharedLayout;
