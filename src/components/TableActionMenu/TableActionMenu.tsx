import { Card, Popover } from "antd";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../contexts/UserContext";
import { db } from "../../utils/firebase";
import { Table } from "../Canvas/ReactCnvs";

interface TableActionMenuProps {
  activeTable?: Table;
  setActiveTable: any | undefined;
  tableId: number;
  //status?: boolean (if reservationDate!==null)
  table: any | undefined;
  selectedDate: any;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({
  activeTable,
  setActiveTable,
  tableId,
  table,
  selectedDate,
}) => {
  const popoverDivRef = useRef<any>();
  const reservationCollectionRef = collection(db, "reservations");

  const { user, signUserIn } = useContext(UserAuthContext);
  let navigate = useNavigate();

  const cancelReservatoin = () => {
    if (user?.email === table?.[0]?.reservationName) {
      const docRef = doc(db, "reservations", table?.[0]?.id);
      deleteDoc(docRef);
    }
    setActiveTable(undefined);
  };

  const busy = table?.some((i: any) => i.reservationDate === selectedDate);

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
      // otherInfo: null,
    };

    await addDoc(reservationCollectionRef, reserveObj);
    console.log(reserveObj);
    setActiveTable(undefined);
  };
  return (
    <div ref={popoverDivRef}>
      <Card
        size="small"
        title={`Table number ${tableId}`}
        // hoverable
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
            <span className="action-button" onClick={cancelReservatoin}>
              {" "}
              Cancel reservation
            </span>
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
