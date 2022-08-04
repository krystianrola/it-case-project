import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IReservationRules,
} from "../../../types";
import styles from "./cancelReservation.module.css";

interface Workplace {
  id: number;
  workplaceName: string;
  layoutMap?: any;
  maxUsers: number;
  companyId: number;
  streetAdress?: any;
  city?: any;
  country?: any;
  zipcode?: any;
  floorNumber?: any;
}

export const CancelReservationTime = () => {
  const [reservationRulesList, setReservationRulesList] =
    useState<IReservationRules[]>([])
  const [inputValue, setInputValue] = useState<number>(0);
  const [updatet, setUpdatet] = useState<boolean>();
  const [workplace, setWorkplace] = useState<Workplace[]>();
  const [workplaceId, setWorkplaceId] = useState<number>(1)

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/reservationrules/get")
      .then((res) => {
        console.log("call cancelres")
        setReservationRulesList(res.data);
        setUpdatet(false);
      });
  }, [updatet]);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/workplace/get")
      .then((res) => {
        setWorkplace(res.data);
      });
  }, []);

  /*const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(parseInt(event.target.value));
  };*/

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    let newReservationRulesList: IReservationRules = {
      workplaceId: workplaceId,
      maxReservationPeriod: reservationRulesList[workplaceId - 1].maxReservationPeriod,
      maxReservations: reservationRulesList[workplaceId - 1].maxReservations,
      minAnnulationTime: inputValue,
    };
    axios.put(
      "https://reservation-api.azurewebsites.net/api/reservationrules/update",
      newReservationRulesList
    ).then((response)=>{ setUpdatet(true);});

  };

  const handleIdChange : React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setWorkplaceId(parseInt(event.target.value));
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <p>Kies een werkplek:</p>
        <select name="Workplaces" id="" onChange={handleIdChange}>
          {workplace?.map((workplace: Workplace) => {
            return (
              <option value={workplace.id} key={workplace.id}>
                {workplace.workplaceName}
              </option>
            );
          })}
        </select>
      </div>
      <p>
        Huidige minimum annuleringstijd: {reservationRulesList?.find((r : IReservationRules) => r.workplaceId === workplaceId)?.minAnnulationTime}{" "}
        uur
      </p>
      <div className={styles.cancelResTimeContainer}>
        <input type="range" min="1" max="72" value={inputValue} onChange={(event) => setInputValue(parseInt(event.target.value))}/> {inputValue}
        <button onClick={handleClick} className={styles.changeBtn}>Annuleringstijd aanpassen</button>
      </div>
    </div>
  );
};
