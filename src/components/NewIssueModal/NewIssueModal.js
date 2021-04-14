import React, { useState } from "react";
import styles from "./style.module.scss";

import Button from "../Button/index";
import Message from "../Message/index";
import Spinner from "../Spinner";

const NewIssueModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const onSaveHandler = async (description) => {
    if (description.length < 4) {
      setError(true);
      setMessage("Caracteres insuficientes");
    } else {
      setLoading(true);
      const res = await onSave(description);
      res.error ? setError(true) : setError(false);
      setMessage(res.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal_wrapper}>
      <textarea
        className={styles.description}
        placeholder="Descripcion.."
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className={styles.bottom}>
        <div style={{ marginInline: "1rem" }}>
          <Button
            type="button"
            variant="blue"
            onClick={() => onSaveHandler(description)}
          >
            {loading ? <Spinner /> : <p>Guardar</p>}
          </Button>
        </div>
        <div style={{ marginInline: "1rem" }}>
          <Button type="button" variant="outline" onClick={onClose}>
            <p>Cancelar</p>
          </Button>
        </div>
      </div>
      {message && (
        <Message type={error ? "error" : "success"} message={message} />
      )}
    </div>
  );
};

export default NewIssueModal;
