import axios from "axios";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { IReservation } from "../../types";

export const Checkin_checkout = () =>{
    // const [seatHasReservation, setSeatHasReservation] = useState<boolean>(false);
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
      /*let time = new Date();
      console.log(time);*/
      useEffect(() => {
        axios
          .get("https://reservation-api.azurewebsites.net/api/reservation/get")
          .then((res) => {
            setReservations(res.data);  
          });
        }, []);

      const checkIfSeatHasReservation = (SeatID:any) => {
           let filteredreservations = reservations.filter((reservation: IReservation) => reservation.seatId == SeatID)
          if (filteredreservations.length > 0) {
            return console.log("er is een reservatie")
        }
        else return console.log("Er is geen reservatie, zit u op de juiste plaats?")    
      };

      const checkIfReservationBelongsToUser = (usersId:any) => {
          let filteredbyuser = reservations.filter((reservation: IReservation) => reservation.usersId == usersId)
          if (filteredbyuser.length > 0) {
              return console.log("this is your reserved seat")
          }
          else return console.log("this is not your reserved seat")
      };
        
    let {SeatID, usersId}:any = useParams();
    console.log(SeatID)
    checkIfSeatHasReservation(SeatID);
    checkIfReservationBelongsToUser(usersId)
    // let filteredreservations:IReservation[] = checkIfSeatHasReservation(SeatID);
    return <div>
      <h2>test</h2>
      <h2>{SeatID}</h2>
      <h2>{usersId}</h2>
    </div>//<checkIfSeatHasReservation />
};