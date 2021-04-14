import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Button from "../Button/index";
import Message from "../Message/index";

const NewIssueModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();
  let time;
  const onSaveHandler = async (description) => {
    if (description.length < 4) {
      setError(true);
      setMessage("Caracteres insuficientes");
    } else {
      const res = await onSave(description);
      res.error ? setError(true) : setError(false);
      setMessage(res.message);
    }
    time = setTimeout(() => {
      setMessage();
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(time)
    }
  }, [])

  return (
    <div className={styles.modal_wrapper}>
      <textarea
        className={styles.description}
        placeholder="Descripcion.."
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className={styles.bottom}>
        <div style={{ marginInline: "1rem" }}>
          <Button type="button" variant="blue" onClick={() => onSaveHandler(description)}>
            <p> Guardar</p>
          </Button>
        </div>
        <div style={{ marginInline: "1rem" }}>
          <Button type="button" variant="outline" onClick={onClose}>
            <p>Cancelar</p>
          </Button>
        </div>
      </div>
      {message && <Message type={error ? "error" : "success"} message={message} />}
    </div>
  );
};

export default NewIssueModal;
