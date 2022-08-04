import React from "react";
import { IReservation } from "../../types";
import styles from "./PopUpCard.module.css";

interface PopUpCardProps {
  handleOnClick: () => void;
  reservationData :IReservation;
  userFullname: string;
  workplaceName: string;
  handleClose: () => void;
}

export const PopUpCard = ({ handleOnClick, reservationData, userFullname, workplaceName,handleClose }: PopUpCardProps) => {
  return (
    <div className={styles.popupBox}>
      <div className={styles.popupContent}>
      <span className={styles.closeIcon} onClick={handleClose}>x</span>
        <div className={styles.reservatieData}>
          <h5 className={styles.popupTitle}>Reservatie gegevens</h5>
          <p>Gebruikers ID : {reservationData.usersId}</p>
          <p>Gebruikersnaam : {userFullname}</p>
          <p>Stoel ID : {reservationData.seatId}</p>
          <p>Tijd : {reservationData.reservationDate}</p>
          <p>Werkplek : {workplaceName}</p>
          <p>Periode : {reservationData.timeOfDay}</p>
          <p>Status : {reservationData.reservationStatus}</p>
        </div>
        <button onClick={handleOnClick} className={styles.button}>
          Maak Reservatie
        </button>
      </div>
    </div>
  );
};
