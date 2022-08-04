import React, { useEffect, useState } from "react";
import { IAssignedSeats, ISeat, IUser } from "../../../types";
import axios from "axios";
import { UserNotification } from "../../UserNotification/UserNotification";
import styles from "./vastePlaats.module.css";

const VastePlaats = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [seats, setSeats] = useState<ISeat[]>([]);
  const [assignedSeats, setAssignedSeats] = useState<IAssignedSeats[]>([])

  const [userId, setUserId] = useState<string>('')
  const [seatId, setSeatId] = useState<number>(0)

  const [startUserId, setStartUserId] = useState<string>('')
  const [startSeatId, setStartSeatId] = useState<number>(0)

  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>(" ");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    let data: ISeat[];
    axios.get("https://reservation-api.azurewebsites.net/api/seat/get").then((res) => {
      data = res.data;
      if (isMounted) setSeats(data); setStartSeatId(data[0].id!);
    });
    return () => { isMounted = false }
  }, [seats]);

  useEffect(() => {
    let isMounted = true;
    let data: IUser[];
    axios.get("https://reservation-api.azurewebsites.net/api/user/get").then((res) => {
      data = res.data;
      if (isMounted) setUsers(data); setStartUserId(data[0].id);
    });
    return () => { isMounted = false }
  }, [users]);

  useEffect(() => {
    let isMounted = true;
    let data: IAssignedSeats[];
    axios.get("https://reservation-api.azurewebsites.net/api/assignedseat/get").then((res) => {
      data = res.data;
      if (isMounted) setAssignedSeats(data);
    });
    return () => { isMounted = false }
  }, [assignedSeats]);

  const handleUserChange : React.ChangeEventHandler<HTMLSelectElement> = (event) => {
      setUserId(event.target.value)
  }

  const handleSeatChange : React.ChangeEventHandler<HTMLSelectElement> = (event) => {
      setSeatId(parseInt(event.target.value))
  }

  const assignSeat : React.MouseEventHandler<HTMLButtonElement> = () => {
    let gebruikerId : string;
    let zetelId : number;

    if (userId == '') {
      gebruikerId = startUserId;
    }
    else{
      gebruikerId = userId
    }

    const updateUser : IUser = {
      id: gebruikerId,
      firstName: users.find((u) => u.id === gebruikerId)!.firstName,
      lastName: users.find((u) => u.id === gebruikerId)!.lastName,
      isAdmin: users.find((u) => u.id === gebruikerId)!.isAdmin,
      email: users.find((u) => u.id === gebruikerId)!.email,
      languageUse: users.find((u) => u.id === gebruikerId)!.languageUse,
      hasAssingedSeat: true
    }

    if (seatId == 0) {
      zetelId = startSeatId;
    }
    else{
      zetelId = seatId
    }

    const updateSeat : ISeat = {
      id: zetelId,
      //workplaceId: seats[zetelId - 1].workplaceId,
      workplaceId: seats.find(s => s.id == zetelId)!.workplaceId,
      name: seats.find(s => s.id == zetelId)!.name,
      availabilityStatus: seats.find(s => s.id == zetelId)!.availabilityStatus,
      coordinateX: seats.find(s => s.id == zetelId)!.coordinateX,
      coordinateY: seats.find(s => s.id == zetelId)!.coordinateY,
      hasAssignedUser : true
    }

    const newAssignSeat : IAssignedSeats = {
        usersId : gebruikerId,
        seatId : zetelId
    }

    //Pas user aan
    axios
    .put("https://reservation-api.azurewebsites.net/api/user/update", updateUser)
    .then((data) => {
      console.log("User geupdate");
    })
    .catch((err) => {
      console.log("Users niet kunnen updaten");
    });

    //pas Seat aan
    axios
    .put("https://reservation-api.azurewebsites.net/api/seat/update", updateSeat)
    .then((data) => {
      console.log("Seat geupdate");
    })
    .catch((err) => {
        console.log(updateSeat)
      console.log("Seat niet kunnen updaten");
    });
    
    //Voeg assignseat toe
    axios
    .post("https://reservation-api.azurewebsites.net/api/assignedseat/add", newAssignSeat)
    .then((data) => {
      setNotificationMessage("Vaste plaats toegewezen.")
      setNotification(true);
      setErrorMessage(false);
    })
    .catch((err) => {
      setNotificationMessage("Vaste plaats niet toegewezen.")
      setNotification(true);
      setErrorMessage(true);
    });
  }

  return (
    <div className={styles.container}>
       {notification && (
        <UserNotification
          notificationMessage={notificationMessage}
          errorMessage={errorMessage}
        />
      )}
      <div className={styles.usersContainer}>
        <p>Users:</p>
        <select name="Users" id="" onChange={handleUserChange} className={styles.usersSelect}>
          {users.map((user: IUser) => {
            if (user.hasAssingedSeat !== true){
              return (
                <option value={user.id} key={user.id}>
                  {user.firstName}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className={styles.seatsContainer}>
        <p>Seats:</p>
        <select name="Seats" id="" onChange={handleSeatChange} className={styles.seatsSelect}>
          {seats.map((seat: ISeat) => {
            if  (seat.hasAssignedUser !== true){
              return (
                <option value={seat.id} key={seat.id}>
                  {seat.name}
                </option>
              );
            }
            }
            )}
        </select>
      </div>
      <button onClick={assignSeat} className={styles.btnPlaatsToekenen}>Plaats toekennen</button>
  
    </div>
  );
};

export default VastePlaats;
