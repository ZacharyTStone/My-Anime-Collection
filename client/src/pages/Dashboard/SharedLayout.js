import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Navbar, BigSidebar, SmallSidebar } from "../../Components";
import { useAppContext } from "../../context/appContext";
const SharedLayout = () => {
  const { user } = useAppContext();
  return (
    <div
      style={{
        backgroundColor: user?.theme === "light" ? "#f5f5f5" : "#1e1e1e",
      }}
      data-theme={user.theme}
    >
      {" "}
      <Wrapper>
        <main className="dashboard" data-theme={user.theme}>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page" data-theme={user.theme}>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    background-color: "black";
    overflow: auto;
  }
  .dashboard-page {
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

export default SharedLayout;
