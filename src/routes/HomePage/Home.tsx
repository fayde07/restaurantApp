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

const reservationCollectionRef = collection(db, "reservations");

interface HomesProps {}

const Home: React.FC<HomesProps> = ({}) => {
  const { user, signUserIn } = useContext(UserAuthContext);

  const { reservation, setReservation } = useContext(ReservationContext);

  const reserve = async () => {
    const dateFormat = "DD/MM/YYYY";
    const today: string = moment(new Date(), dateFormat)
      .subtract(10, "days")
      .calendar();
    let reserveObj = {
      reservationDate: new Date(),
      reservationName: user ? user.email : "[to do] you need to be signe in",
      tableId: "1", //not an option
      contact: null,
      otherInfo: null,
    };
    // await addDoc(reservationCollectionRef, reserveObj);
    console.log(reserveObj);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>in Home page</h2>
      <header>some Header data in Home</header>

      <TableReservationContext>
        
        <ReservationDatePicker />
        <button type="button" onClick={reserve}>
          Reserve Table
        </button>
        <ReactCnvs />
      </TableReservationContext>
    </div>
  );
};

export default Home;
