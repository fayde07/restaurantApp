import React, { useContext } from "react";
import ReactCnvs from "../../components/Canvas/ReactCnvs";
import { UserAuthContext } from "../../contexts/UserContext";

interface HomesProps {}

const Home: React.FC<HomesProps> = ({}) => {
  const { signUserIn } = useContext(UserAuthContext);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>in Home page</h2>
      <header>some Header data in Home</header>
      <ReactCnvs />
    </div>
  );
};

export default Home;
