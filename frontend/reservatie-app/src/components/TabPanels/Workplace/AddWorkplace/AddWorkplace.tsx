import React, { useState } from "react";
import {
  IconButton,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { IWorkplace } from "../../../../types";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import axios from "axios";
import styles from "./AddWorkplace.module.css";
import {UserNotification} from "../../../UserNotification/UserNotification";

const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader : FileReader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const AddWorkplace = () => {
  const [workplaceNameValue, setWorkplaceNameValue] = useState<string>("Not Provided");
  const [capacityValue, setCapacityValue] = useState<number>(0);
  const [streetAdressValue, setStreetAdressValue] = useState<string>("Not Provided");
  const [cityValue, setCityValue] = useState<string>("Not Provided");
  const [countryValue, setCountryValue] = useState<string>("Not Provided");
  const [zipcodeValue, setZipcodeValue] = useState<number>(0);
  const [floorNumberValue, setFloorNumberValue] = useState<number>(0);

  const [imageName, setImageName] = useState<string>("Select your office layout here.");
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageBase64string, setImageBase64string] = useState<string>("Not Provided");

  const [notification, setNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("Some message");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handleConvertToBase64 = async (file : any) => {
    setImageBase64string((await convertToBase64(file!)) as string);
  };
  
  const handleImageInputChange: React.ChangeEventHandler<HTMLInputElement> = ( event ) => {
    setImageName(event.target.files![0].name);
    setImageUploaded(true);

    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files![0]));
    }

    handleConvertToBase64(event.target.files![0]);
  };

  const AddWorkplaceReservationRules = (workplaceID: number) => {
    axios
     .post('https://reservation-api.azurewebsites.net/api/reservationrules/add', {
        workplaceId: workplaceID,
        maxReservationPeriod: 5,
        maxReservations: 5,
        minAnnulationTime: 5
     });
  }

  const handleAddToDatabase: React.MouseEventHandler<HTMLButtonElement> = ( event ) => {
    
    let newWorkplace: IWorkplace = {
      workplaceName: workplaceNameValue,
      maxUsers: capacityValue,
      companyId: 1,
      streetAdress: streetAdressValue,
      city: cityValue,
      country: countryValue,
      zipcode: zipcodeValue,
      floorNumber: floorNumberValue,
      plattegrond: imageBase64string,
    };

    console.log(newWorkplace)

    axios
      .post(
        "https://reservation-api.azurewebsites.net/api/workplace/add",
        newWorkplace
      )
      .then((response) => {
        AddWorkplaceReservationRules(response.data.id);
        setNotificationMessage("Werkplek succesvol toegevoegd.")
        setNotification(true);
        setErrorMessage(false);
      })
      .catch((e) => {
        setNotificationMessage("Werkplek niet toegevoegd.")
        setNotification(true);
        setErrorMessage(true);
      });

      
  };

  return (
    <div className={styles.container}>
      {notification && (
        <UserNotification
          notificationMessage={notificationMessage}
          errorMessage={errorMessage}
        />
      )}
      <div className={styles.inputFieldImageContainer}>
        <div className={styles.inputFields}>
          <TextField
            id="outlined-textarea-workplacename"
            label="Werkpleknaam"
            required={true}
            inputProps={{ maxLength: 45 }}
            placeholder="Werkpleknaam"
            // sx={textFieldsStyle}
            onChange={(event) => {setWorkplaceNameValue(event.target.value)}}
            // error={userNameError}
          />
          <TextField
            id="outlined-textarea-capacity"
            label="Maximum capaciteit"
            inputProps={{ maxLength: 4 }}
            placeholder="Maximum capaciteit"
            // sx={textFieldsStyle}
            onChange={(event) => {setCapacityValue(Number(event.target.value))}}
            // error={userNameError}
          />
          <TextField
            id="outlined-textarea-streetAdress"
            label="Straat"
            inputProps={{ maxLength: 45 }}
            placeholder="Straat"
            // sx={textFieldsStyle}
            onChange={(event) => {setStreetAdressValue(event.target.value)}}
            // error={userNameError}
          />
          <TextField
            id="outlined-textarea-city"
            label="Stad"
            inputProps={{ maxLength: 45 }}
            placeholder="Stad"
            // sx={textFieldsStyle}
            onChange={(event) => {setCityValue(event.target.value)}}
            // error={userNameError}
          />
          <TextField
            id="outlined-textarea-country"
            label="Land"
            inputProps={{ maxLength: 45 }}
            placeholder="Land"
            // sx={textFieldsStyle}
            onChange={(event) => {setCountryValue(event.target.value)}}
            // error={userNameError}
          />
          <TextField
            id="outlined-textarea-zipcode"
            label="Zipcode"
            inputProps={{ maxLength: 4 }}
            placeholder="Zipcode"
            // sx={textFieldsStyle}
            onChange={(event) => {setZipcodeValue(Number(event.target.value))}}
            // error={userNameError}
          />
          <TextField
            id="outlined-textarea-floorNumber"
            label="Verdieping"
            inputProps={{ maxLength: 4 }}
            placeholder="verdieping"
            // sx={textFieldsStyle}
            onChange={(event) => {setFloorNumberValue(Number(event.target.value))}}
            // error={userNameError}
          />
        </div>
        <div className={styles.imageUploader}>
          <label htmlFor="upload-image-area" className={styles.imageLabel}>
            <input
              type="file"
              id="upload-image-area"
              name="upload-image-area"
              accept="image/*"
              onChange={handleImageInputChange}
              style={{ display: "none" }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <FileUploadOutlinedIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: "1rem" }}>
              {imageName}
            </Typography>
          </label>
          {imageUploaded && ( 
              <img
                src={imageUrl}
                alt="Not Provided"
                className={styles.imageStyle}
              />
            )}
        </div>
      </div>
      <Button
        variant="outlined"
        onClick={handleAddToDatabase}
        sx={{width: '50%', margin: '2% auto'}}
      >
        Werkplek toevoegen
      </Button>
    </div>
  );
};
