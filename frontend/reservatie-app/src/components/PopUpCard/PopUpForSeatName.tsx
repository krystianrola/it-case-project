import React from "react";
import styles from "./PopUpCard.module.css";

interface ApplySeatNamePopUpProps {
  handleOnClick: () => void;
  handleClose: () => void;
  handleInputValue : (inputValue: string) => void;
}

export const ApplySeatNamePopUp = ({ handleOnClick, handleClose, handleInputValue }: ApplySeatNamePopUpProps) => {

    const handleChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
        handleInputValue(event.target.value);
    }

  return (
    <div className={styles.popupBox}>
      <div className={styles.popupContent}>
      <span className={styles.closeIcon} onClick={handleClose}>x</span>
        <div className={styles.reservatieData}>
          <input type="text" onChange={handleChange} required />
        </div>
        <button onClick={handleOnClick} className={styles.button}>
          Naam toewijzen
        </button>
      </div>
    </div>
  );
};
