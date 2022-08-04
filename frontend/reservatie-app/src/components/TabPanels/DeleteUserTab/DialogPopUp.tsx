import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { IAssignedSeats, IReservation } from "../../../types";

interface DialogPopUpProps {
  dialogMessage: string;
  handleFunction?: () => void;
  secondButton: boolean;
}

export const DialogPopUp = ({ dialogMessage, handleFunction, secondButton }: DialogPopUpProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const [openDeletePopUp1, setOpenDeletePopUp1] = useState<boolean>(true);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setOpenDeletePopUp1(false);
    if (handleFunction !== undefined) handleFunction();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDeletePopUp1}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Gebruiker verwijderen?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText> {dialogMessage} </DialogContentText>
      </DialogContent>
      <DialogActions>
        {secondButton && (
          <Button
            onClick={() => {
              setOpenDeletePopUp1(false);
            }}
          >
            Annuleer
          </Button>
        )}
        <Button
          // onClick={() => handleDelete( id, filteredAssignedSeats, filteredReservations ) }
          onClick={handleClick}
        >
          Bevestig
        </Button>
      </DialogActions>
    </Dialog>
  );
};
