import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import React, { useEffect, useRef, useState } from "react";
import { Layer, Stage, Rect } from "react-konva";

import TableActionMenu from "../TableActionMenu/TableActionMenu";

import { KonvaEventObject } from "konva/lib/Node";
export type Table = {
  x?: number | undefined;
  y?: number | undefined;
};
interface ReactCanvasProps {}

const ReactCanvas: React.FC<ReactCanvasProps> = ({}) => {
  const [renderDetails, setRenderDetails] = useState<any>([]);
  const renderDetailsRef = collection(db, "renderDetails");
  useEffect(() => {
    const getRenderDetails = async () => {
      const data = await getDocs(renderDetailsRef);
      setRenderDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRenderDetails();
  }, []);

  const [activeTable, setActiveTable] = useState<Table>();

  //question: when refreshing page, line 29 prints twice.why? is it re-rendering twice?
  console.log("***", activeTable);

  return (
    <div>
      {/* [to do] refactor type table to pass tableprops as id,status,actions*/}
      <TableActionMenu activeTable={activeTable} />

      <Stage
        x={0}
        y={0}
        width={550}
        height={400}
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
            return (
              <Rect
                key={table.id}
                x={table.x}
                y={table.y}
                width={table.width}
                height={table.height}
                fill={table.fill}
                stroke={table.stroke}
                draggable
                shadowBlur={table.shadowBlur}
                cornerRadius={table.cornerRadius}
                onClick={(e: KonvaEventObject<MouseEvent>) => {
                  console.log(e.target.index);

                  setActiveTable({ x: e.evt.clientX, y: e.evt.clientY });
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};
export default ReactCanvas;
