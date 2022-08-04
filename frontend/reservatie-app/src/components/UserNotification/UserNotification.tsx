import React from "react"
import styles from "./UserNotification.module.css";

interface UserNotificationProps { 
    notificationMessage:string;
    errorMessage: boolean;
}


export const UserNotification = ({notificationMessage, errorMessage}: UserNotificationProps) => {

    return(
        <div className={
            errorMessage 
            ? `${styles.notification_Container} ${styles.notification_Container_red}`
            : `${styles.notification_Container} ${styles.notification_Container_green}` 
          }>
            <p className={styles.notification_Message}> 
              {notificationMessage}
            </p>
          </div>
    )
}