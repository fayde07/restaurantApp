import { Card, Popover } from "antd";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../contexts/UserContext";
import { db } from "../../utils/firebase";
import { Table } from "../Canvas/ReactCnvs";

interface TableActionMenuProps {
  activeTable?: Table;
  tableId: number;
  //status?: boolean (if reservationDate!==null)
  table: any | undefined;
  selectedDate: any;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({
  activeTable,
  tableId,
  table,
  selectedDate,
}) => {
  const popoverDivRef = useRef<any>();
  const reservationCollectionRef = collection(db, "reservations");

  const { user, signUserIn } = useContext(UserAuthContext);
  let navigate = useNavigate();

  // console.log(table[0]);

  const reserve = async () => {
    if (user === undefined) {
      return navigate("/login");
    }
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    let reserveObj = {
      reservationDate: moment(new Date(selectedDate)).unix(),
      reservationName: user ? user.email : "[to do] you need to be signe in",
      tableId: tableId,
      contact: user.email,
      // otherInfo: null,
    };

    await addDoc(reservationCollectionRef, reserveObj);
    console.log(reserveObj);
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
          {table?.length !== 0 ? (
            <span style={{ color: "red", display: "inline-block" }}> busy</span>
          ) : (
            <span style={{ color: "green", display: "inline-block" }}> free</span>
          )}
        </p>
        <p>
          Actions:{" "}
          {table?.length !== 0 ? (
            " - "
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
