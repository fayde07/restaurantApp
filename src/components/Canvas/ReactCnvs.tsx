import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import React, { useContext, useEffect, useState } from "react";
import { Layer, Stage, Rect } from "react-konva";
import TableActionMenu from "../TableActionMenu/TableActionMenu";
import { KonvaEventObject } from "konva/lib/Node";
import ReservationDatePicker from "../DatePicker/ReservationDatePicker";
import { UserAuthContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export type Table = {
  x?: number;
  y?: number;
};
interface ReactCanvasProps {}

const ReactCanvas: React.FC<ReactCanvasProps> = ({}) => {
  //get render details form firebase, and render each table in canvas
  const [renderDetails, setRenderDetails] = useState<any>([]);
  const [allReservations, setAllReservations] = useState<any>([]);
  const renderDetailsRef = collection(db, "renderDetails");
  const reservationCollectionRef = collection(db, "reservations");
  useEffect(() => {
    const getRenderDetails = async () => {
      const data = await getDocs(renderDetailsRef);
      setRenderDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRenderDetails();
  }, []);

  const getAllReservations = async () => {
    const data = await getDocs(reservationCollectionRef);
    setAllReservations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  const { user, signUserIn } = useContext(UserAuthContext);
  const [activeTable, setActiveTable] = useState<Table>();
  const [selectedDate, setSelectedDate] = useState<any>();
  const [tableId, setTableId] = useState<any>();

  //[to do]get the clicked table details;
  const [table, setTable] = useState<object>();

  const updateTableStatus = (table?: Table, refetch?: boolean) => {
    setActiveTable(table);
    if (refetch) getAllReservations();
  };

  const getTableDetails = (elid: any) => {
    let data = allReservations.filter((el: any) => el.tableId === elid);
    setTable(data);
  };

  return (
    <>
      <ReservationDatePicker
        setChangeDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      <TableActionMenu
        activeTable={activeTable}
        tableId={tableId}
        table={table}
        selectedDate={selectedDate}
        updateTableStatus={updateTableStatus}
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
            const reservation = allReservations.filter(
              ({ tableId }: { tableId: number }) => tableId === table.tableId,
            ); //array of reservetions made on the table with id = tableId
            const isBusy = reservation.some(
              (i: any) => i.reservationDate === selectedDate,
            );

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
