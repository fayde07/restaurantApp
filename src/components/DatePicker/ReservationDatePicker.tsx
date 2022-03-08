import React, { useContext, useEffect, useState } from "react";
import { ConfigProvider, DatePicker, Space } from "antd";
import moment from "moment";
import locale from "antd/lib/locale/en_GB";
import "moment/locale/en-gb";

interface ReservationDatePickerProps {
  setChangeDate: any;
  selectedDate: any;
}
const dateFormat = "DD/MM/YYYY";
const today = moment();

const ReservationDatePicker: React.FC<ReservationDatePickerProps> = ({
  setChangeDate,
  selectedDate,
}) => {
  useEffect(() => {
    setChangeDate(
      moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).unix(),
    );
  }, []);
  return (
    <ConfigProvider locale={locale}>
      <DatePicker
        onChange={(arg, dateString) => {
          setChangeDate(
            arg?.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).unix(),
          );
        }}
        defaultValue={moment(today, dateFormat)}
        format={dateFormat}
      />
    </ConfigProvider>
  );
};
export default ReservationDatePicker;
