import React, { useContext } from "react";
import { UserContext } from "../../components/Context/UserContext"; 
import { DashItem } from "../../components/Dashboard/dashItem"; 
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

const HomeDashboard = () => {
  let { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Link to={`/make-reservation`}>
        <DashItem buttonName={"Maak een reservatie"} />
      </Link>
      <Link to={`/my-reservations`}>
        <DashItem buttonName={"Mijn reservaties"} />
      </Link>
      {user.isAdmin && (
        <Link to={`/settings`}>
          <DashItem buttonName={"Instellingen"} />
        </Link>
      )}
    </div>
  );
};

export { HomeDashboard };
