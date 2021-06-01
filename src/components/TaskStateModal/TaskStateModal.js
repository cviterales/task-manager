import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es";

import Spinner from "../Spinner/index";
import Status from "../Status/index";
import Button from "../Button/index";
import DropDown from "../DropDown/index";
import { getStatus, getStatusTask, createStatusTask } from "../../api/index";
import Message from "../Message/index";

import * as actions from '../../store/actions/message/action'
import { useDispatch } from "react-redux";

const TaskStateModal = ({ onClose, task }) => {
  const dispatch = useDispatch()
  const [states, setStates] = useState([]);
  const [statusTask, setStatusTask] = useState([]);
  const [newState, setNewState] = useState(0);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const onSaveHandler = async () => {

    if (newState) {
      setLoading(true);
      const res = await createStatusTask(task.id_calendar, newState);
      dispatch(actions.setMessage(res.message, res.error))
      setLoading(false);
      setMessage(res);
    } else {
      setMessage({ error: true, message: "Seleccione Estado" });
    }
  };

  const renderStatus = () => {
    return statusTask.map((el, i) => {
      const formatedDate = moment(el.date)
      .locale("ES")
      .format("DD/MM/YYYY")
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
      const filteredState = allStates.filter((e) => !taskStates.find(({ status }) => e.name === status));
      const finish = taskStates.find((status) => status.status === "Finalizado")
      setStates(filteredState);
      if (finish) {
        setStates([]);
        setNewState(0)
      }
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
