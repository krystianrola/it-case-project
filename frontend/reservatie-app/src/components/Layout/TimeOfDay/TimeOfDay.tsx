import React from "react";
import styles from "./TimeOfDay.module.css";

interface props {
  handleTimeOfDayChange: (timeOfDayValue :string) => void;
}

const TimeOfDay = ({ handleTimeOfDayChange }: props) => {

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ( event ) => {
    handleTimeOfDayChange(event.target.value);
  };

  return (
    <div className={styles.constainer}>
      <p className={styles.title}>Kies een periode :</p>
      <select
        name="TimeOfDay"
        id=""
        onChange={handleChange}
        className={styles.selectItem}
      >
        <option value="Volledige dag">Volledige dag</option>
        <option value="Namiddag">Namiddag</option>
        <option value="Voormiddag">Voormiddag</option>
      </select>
    </div>
  );
};

export default TimeOfDay;
