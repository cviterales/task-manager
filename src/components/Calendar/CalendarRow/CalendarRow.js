import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import AnimatedListItem from "../../Animations/AnimatedListItem/AnimatedListItem";
import CalendarTask from "../CalendarTask/index";

const CalendarRow = ({ day, team, editHandler, handleDrag, handleDrop }) => {
  const [pos, setPost] = useState();
  const rowRef = useRef(null);

  useEffect(() => {
    setPost(rowRef.current.getBoundingClientRect());
  }, []);

  return (
    <div ref={rowRef} className={day.isMonth ? styles.rows : styles.rows_false} onDrop={() => handleDrop(day, team)} onDragOver={(ev) => ev.preventDefault()}>
      {day.tasks.map((task, index) => {
        return team.id_team === task.id_team && task.date === day.day ? (
          <div
            key={index}
            draggable={true}
            onDragOver={(ev) => ev.preventDefault()}
            onDragStart={() => handleDrag(task)}
          >
            <AnimatedListItem index={index}  delay={0.15}>
              <CalendarTask task={task} onEdit={editHandler} parentPos={pos} />
            </AnimatedListItem>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default CalendarRow;
