import { DataGrid, GridColDef, nlNL } from "@mui/x-data-grid"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ILogTable } from "../../types";
import styles from "./LogTabel.module.css"




const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      headerAlign: "center",
    },
    {
      field: "logDate",
      headerName: "Datum",
      headerAlign: "center"
    },
    {
      field: "logTime",
      headerName:"Tijdstip",
      headerAlign:"center"

    },
    {
      field: "usersId",
      headerName:"gebruiker",
      headerAlign:"center"
    },
    {
      field: "reservationId",
      headerName:"reservatie Id",
      headerAlign:"center"
    },
    {
      field: "seatId",
      headerName:"Stoel Id",
      headerAlign:"center"
    },
    {
      field: "workplaceId",
      headerName:"werkplek Id",
      headerAlign:"center"
    },
    {
      field: "companyId",
      headerName:"bedrijf Id",
      headerAlign:"center"
    },
    {
      field: "logAction",
      headerName:"actie",
      headerAlign:"center",
      width:400
      
    }
    
  ];



const LogTabel = () =>{


    const [logTabel, setLogTabel] = useState<ILogTable[]>([]);

    useEffect(() => {
      axios
        .get("https://reservation-api.azurewebsites.net/api/LogTable/get")
        .then((res) => {
          setLogTabel(res.data);
        });
    }, []);

    

    return(
      <div className={styles.container}>
        <div style={{flexGrow:1, width:'100%'}}>
            <DataGrid
            localeText={nlNL.components.MuiDataGrid.defaultProps.localeText}
            rows={logTabel}
            columns={columns}
            disableSelectionOnClick
            disableColumnMenu
            disableDensitySelector
            disableColumnSelector
            />
        </div>
      </div>
    )
}

export default LogTabel