import React, { useEffect, useState } from "react";
import axios from "axios";
import { IReservation, ISeat } from "../../../types";
// import Workplace from "../Workplace/Workplace";
import styles from "./AvailableSeats.module.css";
import ImageMapper, { Map, MapAreas } from "react-img-mapper";
import { LoadingIndicator } from "../../LoadingIndicator/LoadingIndicator";

interface SeatProps {
  handleChangeSeat : (seat_id :number) => void;
  workPlaceId: number;
  reservations: IReservation[];
  date: string;
  dayPeriod: string;
  togglePopUp : () => void;
  update:boolean;
}

// color for assigned seat 
// preFillColor (backgroundColor) "rgba(252,182,114, .50)"
// strokeColor(border) rgba(252,182,114, 1.0)"

const Seat = ({ handleChangeSeat, workPlaceId, reservations, date, dayPeriod, togglePopUp, update }: SeatProps) => {
  //const [changeWidth, setChangeWidth] = useState<number>(450);  // for changable hard coded image width (cant 'width:auto' on image)
  const [loading, setLoading] = useState<boolean>(true);
  const [areas, setAreas] = useState<MapAreas[]>([]); // for placing seats in the image mapper
  const [workplaceLayout, setWorkplaceLayout] = useState<string>("");

  useEffect(() => {
    axios
      .get(`https://reservation-api.azurewebsites.net/api/workplace/get/${workPlaceId}`)
      .then((response) => {
          setWorkplaceLayout(response.data.plattegrond);
      });
  }, [workPlaceId])

  useEffect(() => {
    let reservationsList : IReservation[] = [];

    reservationsList = reservations!.filter((item) => item.reservationDate === date);
    
    axios
      .get<ISeat[]>("https://reservation-api.azurewebsites.net/api/seat/get")
      .then((response) => {
        let seats: MapAreas[] = [];
        
        response.data.forEach((seatItem) => {
          if (seatItem.workplaceId === workPlaceId) {

            let seatReservation :IReservation[]  | undefined = reservationsList.filter(resItem => resItem.seatId === seatItem.id);
            let allowReservation: boolean = false;

            if(seatReservation === undefined || seatReservation.length === 0 ) allowReservation = true;
            
            seatReservation.forEach(resItem => {
                if(resItem.timeOfDay !== dayPeriod && resItem.timeOfDay !== "Volledige dag" ) allowReservation = true;
                if(dayPeriod === "Volledige dag") allowReservation = false;
            })

            let area: MapAreas = {
              id: String(seatItem.id),
              shape: "circle",
              fillColor: "rgba(255,255,255, 0.30)",
              strokeColor:
                allowReservation
                  ? "rgba(0, 254, 0, 0.50)"
                  : "rgba(254, 0, 0, 0.50)",
              coords: [seatItem.coordinateX, seatItem.coordinateY, 20],
              preFillColor:
                allowReservation
                  ? "rgba(0, 254, 0, 0.20)"
                  : "rgba(254, 0, 0, 0.20)",
              active: allowReservation
            };
            seats.push(area);
          }
        });
        setAreas(seats);
        setLoading(false);
      });
  }, [update, date, dayPeriod, workPlaceId]);

  const URL = workplaceLayout;
  const MAP: Map = {
    name: "test",
    areas: areas,
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Beschikbare stoelen</p>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className={styles.layoutStyle}>
            <ImageMapper
              src={URL}
              map={MAP}
              responsive={true}
              parentWidth={550}
              onClick={(event) => { 
                if (event.active){
                  handleChangeSeat(Number(event.id));
                  togglePopUp();
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Seat;