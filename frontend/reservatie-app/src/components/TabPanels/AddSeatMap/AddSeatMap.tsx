import React, { useEffect, useState } from "react";
import { IReservationRules, ISeat, IWorkplace } from "../../../types";
import { AddDraggableSeat } from "./Seats/DraggableSeat";
import styles from "./AddSeatMap.module.css";
import axios from "axios";
import { ApplySeatNamePopUp } from "../../PopUpCard/PopUpForSeatName";

export interface IDraggableSeat {
  id: number;
  name: string;
  coordinateX: number;
  coordinateY: number;
}

function AddSeatMap() {
  const [seats, setSeats] = useState<IDraggableSeat[]>([]);
  const [workplace, setWorkplace] = useState<IWorkplace[]>();
  const [seatAmount, setSeatAmount] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [workplaceLayout, setWorkplaceLayout] = useState<string>("");
  const [workplaceID, setWorkplaceID] = useState<number>(0);
  const [update, setUpdate] = useState<boolean>(false);
  const [allowedSeats, setAllowedSeats] = useState<number>(8);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [seatName, setSeatName] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/workplace/get")
      .then((res) => {
        setWorkplace(res.data);
      });
  }, []);

  const GetAllowedSeats = (workplaceID: number) => {
    axios
      .get<IReservationRules>(`https://reservation-api.azurewebsites.net/api/reservationrules/get/${workplaceID}`)
      .then((response)=>{
        if(response.data.maxReservations !== null || response.data.maxReservations !== undefined){
          setAllowedSeats(response.data.maxReservations);
          console.log(response.data.maxReservations);
        }
      })
  }

  const UploadSeats = (seats: IDraggableSeat[]) => {
    seats.forEach(async (seat) => {
      let newSeat: ISeat = {
        workplaceId: workplaceID,
        name: seat.name,
        availabilityStatus: "Free",
        coordinateX: seat.coordinateX,
        coordinateY: seat.coordinateY,
        hasAssignedUser: false,
      };
      await axios
        .post("https://reservation-api.azurewebsites.net/api/seat/add", newSeat)
        .then(() => console.log("ADDED"))
        .catch(() => console.log("NOT ADDED"));
    });
  };

  const handleAddSeat = () => {
    let seat: IDraggableSeat = {
      id: index,
      name: seatName,
      coordinateX: 0,
      coordinateY: 0,
    };

    setSeats([...seats, seat]);
    setSeatAmount(seatAmount + 1);
    setIndex(index + 1);
  };

  const handleCoordsChange = () => {
    setUpdate(!update);
  };

  const handleAddtoDatabase: React.MouseEventHandler<HTMLButtonElement> = () => {
      UploadSeats(seats);
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    GetAllowedSeats(Number(event.target.value));
    setWorkplaceID(Number(event.target.value));
    setWorkplaceLayout(event.target.options[event.target.selectedIndex].dataset.layout!);
  };

  const togglePopupOn = () => {
    setIsOpen(true);
  };

  const togglePopupOff = () => {
    setIsOpen(false);
    handleAddSeat();
  };

  const handleSeatNameChange = (name :string) => {
    setSeatName(name);
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <p className={styles.title}>Kies een werkplek :</p>
        <select
          name="Workplaces"
          onChange={handleChange}
          className={styles.selectItem}
        >
          {workplace?.map((workplace: IWorkplace) => {
            return (
              <option
                value={workplace.id}
                data-layout={workplace.plattegrond}
                key={workplace.id}
                className={styles.optionItem}
              >
                {workplace.workplaceName}
              </option>
            );
          })}
        </select>
      </div>
      {
        isOpen &&
        <ApplySeatNamePopUp
          handleOnClick={togglePopupOff}
          handleClose={togglePopupOff}
          handleInputValue={handleSeatNameChange}
        />
      }

      <div>
        <div className={styles.buttonsContainer}>
          <button
            onClick={togglePopupOn}
            disabled={seatAmount === allowedSeats}
            className={styles.button}
          >
            Plaats toevoegen
          </button>
          <button onClick={handleAddtoDatabase} className={styles.button}>
            Plaats opslaan
          </button>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={workplaceLayout}
            alt="workplace layout"
            className={styles.image}
          />
          <div className={styles.seatsContainer}>
            {seats.map((item) => (
              <AddDraggableSeat
                key={item.id}
                seat={item}
                handleChange={handleCoordsChange}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div className={styles.seatsDisplay}>
        {seats.map((item) => (
          <p>
            Plaats: {item.id} X: {item.coordinateX} Y: {item.coordinateY}{" "}
          </p>
        ))}
      </div> */}
    </div>
  );
}

export default AddSeatMap;
