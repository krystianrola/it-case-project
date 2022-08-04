import React, { useState } from "react";
import axios from "axios";
import { IUser, IAssingedSeat, IIsAdmin, ILanguages } from "../../../types";
import {
  Box,
  Typography,
  Divider,
  TextField,
  FormControl,
  MenuItem,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  boxStyle,
  titleStyle,
  textFieldsStyle,
  dividerStyle,
  buttonStyle,
} from "./AddUserPanelStyling";
import {UserNotification} from "../../UserNotification/UserNotification";


interface AddUserTabProps {
  title: string;
}

const languages: ILanguages[] = [
  {
    value: "NL",
  },
  {
    value: "ENG",
  },
];

const IsAdmin: IIsAdmin[] = [
  {
    value: false,
    label: "Nee",
  },
  {
    value: true,
    label: "Ja",
  },
];

const assignedSeat: IAssingedSeat[] = [
  {
    value: false,
    label: "Nee",
  },
  {
    value: true,
    label: "Ja",
  },
];

export const AddUserTab = ({ title }: AddUserTabProps) => {
  const [userID, setUserID] = useState<string>("not provided");
  const [firstName, setFirstName] = useState<string>("not provided");
  const [lastName, setLastName] = useState<string>("not provided");
  const [email, setEmail] = useState<string>("not provided");
  const [language, setLanguage] = useState<ILanguages>(languages[0]);
  const [isAdmin, setIsAdmin] = useState<IIsAdmin>(IsAdmin[0]);
  const [hasAssignedSeat, setHasAssignedSeat] = useState<IAssingedSeat>(
    assignedSeat[0]
  );
  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] =
    useState<string>("Some message");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  //errors
  const [emailError, setEmailError] = useState<boolean>(false);

  const handleValidationUserID = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserID(event.target.value);
  };

  const handleValidationEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailError(false);
    let reg = new RegExp(
      /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    ).test(event.target.value);
    if (!reg) {
      setEmailError(true);
      return;
    }
    setEmail(event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    languages.map((option: ILanguages) => {
      if (option.value === event.target.value) setLanguage(option);
      return null;
    });
  };

  const handleIsAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    IsAdmin.map((option: IIsAdmin) => {
      if (option.label === event.target.value) setIsAdmin(option);
      console.log(option.value);
      return null;
    });
  };

  const handleAssignedSeatChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    assignedSeat.map((option: IAssingedSeat) => {
      if (option.label === event.target.value) setHasAssignedSeat(option);
      return null;
    });
  };

  const AddUserToDatabase = (newuser: IUser) => {
    axios
      .post("https://reservation-api.azurewebsites.net/api/user/add", newuser)
      .then((data) => {
        console.log("USER ADDED");
        setNotification(true);
        setErrorMessage(false);
        setNotificationMessage("Gebruiker was succesvol toegevoegd.");
      })
      .catch((err) => {
        console.log("USER NOT ADDED");
        setNotification(true);
        setErrorMessage(true);
        setNotificationMessage("Gebruiker niet toegevoegd.");
      });
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // todo : if errors - button red cancel add user
    let newUser: IUser = {
      id: userID,
      firstName: firstName,
      lastName: lastName,
      isAdmin: isAdmin.value,
      email: email,
      languageUse: language.value,
      hasAssingedSeat: hasAssignedSeat.value,
    };
    if (!emailError) {
      AddUserToDatabase(newUser);
    }
  };

  return (
    <Box sx={boxStyle}>
     {notification && (
        <UserNotification
          notificationMessage={notificationMessage}
          errorMessage={errorMessage}
        />
      )}
      <Typography sx={titleStyle}>{title}</Typography>
      <FormControl variant="standard">
        <TextField
          id="outlined-textarea-username"
          label="User ID"
          inputProps={{ maxLength: 36 }}
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          sx={textFieldsStyle}
          onChange={handleValidationUserID}
          // error={userNameError}
        />
        <TextField
          id="outlined-textarea-firstname"
          label="Voornaam"
          inputProps={{ maxLength: 45 }}
          sx={textFieldsStyle}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          //error
        />
        <TextField
          id="outlined-textarea-lastname"
          label="Achternaam"
          inputProps={{ maxLength: 45 }}
          sx={textFieldsStyle}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          //error
        />
        <TextField
          id="outlined-textarea-email"
          label="E-mail"
          inputProps={{ maxLength: 45 }}
          sx={textFieldsStyle}
          onChange={handleValidationEmail}
          error={emailError}
        />
        <TextField
          id="outlined-select-language"
          select
          label="Language"
          sx={textFieldsStyle}
          value={language.value}
          onChange={handleLanguageChange}
        >
          {languages.map((option: ILanguages) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-isAdmin"
          select
          label="Is Admin"
          sx={textFieldsStyle}
          value={isAdmin.label}
          onChange={handleIsAdminChange}
          //helperText="Is the user an admin"
        >
          {IsAdmin.map((option: IIsAdmin) => (
            <MenuItem key={option.label} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-hasAssignedSeat"
          select
          label="Has Assigned Seat"
          sx={textFieldsStyle}
          value={hasAssignedSeat.label}
          onChange={handleAssignedSeatChange}
        >
          {assignedSeat.map((option: IAssingedSeat) => (
            <MenuItem key={option.label} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <Divider sx={dividerStyle} />
      <Button
        variant="outlined"
        // color="error"
        sx={buttonStyle}
        endIcon={<SendIcon />}
        onClick={handleClick}
      >
        Gebruiker aanmaken
      </Button>
    </Box>
  );
};
