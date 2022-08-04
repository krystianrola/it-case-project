import Button from '@mui/material/Button/Button';
import React from "react";
import styles from "./dashItem.module.css";

interface DashItemProps{
    buttonName :string 
}

const DashItem = ({buttonName}: DashItemProps) =>{
    return(
        <div>
            <Button variant="outlined" className={styles.buttons} >
                {buttonName}
            </Button>
        </div>
    );
}

export { DashItem }  