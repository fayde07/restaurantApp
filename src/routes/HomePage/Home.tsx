import { onAuthStateChanged, User } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import CanvasContainer from "../../components/Canvas/CanvasContainer";
import ReactCnvs from "../../components/Canvas/ReactCnvs";
import ResLayout from "../../components/RestaurantLayout/ResLayout";
import TableActionMenu from "../../components/TableActionMenu/TableActionMenu";
import { UserAuthContext } from "../../contexts/UserContext";
import { Rectangle } from "../../utils/classes/Rectangle";
import { auth } from "../../utils/firebase";


// let renderDetailsCollectionRef = collection(db, "renderDetails");

// const addRenderDetails = async (item: object) => {
//   await addDoc(renderDetailsCollectionRef, item);
// };

// function addToTablesCollection(item: object) {
//   async function postData() {
//     return await addDoc(renderDetailsCollectionRef, item);
//   }
//   return postData();
// }
interface HomesProps {}

const Home: React.FC<HomesProps> = ({}) => {
  const { signUserIn } = useContext(UserAuthContext);
  const rect = new Rectangle(300, 100, 10, 10, "#000");
  const rect2 = new Rectangle(250, 180, 10, 10, "#000");

  return (
    <div style={{display: 'flex', flexDirection:'column',alignItems: 'center'}}>
      <h2>in Home page</h2>
      <ReactCnvs />
      
      {/* <header>some Header data in Home</header> */}

      {/* <CanvasContainer /> */}
    </div>
  );
};

export default Home;
