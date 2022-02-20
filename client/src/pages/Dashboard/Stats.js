import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading } from "../../Components";
import styled from "styled-components";

const Stats = (props) => {
  const { isLoading, user } = useAppContext();

  useEffect(() => {
    // showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <Wrapper>
      <main className="content full-page" data-theme={user.theme}>
        <h3>Anime Stats</h3>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3 {
    text-align: center;
  }
`;

export default Stats;
