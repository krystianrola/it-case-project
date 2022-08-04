import axios from "axios";
import React, { useEffect, useState } from "react";
import { IWorkplace } from "../../../types";
import styles from "./Workplace.module.css";

interface props {
  handleChangeWorkplace: (workPlaceID: number) => void 
}

const Workplace = ({ handleChangeWorkplace }: props) => {
  const [workplace, setWorkplace] = useState<IWorkplace[]>();

  useEffect(() => {
    axios
      .get<IWorkplace[]>("https://reservation-api.azurewebsites.net/api/workplace/get")
      .then((res) => {
        setWorkplace(res.data);
        handleChangeWorkplace(res.data[0].id || 1);
      });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = ( event ) => {
    handleChangeWorkplace(parseInt(event.target.value));
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Kies een werkplek :</p>
      <select name="Workplaces" id="" onChange={handleChange} className={styles.selectItem}>
        {workplace?.map((workplace: IWorkplace) => {
          return (
            <option value={workplace.id} key={workplace.id} className={styles.optionItem}>
              {workplace.workplaceName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Workplace;
