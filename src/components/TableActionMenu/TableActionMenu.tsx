import { Card, Popover } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "../Canvas/ReactCnvs";

interface TableActionMenuProps {
  activeTable?: Table;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({ activeTable }) => {
  const popoverDivRef = useRef<any>();

  return (
    <div ref={popoverDivRef}>
      <Card
        size="small"
        title="table nr. X"
        hoverable
        style={{
          width: 160,
          display: activeTable ? "block" : "none",
          top: `${activeTable?.y}px`,
          left: `${activeTable?.x}px`,
          position: "absolute",
          zIndex: 1000,
        }}
      >
        <p>Status: free</p>
        <p>Actions: Book table</p>
      </Card>
    </div>
  );
};
export default TableActionMenu;
