import React from "react"
import styles from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { updateStep } from "../../../../store/actions/closeTask/closeTask"
import Button from "../../../Button"
import EcolanFormData from "./EcolanFormData/EcolanFormData"
import TelefoniaFormData from "./TelefoniaFormData/TelefoniaFormData"

const TaskFormData = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  let render

  switch (user.id_service) {
    case 1:
      render = <EcolanFormData />
      break
    case 2:
      render = <TelefoniaFormData />
      break
    default:
      break
  }

  return (
    <form className={styles.wrapper} onSubmit={() => dispatch(updateStep("next"))}>
      {render}
      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={() => dispatch(updateStep())}>
          Atras
        </Button>
        <Button type="submit" variant="blue" onClick={() => {}}>
          Siguiente
        </Button>
      </div>
    </form>
  )
}

export default TaskFormData
