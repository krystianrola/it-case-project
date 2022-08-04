import React from "react";
import styles from "./NotFound.module.css";

export const UserNotFound = () => { 
    return(
        <div className={styles.container}>
            <img src="404notfound.jpg" alt="404 not found" className={styles.imageStyle}/>
            <h3 className={styles.title}>User Not Found</h3>
            <p>It appears you are not registered</p>
            <h3>Contact your admin </h3>
        </div>
    );
}