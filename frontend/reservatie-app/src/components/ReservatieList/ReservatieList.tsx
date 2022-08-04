import React, { useContext, useEffect, useState } from "react";
import styles from "./ReservatieList.module.css";
import {
  DataGrid,
  GridColDef,
  nlNL,
} from "@mui/x-data-grid";
import axios from "axios";
// import { makeStyles } from "@mui/styles";
import { IReservation, ISeat, IUReservation, IWorkplace } from "../../types";
// import { height } from "@mui/system";
import { UserContext } from "../Context/UserContext";
import Seat from "../Layout/Seat/Seat";





const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    headerAlign: "center",
    
  },
  {
    field: "reservationDate",
    headerName: "Datum",
    headerAlign: "center",
    cellClassName: "biggie",
    minWidth: 125,
    
  },
  {
    field: "timeOfDay",
    headerName: "Status",
    headerAlign: "center",
    cellClassName: "smalls",
    minWidth: 110,
    
  },
  {
    field: "seatId",
    headerName: "Stoel",
    headerAlign: "center",
    
  },
  {
    field:"workplace",
    headerName:"Werkkplek",
    headerAlign:"center",
    minWidth :130
  },
];




const ReservatieLijst = () => {

  const [stoel, setStoel] = useState<ISeat[]>([]);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/seat/get")
      .then((res) => {
        setStoel(res.data);
      });
  }, []);

  const [workplace, setWorkplace] = useState<IWorkplace[]>();

  useEffect(() => {
    axios
      .get<IWorkplace[]>("https://reservation-api.azurewebsites.net/api/workplace/get")
      .then((res) => {
        setWorkplace(res.data);
        
      });
  }, []);

  console.log(workplace);
  



  const { user } = useContext(UserContext);
  const [reservationNumber, setReservationNumber] = useState<number>(0);

  const deleteReservation = (number: number) => {
    axios.delete(
      `https://reservation-api.azurewebsites.net/api/reservation/delete/${number}`
    );
  };

  const annuleerReservation = (number: number) => {
    const newRes: IReservation = {
      id: number,
      reservationDate: reservaties!.find((r) => r.id === number)!
        .reservationDate,
      timeOfDay: reservaties!.find((r) => r.id === number)!.timeOfDay,
      reservationStatus: "geannuleerd",
      usersId: reservaties!.find((r) => r.id === number)!.usersId,
      seatId: reservaties!.find((r) => r.id === number)!.seatId,
      timeOfAnnulation: "2022-01-01T00:00:00.0000000"
    };

    axios.put("https://reservation-api.azurewebsites.net/api/reservation/update", newRes)
    .then((data) => {
      console.log("Reservatie geanuleerd");
    })
    .catch((err) => {
      console.log("Reservatie niet kunnen annuleren");
      console.log(err)
    });
  };

  const click_for_deleteReservation: React.MouseEventHandler<HTMLInputElement> = (event) => {
      deleteReservation(reservationNumber);
  };

  const click_for_annuleerReservation: React.MouseEventHandler<HTMLInputElement> = (event) => {
      annuleerReservation(reservationNumber);
  };

  const ReservationValue: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setReservationNumber(parseInt(event.target.value));
  };

  // code hieronder dient voor het stylen van cellen in de datagrid.
  // plaats 'className={classes.root}' in de eerste div van de return waarde.

  /*const useStyles = makeStyles({

  root:{
    '& .biggie':{
      
    }
  }
})
const classes = useStyles();*/



  const [reservaties, setReservaties] = useState<IReservation[]>([]);
  const [uReservaties, setUReservaties] = useState<IUReservation[]>([]);
  const [uSeat, setUSeat] = useState<ISeat>();
  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/reservation/get")
      .then((res) => {
        setUReservaties(res.data);
        
      });
  }, []);

  let ustoel;
  let uworkplace;
  
  uReservaties.map((a) => {
    a.reservationDate = a.reservationDate.substring(0, 10);
    ustoel = stoel.find((stoel) => {return stoel.id === a.seatId });
    
    a.location = ustoel?.workplaceId;

    uworkplace = workplace?.find((workplace) => { return workplace.id === a.location});
    a.workplace = uworkplace?.workplaceName;
  });

  
console.log(uReservaties);

  return (
    <div>
      <p>delete reservation here</p>
      {/*<input
        type="number"
        id="delete_reservation"
        min="0"
        //onChange={ReservationValue}
      />*/}
      <select name="Reservations" id=""
      onChange={ReservationValue}>
              {uReservaties.filter((status) => !(status.reservationStatus === "geannuleerd")  && (status.usersId === user.id)).map((reservatie : IUReservation) => {
                return (
                  <option value={reservatie.id} key={reservatie.id}>
                    {reservatie.id}
                  </option>
                );
              })}
            </select>
      <input
        type="button"
        id="submit"
        value="verwijder"
        onClick={click_for_deleteReservation}
      />
      <input
        type="button"
        id="submit"
        value="annuleer"
        onClick={click_for_annuleerReservation}
    />
      <div style={{display:"flex", height: "100%" }}>
      <div style={{flexGrow:1, width:"100%"}}>
      <DataGrid
        localeText={nlNL.components.MuiDataGrid.defaultProps.localeText}
        rows={uReservaties.filter(
          (status) => !(status.reservationStatus === "geannuleerd")  && (status.usersId === user.id)
        )}
        columns={columns}
        disableSelectionOnClick
        disableColumnMenu
        
      />
      </div>
      </div>
    </div>
  );
};
export default ReservatieLijst;















export const Geanulleerde_reservatieLijst = () => {
  const { user } = useContext(UserContext);
  const [reservationNumber, setReservationNumber] = useState<number>(0);
  const deleteReservation = (number: number) => {
    axios.delete(
      `https://reservation-api.azurewebsites.net/api/reservation/delete/${number}`
    );
  };

  const click_for_deleteReservation: React.MouseEventHandler<HTMLInputElement> =
    (event) => {
      deleteReservation(reservationNumber);
    };

  const ReservationValue: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setReservationNumber(parseInt(event.target.value));
  };

  const [reservaties, setReservaties] = useState<IReservation[]>([]);
  

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/reservation/get")
      .then((res) => {
        setReservaties(res.data);
      });
  }, [reservaties]);

  reservaties.map((a) => {
    a.reservationDate = a.reservationDate.substring(0, 10);
    
  });

  return (
    <div >
     <p>delete reservation here</p>
      {/*<input
        type="number"
        id="delete_reservation"
        min="0"
        //onChange={ReservationValue}
      />*/}
      <select name="Reservations" id=""
      onChange={ReservationValue}>
              {reservaties.filter((status) => (status.reservationStatus === "geannuleerd")  && (status.usersId === user.id)).map((reservatie : IReservation) => {
                return (
                  <option value={reservatie.id} key={reservatie.id}>
                    {reservatie.id}
                  </option>
                );
              })}
            </select>
      <input
        type="button"
        id="submit"
        value="verwijder"
        onClick={click_for_deleteReservation}
      />
      <div style={{display:"flex" , minHeight:'90%'}}>
        <div style={{flexGrow:1, width:'100%'}}>
          <DataGrid
        localeText={nlNL.components.MuiDataGrid.defaultProps.localeText}
        className={styles.dataGrid}
        rows={reservaties.filter(
          (status) => status.reservationStatus === "geannuleerd" && status.usersId === user.id
        )}
        columns={columns}
        disableSelectionOnClick
        disableColumnMenu
        disableDensitySelector
        disableColumnSelector
        
        
      />
        </div>
      </div>
      
    </div>
  );
};
