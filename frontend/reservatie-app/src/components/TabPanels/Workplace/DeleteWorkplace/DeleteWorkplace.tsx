import React, { useState, useEffect } from "react";
import { IReservation, ISeat, IWorkplace } from "../../../../types";
import { IconButton } from "@mui/material";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "./DeleteWorkplace.module.css";
import { UserNotification } from "../../../UserNotification/UserNotification";

export const DeleteWorkplace = () => {
  const [reservations, setReservations] = useState<IReservation[]>([
    {
      id: 0,
      reservationDate: "",
      timeOfDay: "",
      reservationStatus: "",
      usersId: "",
      seatId: 0,
      timeOfAnnulation: "2022-01-01T00:00:00.0000000"
    },
  ]);
  const [seats, setSeats] = useState<ISeat[]>([
    {
      id: 0,
      workplaceId: 0,
      name: "",
      availabilityStatus: "",
      coordinateX: 0,
      coordinateY: 0,
      hasAssignedUser: false,
    },
  ]);
  const [workplaces, setWorkplaces] = useState<IWorkplace[]>([
    {
      id: 0,
      workplaceName: "Not Provided",
      maxUsers: 0,
      companyId: 0,
      streetAdress: "",
      city: "",
      country: "",
      zipcode: 0,
      floorNumber: 0,
      plattegrond: "",
    },
  ]);
  const [allowDeletion, setAllowDeletion] = useState<boolean>(false);
  const [updateWorkplaceList, setUpdateWorkplaceList] = useState<boolean>(false);

  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("Some message");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/reservation/get")
      .then((response) => {
        setReservations(response.data);
      });

    axios
      .get("https://reservation-api.azurewebsites.net/api/seat/get")
      .then((response) => {
        setSeats(response.data);
      });

    axios
      .get("https://reservation-api.azurewebsites.net/api/workplace/get")
      .then((response) => {
        setWorkplaces(response.data);
      });
  }, [updateWorkplaceList]);

  const checkAssignedSeatsToWorkplace = (workplaceID: number): ISeat[] => {
    return seats.filter((seat: ISeat) => seat.workplaceId === workplaceID);
  };

  const checkForReservationInWorkplace = ( filteredSeats: ISeat[] ): IReservation[] => {
    let filteredReservations: IReservation[] = [];

    reservations.forEach((reservation: IReservation) => {
      filteredSeats.forEach((seat: ISeat) => {
        if (seat.id === reservation.seatId)
          filteredReservations.push(reservation);
      });
    });

    return filteredReservations;
  };

  const handleDeleteClick = (workplaceID: number) => {
    let filteredSeats: ISeat[] = checkAssignedSeatsToWorkplace(workplaceID);

    let filteredReservations: IReservation[] = checkForReservationInWorkplace(filteredSeats);

    if (filteredReservations.length === 0) {
        setAllowDeletion(true);
    }
    
    if (allowDeletion) {
      axios
        .delete( 
            `https://reservation-api.azurewebsites.net/api/workplace/delete/${workplaceID}`
        )
        .then(() => {
          setAllowDeletion(false);
          setUpdateWorkplaceList(!updateWorkplaceList);
          setNotificationMessage("Werkplek succesvol verwijderd.");
          setNotification(true);
          setErrorMessage(false);
        })
        .catch(() => {
          setNotificationMessage("Werkplek niet verwijderd.");
          setNotification(true);
          setErrorMessage(true);
        });
    }
  };

  return (
    <div>
       {notification && (
        <UserNotification
          notificationMessage={notificationMessage}
          errorMessage={errorMessage}
        />
      )}
      {workplaces.map((workplace: IWorkplace) => (
        <div className={styles.container} key={workplace.id}>
          <p className={styles.titles}>{workplace.workplaceName}</p>
          <IconButton
            onClick={() => {
              handleDeleteClick(workplace.id!);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
