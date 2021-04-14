import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import DropDown from "../DropDown/index";
import Button from "../Button";
import Message from "../Message/index";
import { useSelector } from "react-redux";
import { getProblems, getTaskTypes } from "../../api/index";

const NewTaskModal = ({ id, sid, serviceType, onClose, onSave }) => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  let timeout;

  const [taskType, setTaskType] = useState(0);
  const [idProblem, setIdProblem] = useState(1);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [taskProblems, setTaskProblems] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [message, setMessage] = useState();

  const textHandler = (e) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setDescription(e.target.value);
    }, 500);
  };

  useEffect(() => {
    getTaskTypes().then((res) => setTaskTypes(res));
    getProblems(id_service, "", serviceType, "").then((res) =>
      setTaskProblems(res)
    );
  }, [id_service, serviceType]);

  const saveHandler = async () => {
    try {
      const res = await onSave(
        id_service,
        sid,
        taskType,
        idProblem,
        description
      );
      res.error ? setError(true) : setError(false);
      setMessage(res.message);
    } catch (err) {
      setMessage(err.message);
      setError(true);
    }
    setTimeout(() => {
      setMessage();
    }, 6000);
  };

  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.header}>
        <h3>
          <span className={styles.boldText}>Cliente</span> #{id}
        </h3>
        {sid && (
          <h4>
            <span className={styles.boldText}>Subcuenta</span> #{sid}
          </h4>
        )}
      </div>

      <textarea
        className={styles.description}
        placeholder="Descripcion.."
        onChange={(e) => textHandler(e)}
      ></textarea>
      <div className={styles.select}>
        <div className={styles.label}>
          <h4>Tarea</h4>
          <DropDown
            data={taskTypes}
            onChange={(e) => {
              setTaskType(e.target.value);
            }}
            selectedValue={taskType}
          />
        </div>
        <div className={styles.label}>
          <h4>Inconveniente</h4>
          <DropDown
            data={taskProblems}
            onChange={(e) => {
              setIdProblem(e.target.value);
            }}
            selectedValue={idProblem}
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={() => saveHandler()}>
          <p>Guardar</p>
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          <p>Cancelar</p>
        </Button>
      </div>
      {message && (
        <Message type={error ? "error" : "success"} message={message} />
      )}
    </div>
  );
};

export default NewTaskModal;
