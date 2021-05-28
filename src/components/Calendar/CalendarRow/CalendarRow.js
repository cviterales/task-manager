import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./style.module.scss";
import PropTypes from "prop-types";

import AnimatedListItem from "../../Animations/AnimatedListItem/AnimatedListItem";
import CalendarTask from "../CalendarTask/index";
import moment from "moment";
import "moment/locale/es";

const CalendarRow = ({ day, team, editHandler, handleDrag, handleDrop }) => {
  const [pos, setPost] = useState();
  const rowRef = useRef(null);

  const dayDateNow = useMemo(() => moment().locale("ES").format("DD/MM/YYYY"), []);

  useEffect(() => {
    setPost(rowRef.current.getBoundingClientRect());
  }, []);

  return (
    <div
      ref={rowRef}
      className={day.isMonth ? styles.rows : styles.rows_false}
      onDrop={() => handleDrop(day, team)}
      onDragOver={(ev) => ev.preventDefault()}
    >
      {day.tasks.map((task, index) => {
        const dayTaskDate = moment(task.date, "DD/MM/YYYY").locale("ES").format("DD/MM/YYYY");
        return team.id_team === task.id_team && task.date === day.day ? (
          <div key={index} style={dayDateNow > dayTaskDate ? { opacity: "0.5" } : {}}>
            <AnimatedListItem index={index} delay={0.15}>
              <CalendarTask
                task={task}
                onEdit={editHandler}
                draggable={dayDateNow > dayTaskDate ? false : true}
                parentPos={pos}
                handleDrag={handleDrag}
              />
            </AnimatedListItem>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

CalendarRow.propTypes = {
  day: PropTypes.object,
  team: PropTypes.object,
  editHandler: PropTypes.func,
  handleDrag: PropTypes.func,
  handleDrop: PropTypes.func,
};
export default CalendarRow;
