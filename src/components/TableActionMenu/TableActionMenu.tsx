import { Card, Popover } from "antd";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../contexts/UserContext";
import { db } from "../../utils/firebase";
import { Table } from "../Canvas/ReactCnvs";

interface TableActionMenuProps {
  activeTable?: Table;
  tableId: number;
  table?: any;
  selectedDate: any;
  updateTableStatus: (table?: Table, refetch?: boolean) => void;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({
  activeTable,
  tableId,
  table,
  selectedDate,
  updateTableStatus,
}) => {
  const popoverDivRef = useRef<any>(); //i don't think i am using this for now;
  const reservationCollectionRef = collection(db, "reservations");

  const { user, signUserIn } = useContext(UserAuthContext);
  let navigate = useNavigate();

  const cancelReservatoin = async () => {
    const selectedTable = table?.find(
      (id?: any) => id?.reservationDate === selectedDate,
    );

    if (user?.email === selectedTable?.reservationName) {
      const docRef = doc(db, "reservations", selectedTable?.id);
      await deleteDoc(docRef);
    }
    updateTableStatus(undefined, true);
  };

  const busy = table?.some((t: any) => t.reservationDate === selectedDate);

  const reserve = async () => {
    if (user === undefined) {
      return navigate("/login");
    }
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    let reserveObj = {
      reservationDate: selectedDate,
      reservationName: user ? user.email : "[to do] you need to be signe in",
      tableId: tableId,
      contact: user.email,
      // otherInfo: null, //[to do] get other details from logedin profile
    };
    await addDoc(reservationCollectionRef, reserveObj);
    updateTableStatus(undefined, true);
  };

  const tableResevrvationName = table?.find(
    (t: any) => t.reservationName === user?.email,
  );

  const sameUser = () => (
    <span className="action-button" onClick={cancelReservatoin}>
      {" "}
      Cancel reservation
    </span>
  );
  const differentUser = () => <span> -</span>;

  return (
    <div ref={popoverDivRef}>
      <Card
        size="small"
        title={`Table number ${tableId}`}
        style={{
          width: 160,
          display: activeTable ? "block" : "none",
          top: `${activeTable?.y}px`,
          left: `${activeTable?.x}px`,
          position: "absolute",
          zIndex: 1000,
          boxShadow: "rgba(17, 12, 46, 0.30) 0px 0px 100px 0px",
        }}
      >
        <p style={{ display: "block" }}>
          Status:{" "}
          {busy ? (
            <span style={{ color: "red", display: "inline-block" }}> busy</span>
          ) : (
            <span style={{ color: "green", display: "inline-block" }}>
              {" "}
              free
            </span>
          )}
        </p>
        <p>
          Actions:{" "}
          {busy ? (
            user?.email === tableResevrvationName?.reservationName ? (
              sameUser()
            ) : (
              differentUser()
            )
          ) : (
            <span className="action-button" onClick={reserve}>
              {" "}
              Book table
            </span>
          )}
        </p>
      </Card>
    </div>
  );
};
export default TableActionMenu;
