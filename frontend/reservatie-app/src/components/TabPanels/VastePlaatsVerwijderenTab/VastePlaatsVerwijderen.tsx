import axios from "axios";
import React, { useEffect, useState } from "react";
import { IAssignedSeats, ISeat, IUser } from "../../../types";
import { UserNotification } from "../../UserNotification/UserNotification";
import styles from "./vastePlaatsVerwijderen.module.css";

const VastePlaatsVerwijderen = () => {
  const [assignedSeats, setAssignedSeats] = useState<IAssignedSeats[]>();
  const [users, setUsers] = useState<IUser[]>();
  const [seats, setSeats] = useState<ISeat[]>();

  const [newAssignSeat, setNewAssignSeat] = useState<IAssignedSeats>();
  const [id, setId] = useState<number>();
  const [starterId, setStarterId] = useState<number>();

  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] =
    useState<string>("Some message");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    let data: ISeat[];
    axios
      .get("https://reservation-api.azurewebsites.net/api/seat/get")
      .then((res) => {
        data = res.data;
        if (isMounted) setSeats(data);
      });
    return () => {
      isMounted = false;
    };
  }, [seats]);

  useEffect(() => {
    let isMounted = true;
    let data: IUser[];
    axios
      .get("https://reservation-api.azurewebsites.net/api/user/get")
      .then((res) => {
        data = res.data;
        if (isMounted) setUsers(data);
      });
    return () => {
      isMounted = false;
    };
  }, [users]);

  useEffect(() => {
    let isMounted = true;
    let data: IAssignedSeats[];
    axios
      .get("https://reservation-api.azurewebsites.net/api/assignedseat/get")
      .then((res) => {
        data = res.data;
        if (isMounted) setAssignedSeats(data);
      });
    return () => {
      isMounted = false;
    };
  }, [assignedSeats]);

  const handleDelete = () => {
    if (id !== undefined) {
      setNewAssignSeat(assignedSeats?.find((i) => i.id === id));
    } else {
      let newCombo: IAssignedSeats = {
        id: assignedSeats![0].id,
        usersId: assignedSeats![0].usersId,
        seatId: assignedSeats![0].seatId,
      };
      setNewAssignSeat(newCombo);
    }
    //User
    axios
      .patch(
        `https://reservation-api.azurewebsites.net/api/user/vvs/${newAssignSeat?.usersId}`
      )
      .then((data) => {
        console.log("User geupdate");
      })
      .catch((err) => {
        console.log("Users niet kunnen updaten");
      });
    //Seat
    axios
      .patch(
        `https://reservation-api.azurewebsites.net/api/seat/vvs/${newAssignSeat?.seatId}`
      )
      .then((data) => {
        console.log("Seat geupdate");
      })
      .catch((err) => {
        console.log("Seats niet kunnen updaten");
      });
    //AssignedSeat
    axios
      .delete(
        `https://reservation-api.azurewebsites.net/api/assignedseat/delete/${newAssignSeat?.id}`
      )
      .then((data) => {
        setNotificationMessage("Vaste plaats verwijderd.")
        setNotification(true);
        setErrorMessage(false);
      })
      .catch((err) => {
        setNotificationMessage("Vaste plaats niet verwijderd.")
        setNotification(true);
        setErrorMessage(true);
      });
  };

  return (
    <div className={styles.container}>
      {notification && (
        <UserNotification
          notificationMessage={notificationMessage}
          errorMessage={errorMessage}
        />
      )}

      <select
        name="Vaste plaatsen"
        id=""
        defaultValue={starterId}
        onChange={(event) => {
          setId(parseInt(event.target.value));
        }}
        className={styles.selectContainer}
      >
        {assignedSeats?.map((aSeat: IAssignedSeats) => {
          return (
            <option value={aSeat.id} key={aSeat.id}>
              Id: {aSeat.id},Seat :{" "}
              {seats?.find((s) => s.id === aSeat.seatId)?.name} , User :
              {users?.find((u) => u.id === aSeat.usersId)?.firstName}
            </option>
          );
        })}
      </select>
      {/*<input type="number" id="submit" onChange={(event) => {setId(parseInt(event.target.value))}}/>*/}
      <button onClick={handleDelete} className={styles.btnDelete}>Verwijder</button>
    </div>
  );
};

export default VastePlaatsVerwijderen;
