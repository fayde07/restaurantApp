import { collection, addDoc } from "@firebase/firestore";
import { AnyTxtRecord } from "dns";
import moment from "moment";
import React, { useContext } from "react";
import ReactCnvs from "../../components/Canvas/ReactCnvs";
import ReservationDatePicker from "../../components/DatePicker/ReservationDatePicker";
import TableReservationContext, {
  ReservationContext,
} from "../../contexts/TableReservationContext";
import { UserAuthContext } from "../../contexts/UserContext";
import { db } from "../../utils/firebase";


interface HomesProps {}

const Home: React.FC<HomesProps> = ({}) => {
  const { user, signUserIn } = useContext(UserAuthContext);

  const { reservation, setReservation } = useContext(ReservationContext);


  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>in Home page</h2>
      <header><strong>Select reservation date</strong></header>

      <TableReservationContext>
        <ReactCnvs />
      </TableReservationContext>
    </div>
  );
};

export default Home;
