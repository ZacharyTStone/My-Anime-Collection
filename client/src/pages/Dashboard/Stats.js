import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { Loading } from "../../Components";

const Stats = (props) => {
  const { isLoading, user } = useAppContext();

  useEffect(() => {
    // showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <main className="dashboard" data-theme={user.theme}>
      <h3>stats</h3>
    </main>
  );
};

export default Stats;
