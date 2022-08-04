import React, { useState, useEffect } from "react";
import axios from "axios";
import { IReservation, IUser, IAssignedSeats } from "../../../types";
import { Button } from "@mui/material";
import styles from "./DeleteUser.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DialogPopUp } from "./DialogPopUp";

/*
  Check inbouwen voor vaste plaatsen/reservaties en dan pas deleten.
*/

export const DeleteUserTab = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [userList, setUserList] = useState<IUser[]>([]);
  
  const [openDeletePopUp1, setOpenDeletePopUp1] = useState<boolean>(false);
  const [openDeletePopUp2, setOpenDeletePopUp2] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [userID, setUserID] = useState<string>("");

  const [openCanceled, setOpenCanceled] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [asignedSeats, setAsignedSeats] = useState<IAssignedSeats[]>([
    {
      id: 0,
      usersId: "",
      seatId: 0,
    },
  ]);
  const [reservations, setReservations] = useState<IReservation[]>([
    {
      id: 0,
      reservationDate: "",
      timeOfDay: "",
      reservationStatus: "",
      usersId: "",
      seatId: 0,
      timeOfAnnulation: "2022-01-01T00:00:00.0000000",
    },
  ]);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/reservation/get")
      .then((res) => {
        setReservations(res.data);
      });
  }, [reservations]);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/assignedseat/get")
      .then((res) => {
        setAsignedSeats(res.data);
      });
  }, [asignedSeats]);

  useEffect(() => {
    axios
      .get("https://reservation-api.azurewebsites.net/api/user/get")
      .then((res) => {
        setUserList(res.data);
      });
  }, [userList]);

  const handleClose = () => {
    setOpenDeletePopUp1(false);
    setOpenDeletePopUp2(false);
    setOpenCanceled(false);
    setOpenDelete(false);
  };

  const handleCancel = () => {
    setOpenDeletePopUp1(false);
    setOpenDeletePopUp2(false);
    setOpenCanceled(true);
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openCanceled}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Gebruiker verwijderen geannuleerd!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Geannuleerd</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const handleDelete = (
    // id: string,
    // filteredAssignedSeats: IAssignedSeats[],
    // filteredReservations: IReservation[]
  ) => {

    let hasAssignedSeat: boolean = false;
    let hasReservations: boolean = false;
    let filteredReservations: IReservation[] = checkForUsersReservations(userID);
    let filteredAssignedSeats: IAssignedSeats[] = checkForusersAssignedSeat(userID);
    if (filteredReservations.length > 0) hasReservations = true;
    if (filteredAssignedSeats.length > 0) hasAssignedSeat = true;

    //setOpenDeletePopUp1(false);
    //setOpenDeletePopUp2(false);
    console.log("user deleted");

    // axios.delete(
    //   `https://reservation-api.azurewebsites.net/api/user/Delete/${userID}`
    // );
    if (hasAssignedSeat) {
      // axios.delete(
      //   `https://reservation-api.azurewebsites.net/api/assignedseat/Delete/${filteredAssignedSeats[0].id}`
      // );
      console.log("seat deleted");
    }
    if (hasReservations) {
      // filteredReservations.map((e) =>
      //   axios.delete(
      //     `https://reservation-api.azurewebsites.net/api/reservation/Delete/${e.id}`
      //   )
      // );
      console.log("res. deleted");
    }
    setOpenDeletePopUp2(false);
    setDialogMessage("Gebruiker verwijderd.");

    setOpenDelete(true);

    // return (
    //   <div>
    //     <Dialog
    //       fullScreen={fullScreen}
    //       open={openDelete}
    //       aria-labelledby="responsive-dialog-title"
    //     >
    //       <DialogTitle id="responsive-dialog-title">
    //         {"Gebruiker verwijderen gelukt!"}
    //       </DialogTitle>
    //       <DialogContent>
    //         <DialogContentText>gebruiker verwijderd</DialogContentText>
    //       </DialogContent>
    //       <DialogActions>
    //         <Button onClick={handleClose} autoFocus>
    //           ok
    //         </Button>
    //       </DialogActions>
    //     </Dialog>
    //   </div>
    // );
  };

  const checkForUsersReservations = (user_id: string): IReservation[] => {
    return reservations.filter(
      (reservation: IReservation) => reservation.usersId === user_id
    );
  };

  const checkForusersAssignedSeat = (user_id: string): IAssignedSeats[] => {
    return asignedSeats.filter(
      (assignedseat: IAssignedSeats) => assignedseat.usersId === user_id
    );
  };

  const handlePopUp = (user_id: string) => {
    let hasAssignedSeat: boolean = false;
    let hasReservations: boolean = false;

    let filteredReservations: IReservation[] = checkForUsersReservations(user_id);
    let filteredAssignedSeats: IAssignedSeats[] = checkForusersAssignedSeat(user_id);

    if (filteredReservations.length > 0) hasReservations = true;
    if (filteredAssignedSeats.length > 0) hasAssignedSeat = true;

    console.log([hasReservations, hasAssignedSeat]);
    console.log(openDeletePopUp1);

    if (hasReservations || hasAssignedSeat) {
      console.log("res or seat found");
      setDialogMessage("Er zijn nog reservaties en/of een toegezijzen stoel voor deze user. Bent u zeker dat u deze wenst te verwijderen?");
      setOpenDeletePopUp1(true);
      setOpenDeletePopUp2(true); 
    }

    if (!hasReservations && !hasAssignedSeat) {
      setOpenDeletePopUp2(true);
      console.log("clean user");
      setDialogMessage("Bent u zeker dat u deze wenst te verwijderen?");
      //setOpenDeletePopUp1(true);

      return (
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={openDeletePopUp2}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Gebruiker verwijderen?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>Bent u zeker?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {}}>Annuleer</Button>
              <Button
                onClick={() => {}
                  // handleDelete(
                  //   user_id,
                  //   filteredAssignedSeats,
                  //   filteredReservations
                  // )
                }
                autoFocus
              >
                bevestig
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    /*if (window.confirm("Bent u zeker?")) {
        axios.delete(
          `https://reservation-api.azurewebsites.net/api/user/Delete/${id}`
        );
        console.log(id);
      } 
      else {
        alert("geannuleerd");
      }*/

      hasAssignedSeat = false;
      hasReservations = false;
  };

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.row}>
            <th className={styles.column}>
              <p>Voornaam</p>
            </th>
            <th className={styles.column}>
              <p>Achternaam</p>
            </th>
            <th className={styles.column}>
              <p>User Id</p>
            </th>
            <th className={styles.column}>
              <p>User email</p>
            </th>
            <th className={styles.column}></th>
          </tr>
          {userList.map((user: IUser) => {
            return (
              <tr key={user.id} className={styles.row}>
                <td className={styles.item}>
                  <p>{user.firstName}</p>
                </td>
                <td className={styles.item}>
                  <p>{user.lastName}</p>
                </td>
                <td className={styles.item}>
                  <p>{user.id}</p>
                </td>
                <td className={styles.item}>
                  <p>{user.email}</p>
                </td>
                <td className={styles.button}>
                  <Button onClick={() => {
                      setUserID(user.id);                    
                      handlePopUp(user.id);
                    } }>
                    
                    <p>Delete user</p>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {
        openDeletePopUp1 && <DialogPopUp dialogMessage={dialogMessage} handleFunction={handleDelete} secondButton={openDeletePopUp2} />
      }
      {
        openDelete && <DialogPopUp dialogMessage={dialogMessage} secondButton={openDeletePopUp2} />
      }
      
    </div>
  );
};
