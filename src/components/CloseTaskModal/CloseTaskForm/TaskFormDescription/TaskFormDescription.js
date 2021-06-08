import React, { useState } from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDescription, updateStep, setTimeWorked } from "../../../../store/actions/closeTask/closeTask";
import Button from "../../../Button";
import { useForm } from "react-hook-form";
import Message from "../../../Message";
import InputText from "../../../InputText";

const TaskFormDescription = () => {
  const description = useSelector((state) => state.closeTask.description);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [inputData, setInputData] = useState({
    start: "",
    finish: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlerInput = (e) => {
    const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(e.target.value);
    if (!isValid) {
      setError(true);
    } else {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
      setError(false);
    }
  };

  const onSubmit = (data) => {
    dispatch(setDescription(data.description));
    dispatch(setTimeWorked(inputData.start, inputData.finish))
    dispatch(updateStep("next"));
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.content}>
        <h3 className={styles.boldText}>Descripcion</h3>
        <label>
          Tarea realizada
          <textarea
            placeholder={description ? description : "Descripcion..."}
            className={styles.description}
            {...register("description", { required: true, minLength: 4 })}
          />
        </label>
        <h3 className={styles.boldText}>Horas Trabajadas</h3>
        <div className={styles.content_input}>
          <div className={styles.input}>
            <InputText name="start" type="time" label="Inicio" onChange={(e) => handlerInput(e)} max="24:00" required />
          </div>
          <div className={styles.input}>
            <InputText name="finish" type="time" label="Fin" onChange={(e) => handlerInput(e)} max="24:00" required />
          </div>
        </div>
      </div>
      <div>
        {(errors.description || error) && <Message type="error" message="Debe completar todos los campos" />}
        <div className={styles.bottom}>
          <Button type="submit" variant="blue" onClick={() => {}}>
            Siguiente
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TaskFormDescription;
