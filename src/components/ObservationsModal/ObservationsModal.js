import React, { useState } from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Message from "../Message";
import Spinner from "../Spinner";
import styles from "./styles.module.scss";

const ObservationsModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    load: false,
    error: false,
    message: "",
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const onSaveHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (description.length > 4) {
      onSave(description, important)
      .then((res) => {
        setError({
          load: true,
          error: res.error,
          message: res.message,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError({
          load: true,
          error: true,
          message: "Ocurrio un error!",
        });
        setLoading(false);
      });
    } else {
      setError({
        load: true,
        error: true,
        message: "Caracteres insuficientes",
      });
      setLoading(false);
    }
    

  };

  return (
    <form data-testid="form" onSubmit={(e) => onSaveHandler(e)}>
      <div className={styles.content}>
        <textarea
          minLength={4}
          placeholder="Descripcion..."
          className={styles.description}
          value={description}
          onChange={(e) => {
            inputHandler(e);
          }}
        />
        <Checkbox
          label="Es importante"
          name="important"
          check={important}
          onChange={() => {
            setImportant(!important);
          }}
        />
      </div>
      <div className={styles.buttom}>
        <Button variant="dark" type="submit" onClick={() => {}}>
          {loading ? <Spinner /> : <p>Guardar</p>}
        </Button>
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <p>Cancelar</p>
        </Button>
      </div>
      {error.load && (
        <Message
          type={error.error ? "error" : "success"}
          message={error.message}
        />
      )}
    </form>
  );
};

export default ObservationsModal;
