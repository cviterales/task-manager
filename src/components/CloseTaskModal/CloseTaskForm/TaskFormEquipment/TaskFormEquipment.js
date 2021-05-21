import React, { useState } from "react"
import styles from "./style.module.scss"

import Button from "../../../Button"
import Card from "../../../Card"

import { useDispatch, useSelector } from "react-redux"
import {
  updateMaterials,
  updateStep,
  setTaskRecoveredEquipment,
  removeTaskRecoveredEquipment,
} from "../../../../store/actions/closeTask/closeTask"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleDown, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import EditEquipment from "./EditEquipment/EditEquipment"
import AnimatedListItem from "../../../Animations/AnimatedListItem/AnimatedListItem"

const TaskFormEquipment = () => {
  const dispatch = useDispatch()

  const closeTask = useSelector((state) => state.closeTask)
  const account = useSelector((state) => state.account.account)

  const [editEquipment, setEditEquipment] = useState(false)
  const [equipment, setEquipment] = useState()
  const [clientEquipment, setClientEquipment] = useState(account?.equipment)

  const editEquipmentHandler = (el) => {
    setEquipment(el)
    setEditEquipment(true)
  }

  const newEquipmentHandler = () => {
    setEquipment()
    setEditEquipment(true)
  }

  const recoveredEquipmentHandlder = (el) => {
    dispatch(setTaskRecoveredEquipment(el))
    let filteredEquipment = account?.equipment.filter((equipment) => equipment.id_equipment !== el)
    setClientEquipment(filteredEquipment)
  }

  const removeRecoveredEquipmentHandlder = (el) => {
    dispatch(removeTaskRecoveredEquipment(el))
    setClientEquipment([...clientEquipment, account.equipment.find((e) => e.id_equipment === el)])
  }

  const renderRecoveredEquipment = () => {
    return closeTask.equipment_recovered.map((el, i) => (
      <AnimatedListItem index={i} delay={0.15} key={i}>
        <li style={{ listStyleType: "none" }}>
          <Card>
            <div className={styles.gridContainer}>
              <p className={styles.gridItem}>{account.equipment.find((e) => e.id_equipment === el).equipment}</p>
              <p className={styles.gridItem}>MAC: {account.equipment.find((e) => e.id_equipment === el).mac}</p>
              <div className={styles.gridItem}>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => removeRecoveredEquipmentHandlder(el)}
                  color="red"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </Card>
        </li>
      </AnimatedListItem>
    ))
  }

  const renderTaskEquipment = () => {
    return closeTask.materials
      .filter((el) => el.equipment === true)
      .map((el, i) => (
        <AnimatedListItem index={i} delay={0.15} key={i}>
          <li style={{ listStyleType: "none", cursor: "pointer" }}>
            <Card>
              <div className={styles.gridContainer}>
                <p className={styles.gridItem}>
                  {closeTask?.availableMaterials?.equipment?.find((e) => e.id === el.id_material).name}
                </p>
                <div></div>
                <div className={styles.gridItem}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => dispatch(updateMaterials(el))}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </Card>
          </li>
        </AnimatedListItem>
      ))
  }

  const renderClientEquipment = () => {
    return clientEquipment.length > 0 ? (
      clientEquipment.map((el, i) => (
        <AnimatedListItem index={i} delay={0.15} key={i}>
          <li style={{ listStyleType: "none" }}>
            <Card>
              <div className={styles.gridContainer}>
                <p className={styles.gridItem}>
                  {el.equipment} - {el.model}
                </p>
                <p className={styles.gridItem}>MAC: {el.mac}</p>
                <div className={styles.gridItem}>
                  <FontAwesomeIcon
                    onClick={() => editEquipmentHandler(el)}
                    icon={faEdit}
                    color={
                      closeTask.equipment_updated.find((e) => e.id_sub_cta_equipment === el.id_equipment)
                        ? "green"
                        : "#2c5282"
                    }
                    style={{ cursor: "pointer" }}
                  />
                  <FontAwesomeIcon
                    onClick={() => recoveredEquipmentHandlder(el.id_equipment)}
                    icon={faChevronCircleDown}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </Card>
          </li>
        </AnimatedListItem>
      ))
    ) : (
      <h4 className={styles.boldText}>No hay datos</h4>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentColumn}>
        <h4 className={styles.boldText}>Equipamiento del cliente</h4>
        {clientEquipment.length > 0 ? (
          <ul className={styles.ul}>{renderClientEquipment()}</ul>
        ) : (
          <p>No hay equipamiento</p>
        )}
      </div>
      <div className={styles.contentColumnBorder}>
        <h4 className={styles.boldText}>Equipamiento recuperado</h4>
        {closeTask.equipment_recovered?.length > 0 ? (
          <ul className={styles.ul}>{renderRecoveredEquipment()}</ul>
        ) : (
          <p>No hay equipamiento recuperado</p>
        )}
      </div>
      <div className={styles.contentColumnBorder}>
        <h4 className={styles.boldText}>Equipamiento utilizado</h4>
        <Button variant="blue" type="submit" onClick={() => newEquipmentHandler()}>
          Agregar Equipamiento
        </Button>
        {closeTask.materials.length > 0 ? (
          <ul className={styles.ul}>{renderTaskEquipment()}</ul>
        ) : (
          <p>No hay equipamiento utilizado</p>
        )}
      </div>
      {editEquipment && (
        <div className={styles.editEquipment}>
          <EditEquipment onClose={() => setEditEquipment(false)} equipment={equipment} />
        </div>
      )}
      <div>
        <div className={styles.bottom}>
          <Button type="button" variant="blue" onClick={() => dispatch(updateStep())}>
            Atras
          </Button>
          <Button type="button" variant="blue" onClick={() => dispatch(updateStep("next"))}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskFormEquipment
