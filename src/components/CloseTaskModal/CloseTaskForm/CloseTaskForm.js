import React from "react"
import styles from "./style.module.scss"
import { useSelector } from "react-redux"

import TaskFormData from "./TaskFormData/TaskFormData"
import TaskFormDescription from "./TaskFormDescription/TaskFormDescription"
import TaskFormMaterials from "./TaskFormMaterials/TaskFormMaterials"
import TaskFormEquipment from "./TaskFormEquipment/TaskFormEquipment"
import TaskFormSignature from "./TaskFormSignature/TaskFormSignature"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons"

const CloseTaskForm = ({ onClose }) => {
  const step = useSelector((state) => state.closeTask.step)

  let renderStepComponent = [
    { component: <TaskFormDescription />, name: "Descripcion" },
    { component: <TaskFormData />, name: "Datos" },
    { component: <TaskFormEquipment />, name: "Equipamiento" },
    { component: <TaskFormMaterials />, name: "Materiales" },
    { component: <TaskFormSignature onClose={onClose} />, name: "Firma" },
  ]

  const renderProgressBar = () => {
    const progress = []
    renderStepComponent.forEach((element, index) => {
      progress.push(
        <li className={styles.step} key={index}>
          <FontAwesomeIcon
            icon={step - 1 > index ? faCheckCircle : faMinusCircle}
            color={step - 1 > index ? "#2c5282" : ""}
          />
          <p style={{ color: step - 1 > index ? "#2c5282" : "" }}>{renderStepComponent[index].name}</p>
        </li>
      )
    })
    return progress
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.progressBarContainer}>
        <ul className={styles.progessBar}>{renderProgressBar()}</ul>
      </div>
      <div className={styles.content}>{renderStepComponent[step - 1].component}</div>
    </div>
  )
}

export default CloseTaskForm
