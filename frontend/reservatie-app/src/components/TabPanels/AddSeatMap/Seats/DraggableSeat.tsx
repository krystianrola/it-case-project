import React from "react";
import Draggable, { DraggableData } from "react-draggable";
import styles from "./DraggableSeat.module.css";
import { IDraggableSeat } from "../AddSeatMap";

interface AddSeatProps {
  seat: IDraggableSeat;
  handleChange : () => void
}

export const AddDraggableSeat = ({ seat, handleChange }: AddSeatProps) => {

  const handlePosition = (data: DraggableData) => {
    seat.coordinateX = Math.floor(data.x) + 5;
    seat.coordinateY = Math.floor(data.y) + 5;
    handleChange();
  };

  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      onStop={(e, data) => handlePosition(data)}
    >
      <div className={styles.drag}></div>
    </Draggable>
  );
};
