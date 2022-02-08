import Konva from "konva";
import React, { MouseEventHandler } from "react";
import { Layer, Stage, Text, Rect } from "react-konva";

interface CanvasContainerProps {}

const stage = new Konva.Stage({
  container: "Container",
  width: window.innerWidth,
  height: 600,
});
// const rectLayer = new Konva.Layer();

const renderTable = (x: number, y: number) => {
  let wholeGroup = new Konva.Group({
    x: 0,
    y: 0,
    draggable: true,
  });
  let tableAndTextGroup = new Konva.Group({
    x: 0,
    y: 0,
    height: 150,
    width: 100,
    draggable: true,
  });
  let table = new Konva.Rect({
    x: x,
    y: y,
    width: 100,
    height: 150,
    fill: "azure",
    shadowBlur: 6,
    cornerRadius: 6,
    stroke: "lightblue",
    strokeWidth: 3,
  });
  let addTextTotable = (e: any) => {
    console.log(e.target.parent.children?.[1]?.attrs.text ? "da" : "nu");
    if (!e.target.parent.children?.[1]?.attrs.text) {
      tableAndTextGroup.add(
        new Konva.Text({
          text: "name for resertvation",
          fontSize: 16,
          fontFamily: "Calibri",
          fill: "#000",
          width: 100,
          x: e.target.attrs.x,
          y: e.target.attrs.y + 60,
          padding: 5,
          align: "center",
        }),
      );
    }
  };
  tableAndTextGroup.on("click", addTextTotable);
  tableAndTextGroup.add(table);
  wholeGroup.add(tableAndTextGroup);
  return restaurantLayout.add(wholeGroup);
};

const restaurantLayout = new Konva.Layer();
// const rectangle = new Konva.Group({
//   x: 25,
//   y: 25,
//   width: 100,
//   height: 100,
//   draggable: true,
// });

// const addTextToTarget = (rectangl: any) => {
//   rectangl.add(
//     new Konva.Text({
//       text: "name for resertvation",
//       fontSize: 16,
//       fontFamily: "Calibri",
//       fill: "#000",
//       width: 100,
//       x: 0,
//       y: 65,
//       padding: 5,
//       align: "center",
//     }),
//   );
// };

const drawRestaurantLayout = () => {
  renderTable(10, 10);
  renderTable(180, 10);
  renderTable(350, 10);
  renderTable(520, 10);
  renderTable(690, 10);
  renderTable(10, 240);
  renderTable(180, 240);
  renderTable(350, 240);
  renderTable(520, 240);
  renderTable(690, 240);
};
// drawRestaurantLayout();

// rectLayer.add(rectangle);
stage.add(restaurantLayout);

const CanvasContainer: React.FC<CanvasContainerProps> = ({}) => {
  return (
    <div>
      {/* <Stage
        width={window.innerWidth}
        height={300}
        style={{ border: "1px solid black", backgroundColor: "azure" }}
        onClick={(e) => console.log(e.target)}
      >
        <Layer>
          <Rect
            x={20}
            y={50}
            width={100}
            height={100}
            fill="rgb(180,210,100)"
            shadowBlur={6}
          />
          <Text text="blablabla" />

          <Rect
            x={140}
            y={50}
            width={100}
            height={100}
            fill="rgb(200,100,200)"
            shadowBlur={6}
            cornerRadius={10}
            draggable
          />
        </Layer>
      </Stage> */}
      <button onClick={drawRestaurantLayout}>see restaurant layout</button>
    </div>
  );
};
export default CanvasContainer;
