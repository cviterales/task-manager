import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeTask } from "../../../../api"
import { updateStep } from "../../../../store/actions/closeTask/closeTask"
import Button from "../../../Button"
import Signature from "../../../Signature/Signature"
import styles from "./style.module.scss"

const TaskFormSignature = ({ onClose }) => {
  const closeTaskData = useSelector((state) => state.closeTask)
  const task = useSelector((state) => state.task.task)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const saveTaskHandler = () => {
    closeTask(
      user.id_service,
      task.id,
      task.id_account,
      task.id_task_type,
      task.id_calendar,
      closeTaskData.description,
      closeTaskData.id_node,
      closeTaskData.fo,
      closeTaskData.dslam.id_port,
      closeTaskData.equipment_updated,
      closeTaskData.equipment_recovered,
      closeTaskData.materials,
      closeTaskData.technical_data,
      closeTaskData.time_start,
      closeTaskData.time_finish,
      closeTaskData.signature
    ).then((res) => {
      onClose()
    })
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.boldText}>Firma</h3>
      <Signature />
      <div>
        <div className={styles.bottom}>
          <Button type="button" variant="blue" onClick={() => dispatch(updateStep())}>
            Atras
          </Button>
          <Button type="button" variant="blue" onClick={() => saveTaskHandler()}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskFormSignature
