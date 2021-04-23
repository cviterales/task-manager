import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import PropTypes from "prop-types";

import Spinner from "../Spinner/index";
import Status from "../Status/index";
import Button from "../Button/index";
import DropDown from "../DropDown/index";
import { getStatus, getStatusTask, createStatusTask } from "../../api/index";
import Message from "../Message/index";

const TaskStateModal = ({ onClose, task }) => {
  const [states, setStates] = useState([]);
  const [statusTask, setStatusTask] = useState([]);
  const [newState, setNewState] = useState(0);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const onSaveHandler = async () => {
    if (newState) {
      setLoading(true);
      const res = await createStatusTask(task.id_calendar, newState);
      setLoading(false);
      setMessage(res);
    } else {
      setMessage({ error: true, message: "Seleccione Estado" });
    }
    /*     setTimeout(() => {
      setMessage();
    }, 6000); */
  };

  const renderStatus = () => {
    return statusTask.map((el, i) => {
      const formatedDate = new Date(el.date).toLocaleString("es-ES", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
      const date = el.status + " " + formatedDate + " " + el.time;
      return (
        <li className={styles.m_v} key={i + el.description}>
          <Status name={date} description={el.description} />
        </li>
      );
    });
  };

  useEffect(() => {
    const filterStates = async () => {
      const allStates = await getStatus();
      const taskStates = await getStatusTask(task.id_task);
      setStatusTask(taskStates);
      setStates(allStates);
      /*       const filteredState = allStates.filter((e) => !taskStates.find(({ status }) => e.name === status));
      setStates(filteredState); */
      /*       if (task.last_state_description === "Finalizado") {
        setStates([]);
      } */
    };
    filterStates();
  }, [task, message]);

  return (
    <div className={styles.container}>
      <ul className={styles.status_container}>
        {statusTask.length > 0 ? renderStatus() : <Spinner />}
      </ul>
      <div className={styles.m_v}>
        <h5 className={styles.m_v}>Nuevo</h5>
        <DropDown
          data={states}
          onChange={(e) => setNewState(e.target.value)}
          selectedValue={newState}
        />
      </div>
      <div className={styles.bottom}>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <Button
              type="button"
              variant="blue"
              onClick={() => onSaveHandler()}
            >
              <p>Guardar</p>
            </Button>
          )}
        </div>
        <div>
          <Button type="button" variant="outline" onClick={() => onClose()}>
            <p>Cancelar</p>
          </Button>
        </div>
      </div>
      {message && (
        <div className={styles.message}>
          <Message
            type={message.error ? "error" : "success"}
            message={message.message}
          />
        </div>
      )}
    </div>
  );
};

TaskStateModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default TaskStateModal;
