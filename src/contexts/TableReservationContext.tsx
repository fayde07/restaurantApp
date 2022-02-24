import React, { createContext, useMemo, useState } from "react";
export type ReservationContextState = {
  reservation?:
    | {
        reservationDate?: string | Date | null;
        reservationName?: string | null;
        tableId?: number | string | null;
        contact?: string | null;
        otherInfo?: string | null;
      }
    | undefined;
    setReservation: (request: any) => void,

};

export const contextDefaultValues: ReservationContextState = {
  reservation: {
    reservationDate: null,
    reservationName: null,
    tableId: null,
    contact: null,
    otherInfo: null,
  },
  setReservation: (request: any) => {},
};
export const ReservationContext =
  createContext<ReservationContextState>(contextDefaultValues);

interface tableReservationContextProps {}

const TableReservationContext: React.FC<tableReservationContextProps> = ({
  children,
}) => {
  const [reservation, setReservation] = useState(
    contextDefaultValues.reservation,
  );
  const providerValue = useMemo(
    () => ({ reservation, setReservation }),
    [reservation],
  );
  return (
    <ReservationContext.Provider value={providerValue}>
      {children}
    </ReservationContext.Provider>
  );
};
export default TableReservationContext;
