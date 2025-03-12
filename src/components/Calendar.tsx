import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  console.log(startDate);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
};

export default DateRangePicker;
