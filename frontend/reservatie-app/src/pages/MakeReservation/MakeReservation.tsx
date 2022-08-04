import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../components/Context/UserContext";
import ReservationDay from "../../components/Layout/Date/date";
import Seat from "../../components/Layout/Seat/Seat";
import TimeOfDay from "../../components/Layout/TimeOfDay/TimeOfDay";
import Workplace from "../../components/Layout/Workplace/Workplace";
import {
  IReservation,
  IReservationRules,
  ISeat,
  SeatAvailability,
} from "../../types";
import axios from "axios";
import styles from "./MakeReservation.module.css";
import { PopUpCard } from "../../components/PopUpCard/PopUpCard";
import { UserNotification } from "../../components/UserNotification/UserNotification";

export const MakeReservationPage = () => {
  const { user } = useContext(UserContext);

  const [date, setDate] = useState<string>("");
  const [seatId, setSeatId] = useState<number>(0);
  const [timeOfDay, setTimeOfDay] = useState<string>("Volledige dag");
  const [reservationLimit, setReservationLimit] = useState<number>(8);
  const [reservation, setReservation] = useState<IReservation[]>([
    {
      id: 0,
      reservationDate: "not provided",
      timeOfDay: "not provided",
      reservationStatus: "not provided",
      usersId: "not provided",
      seatId: 0,
      timeOfAnnulation: "2022-01-01T00:00:00.0000000",
    },
  ]);
  const [workplaceId, setWorkplaceId] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] =
    useState<string>("Some message");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/reservation/get")
      .then((res) => {
        setReservation(res.data);
      });
  }, [reservation, update]);

  const handleDateChange = (data: string) => {
    setDate(data);
  };

  const handleChangeSeat = (seatID: number) => {
    setSeatId(seatID);
  };

  const handleTimeOfDayChange = (timeOfDayValue: string) => {
    setTimeOfDay(timeOfDayValue);
  };

  const handleWorkplaceId = (workPlaceID: number) => {
    setWorkplaceId(workPlaceID);
  };

  const ChangeSeatStatusToTaken = (seatID: number) => {
    axios
      .get<ISeat>(
        `https://reservation-api.azurewebsites.net/api/seat/get/${seatID}`
      )
      .then((response) => {
        axios
          .put<ISeat>(
            "https://reservation-api.azurewebsites.net/api/seat/update",
            {
              id: response.data.id,
              workplaceId: response.data.workplaceId,
              name: response.data.name,
              availabilityStatus: SeatAvailability.Taken,
              coordinateX: response.data.coordinateX,
              coordinateY: response.data.coordinateY,
              hasAssignedUser: response.data.hasAssignedUser,
            }
          )
          .then(() => {
            console.log(`seat ${seatID} changed`);
          });
      });
  };

  const handleAdd = () => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/reservation/get")
      .then((res) => {
        setReservation(res.data);
      });

    const newRes: IReservation = {
      reservationDate: date,
      timeOfDay: timeOfDay,
      reservationStatus: "actief",
      usersId:  user.id ,
      seatId: seatId,
      timeOfAnnulation: "2022-01-01T00:00:00.0000000",
    };

    const accurateDate: string = date + "T00:00:00";
    // const resVrij: IReservationLimitStatus = {
    //   voormiddag: reservationLimit!,
    //   namiddag: reservationLimit!,
    //   volledigeDag: reservationLimit!,
    // };

    axios
      .get("https://reservation-api.azurewebsites.net/api/reservationrules/get")
      .then((res) => {
        let data: IReservationRules[] = res.data;
        setReservationLimit(
          data.filter((rule) => rule.workplaceId === workplaceId)[0]
            .maxReservations
        );
      });

    if (
      reservation!.filter((res) => res.reservationDate === accurateDate)
        .length > reservationLimit!
    ) {
      window.alert("Dag is helaas volgeboekt");
      return;
    }

    axios
      .post(
        "https://reservation-api.azurewebsites.net/api/reservation/add",
        newRes
      )
      .then((data) => {
        ChangeSeatStatusToTaken(seatId);
        setNotificationMessage("Reservatie was succesvol geplaatst.");
        setErrorMessage(false);
        setNotification(true);
      })
      .catch((err) => {
        setNotificationMessage("Reservatie niet gelukt.");
        setErrorMessage(true);
        setNotification(true);
      });

    setUpdate(true);
    togglePopup();

    setTimeout(() => {
      setNotification(false);
    }, 6000);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // let {id} = useParams<ParamTypes>();
  // let seat = seats?.find((seat: ISeat) =>seat.id === parseInt(id))

  return (
    <div className={styles.containter}>
      {notification && (
        <UserNotification
          notificationMessage={notificationMessage}
          errorMessage={errorMessage}
        />
      )}

      <div className={styles.inputfieldsContainer}>
        <Workplace handleChangeWorkplace={handleWorkplaceId} />
        <ReservationDay handleDateChange={handleDateChange} update={update} />
        <TimeOfDay handleTimeOfDayChange={handleTimeOfDayChange} />
      </div>
      <Seat
        handleChangeSeat={handleChangeSeat}
        workPlaceId={workplaceId}
        reservations={reservation!}
        date={date}
        dayPeriod={timeOfDay}
        togglePopUp={togglePopup}
        update={update}
      />

      {isOpen && (
        <PopUpCard
          handleOnClick={handleAdd}
          reservationData={{
            usersId: user.id,
            reservationDate: date,
            reservationStatus: "actief",
            timeOfDay: timeOfDay,
            seatId: seatId,
            timeOfAnnulation: "2022-01-01T00:00:00.0000000",
          }}
          userFullname={user.firstName + " " + user.lastName}
          workplaceName={String(workplaceId)}
          handleClose={togglePopup}
        />
      )}

    </div>
  );
};
