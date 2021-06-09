import React, { useMemo, useState } from "react";

import style from "./style.module.scss";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHardHat } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";
import "moment/locale/es";
import Modal from "../Modal/index";
import CalendarRow from "./CalendarRow/CalendarRow";
import AssignTask from "./AssignTask/index";
import TaskStateModal from "../TaskStateModal/TaskStateModal";

const Calendar = ({ calendar, week, teams, updateCalendar }) => {
  const [task, setTask] = useState({});
  const [show, setShow] = useState(false);
  const [drag, setDrag] = useState();

  const editHandler = (task, type) => {
    setShow(true);
    const selectedTask = { ...task, action_type: type };
    setTask(selectedTask);
  };

  const closeModalHandler = () => {
    setShow(false);
  };

  let renderContent = null;

  if (task.action_type && task.action_type === "assign") {
    renderContent = <AssignTask task={task} onClose={closeModalHandler} />;
  }

  if (task.action_type && task.action_type === "status") {
    renderContent = <TaskStateModal task={task} onClose={closeModalHandler} />;
  }

  const handleDrag = (task) => {
    setDrag(task);
  };

  const handleDrop = (day, team) => {
    updateCalendar(day, drag, team);
  };

  const renderCalendar = (teams, calendar) => {
    return teams.map((team, index) => {
      return (
        <div key={index} className={style.rows_team}>
          <div className={style.team}>
            <p>Team {team.id_team}</p>
          </div>
          {calendar[week].map((day, index) => {
            return (
              <CalendarRow
                key={index}
                team={team}
                day={day}
                editHandler={editHandler}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
              />
            );
          })}
        </div>
      );
    });
  };

  const dayDate = useMemo(() => moment().format("DD/MM/YYYY"), [])

  const renderCalendarHeader = () => {
    return calendar[week].map((day, index) => {
      return (
        <div key={index} className={style.calendar_header}>
          <div className={style.day_now_content}>
            <h2 className={day.day === dayDate ? style.day_now : ""}>
              {day.dayNumber}
            </h2>
          </div>
          <h3>{day.dayName}</h3>
          <p>{day.monthName}</p>
        </div>
      );
    });
  };

  let loadedCalendar = null; //<Spinner />;
  if (calendar.length > 0 && teams.length > 0) {
    loadedCalendar = (
      <>
        <div className={style.container_header}>
          <div className={style.header}>
            <FontAwesomeIcon icon={faHardHat} size="2x" color="white" />
          </div>
          <div className={style.calendar}>{renderCalendarHeader()}</div>
        </div>
        <div className={style.container}>
          <div className={style.grid_content}>
            {renderCalendar(teams, calendar)}
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {show && (
        <Modal
          title={
            task.action_type && task.action_type === "assign"
              ? "Editar Asignación"
              : "Nuevo Estado"
          }
          onClose={() => {
            setShow(false);
          }}
        >
          {renderContent}
        </Modal>
      )}

      {loadedCalendar}
    </div>
  );
};

Calendar.propTypes = {
  calendar: PropTypes.array,
  week: PropTypes.number, 
  teams: PropTypes.array, 
  updateCalendar: PropTypes.func
}

export default Calendar;
