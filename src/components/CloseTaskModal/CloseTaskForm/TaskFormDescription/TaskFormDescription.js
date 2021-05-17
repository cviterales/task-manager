import React from "react"
import styles from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { setDescription, updateStep } from "../../../../store/actions/closeTask/closeTask"
import Button from "../../../Button"
import { useForm } from "react-hook-form"
import Message from "../../../Message"

const TaskFormDescription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    dispatch(setDescription(data.description))
    dispatch(updateStep("next"))
  }

  const description = useSelector((state) => state.closeTask.description)
  const dispatch = useDispatch()

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className={styles.boldText}>Descripcion</h3>
        <label>
          Tarea realizada
          <textarea
            placeholder={description ? description : "Descripcion..."}
            className={styles.description}
            {...register("description", { required: true, minLength: 4 })}
          />
        </label>
      </div>
      <div>
        {errors.description && <Message type="error" message="Descripcion requerida" />}
        <div className={styles.bottom}>
          <Button type="submit" variant="blue" onClick={() => {}}>
            Siguiente
          </Button>
        </div>
      </div>
    </form>
  )
}

export default TaskFormDescription
