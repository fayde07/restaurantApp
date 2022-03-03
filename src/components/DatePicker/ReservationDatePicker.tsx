import React, { useContext, useEffect, useState } from "react";
import { ConfigProvider, DatePicker, Space } from "antd";
import moment from "moment";
import locale from "antd/lib/locale/en_GB";
import "moment/locale/en-gb";

interface ReservationDatePickerProps {
  setChangeDate: any;
}
const dateFormat = "DD/MM/YYYY";
const today = moment().format(dateFormat);

const ReservationDatePicker: React.FC<ReservationDatePickerProps> = ({
  setChangeDate,
}) => {
  useEffect(() => {
    setChangeDate(new Date());
  }, []);
  return (
    <ConfigProvider locale={locale}>
      <DatePicker
        onChange={(arg, dateString) => {
          setChangeDate(arg?.unix());
        }}
        defaultValue={moment(today, dateFormat)}
        format={dateFormat}
      />
    </ConfigProvider>
  );
};
export default ReservationDatePicker;
