import axios from "axios";
import React, { useEffect, useState } from "react";
import { IReservationRules, IWorkplace } from "../../../types";
import { UserNotification } from "../../UserNotification/UserNotification";
import styles from "./MaxReservations.module.css";

interface ReservationRules {
  maxReservationPeriod: number;
  maxReservations: number;
  workplaceId: number;
}

const MaxReservations = () => {
  const [reservationRules, setReservationRules] =
    useState<ReservationRules[]>();
  const [limit, setLimit] = useState<number>(0);
  const [workplace, setWorkplace] = useState<IWorkplace[]>();
  const [workplaceId, setWorkplaceId] = useState<number>(1);
  const [update, setUpdate] = useState<boolean>();

  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] =
    useState<string>("Some message");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/reservationrules/get")
      .then((res) => {
        setReservationRules(res.data);
      });
      setUpdate(false);
  }, [update]);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/workplace/get")
      .then((res) => { 
        setWorkplace(res.data);
      });
      setUpdate(false);
  }, [update]);

  const handleClick = () => {
      if (limit > 0) {
        const newRes : ReservationRules = {
            maxReservationPeriod : 10,
            maxReservations : limit,
            workplaceId : workplaceId
        }
        axios
        .put("https://reservation-api.azurewebsites.net/api/reservationrules/update", newRes)
        .then((res) => {
          console.log("Waarde aangepast");
          setNotificationMessage("Maximum reservaties is aangepast");
          setErrorMessage(false);
          setNotification(true);
        }).catch(()=>{
          setNotificationMessage("Maximum reservaties is niet aangepast");
          setErrorMessage(true);
          setNotification(true);
        })
        setUpdate(true);
      }
      else{
          // window.alert("Limiet mag niet 0 of kleiner zijn")
          setNotificationMessage("Limiet mag niet 0 of kleiner zijn");
          setErrorMessage(true);
          setNotification(true);
      }
  }

  const handleIdChange : React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setWorkplaceId(parseInt(event.target.value))
    console.log(workplaceId)
  }

  return (
    <div className={styles.container}>
      {notification && (
        <UserNotification
          notificationMessage={notificationMessage}
          errorMessage={errorMessage}
        />
      )}
      <div className={styles.workplaceContainer}>
        <p>Kieze een werkplekken:</p>
        <select name="Workplaces" id="" onChange={handleIdChange} className={styles.selectContainer}>
          {workplace?.map((workplace: IWorkplace) => {
            return (
              <option value={workplace.id} key={workplace.id}>
                {workplace.workplaceName}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <p>
          Huidige dagelijkse limiet : {reservationRules?.find((r : ReservationRules) => r.workplaceId === workplaceId)?.maxReservations}
        </p>
      </div>
      <div className={styles.updateContainer}>
        <p> Limiet bijwerken : </p>
        <input type="range" min="1" max="100" value={limit} onChange={(event) => {setLimit(parseInt(event.target.value))}}/> {limit}
        <button onClick={handleClick} className={styles.btnSaveWorkplace}> Limiet aanpassen </button>
      </div>
    </div>
  );
};

export default MaxReservations;
