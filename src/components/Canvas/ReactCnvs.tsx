import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Layer, Stage, Rect } from "react-konva";

import TableActionMenu from "../TableActionMenu/TableActionMenu";

import { KonvaEventObject } from "konva/lib/Node";
import ReservationDatePicker from "../DatePicker/ReservationDatePicker";
import moment from "moment";
import { UserAuthContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export type Table = {
  x?: number | undefined;
  y?: number | undefined;
};
interface ReactCanvasProps {}

const ReactCanvas: React.FC<ReactCanvasProps> = ({}) => {
  let navigate = useNavigate();
  //get render details form firebase, and render each table in canvas
  const [renderDetails, setRenderDetails] = useState<any>([]);
  const [allTables, setAllTables] = useState<any>([]);
  const renderDetailsRef = collection(db, "renderDetails");
  const reservationCollectionRef = collection(db, "reservations");
  useEffect(() => {
    const getRenderDetails = async () => {
      const data = await getDocs(renderDetailsRef);
      setRenderDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRenderDetails();
  }, []);

  useEffect(() => {
    const getAllTables = async () => {
      const data = await getDocs(reservationCollectionRef);
      setAllTables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAllTables();
  }, []);

  const { user, signUserIn } = useContext(UserAuthContext);
  const [activeTable, setActiveTable] = useState<Table>();
  const [selectedDate, setSelectedDate] = useState<any>();
  const [tableId, setTableId] = useState<any>();

  //[to do]get the clicked table details;
  const [table, setTable] = useState<object>();

  const getTableDetails = (elid: any) => {
    let data = allTables.filter((el: any) => el.tableId === elid);

    setTable(data);
  };

  return (
    <>
      <ReservationDatePicker setChangeDate={setSelectedDate} />

      {/* [to do] refactor type table to pass tableprops as id,status,actions*/}
      <TableActionMenu
        activeTable={activeTable}
        tableId={tableId}
        table={table}
        selectedDate={selectedDate}
      />

      <Stage
        x={0}
        y={0}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ border: "1px solid black", backgroundColor: "#f9f9f9" }}
        onClick={(e: KonvaEventObject<MouseEvent>) => {
          //check if clicked on <Stage> and not on <Rect>
          if (e.target.parent === null) {
            setActiveTable(undefined);
          }
        }}
      >
        <Layer width={window.innerWidth} height={400}>
          {renderDetails.map((table: any) => {
            const reservation = allTables.find(
              ({ tableId }: { tableId: number }) => table.tableId === tableId,
            );
            //change condition to check selecteddate
            const isBusy = !!reservation?.reservationDate;

            return (
              <Rect
                key={table.id}
                tableId={table.tableId}
                x={table.x}
                y={table.y}
                width={table.width}
                height={table.height}
                fill={isBusy ? "rgb(245, 184, 198)" : table.fill}
                stroke={isBusy ? "rgb(230, 63, 102)" : table.stroke}
                draggable
                shadowBlur={table.shadowBlur}
                cornerRadius={table.cornerRadius}
                onClick={(e: KonvaEventObject<MouseEvent>) => {
                  console.log(e.target);
                  setTableId(e.target.attrs.tableId);
                  setActiveTable({ x: e.evt.clientX, y: e.evt.clientY });
                  getTableDetails(e.target.index);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </>
  );
};
export default ReactCanvas;
