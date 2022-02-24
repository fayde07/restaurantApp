import React, { useContext, useState } from "react";
import { ConfigProvider, DatePicker, Space } from "antd";
import moment from "moment";
import locale from "antd/lib/locale/en_GB";
import "moment/locale/en-gb";

const dateFormat = "DD/MM/YYYY";
interface ReservationDatePickerProps {}

const today = moment().format(dateFormat);

const ReservationDatePicker: React.FC<ReservationDatePickerProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState<any>();
  return (
    <ConfigProvider locale={locale}>
      <DatePicker
        onChange={(arg, dateString) => {
          setSelectedDate(arg);
          console.log(arg?.unix(), "***", dateString);
        }}
        defaultValue={moment(today, dateFormat)}
        format={dateFormat}
      />
    </ConfigProvider>
  );
};
export default ReservationDatePicker;
