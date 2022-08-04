import React, { useEffect, useState } from "react";
import styles from "./date.module.css";

interface DateProp {
  handleDateChange: (date: string) => void;
  update: boolean;
}

function ReservationDay({ handleDateChange, update }: DateProp) {

  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [defaultDate, setDefaultDate] = useState<string>("");

  const SetCorrectMonth = (date: Date, ) => {
    if(date.getMonth() < 10) return String(`0${date.getMonth()+1}`) ;
    if(date.getMonth() > 10) return String(`${date.getMonth()+1}`) ;
  }

  useEffect(() => {
      const  currentDate = new Date();

      setMinDate(String(`${currentDate.getFullYear()}-${SetCorrectMonth(currentDate)}-${currentDate.getDate()}`));
      setDefaultDate(String(`${currentDate.getFullYear()}-${SetCorrectMonth(currentDate)}-${currentDate.getDate()}`));
      handleDateChange(String(`${currentDate.getFullYear()}-${SetCorrectMonth(currentDate)}-${currentDate.getDate()}T00:00:00`));

      let futureDate = new Date(currentDate);
      futureDate.setDate(futureDate.getDate() + 14);
      setMaxDate(String(`${futureDate.getFullYear()}-${SetCorrectMonth(futureDate)}-${futureDate.getDate()}`));
  }, [update]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
    handleDateChange(event.target.value + "T00:00:00");
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Kies een datum :</p>
      <input
        type="date"
        id="date"
        name="date"
        defaultValue={defaultDate}
        min={minDate}
        max={maxDate}
        onChange={handleChange}
        className={styles.dateInput}
      />
    </div>
  );
}
export default ReservationDay;
