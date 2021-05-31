import React from "react"
import styles from "../style.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "../../Card"
import { faHdd } from "@fortawesome/free-solid-svg-icons"
import AnimatedListItem from "../../Animations/AnimatedListItem/AnimatedListItem"
import EquipmentItem from "./EquipmentItem/EquipmentItem"

const Equipment = ({ equipment }) => {
  const renderEquipment = () => {
    return equipment.map((e, i) => (
      <AnimatedListItem key={i} delay={i}>
        <EquipmentItem item={e} />
      </AnimatedListItem>
    ))
  }

  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faHdd} color="#656565" style={{ marginRight: "0.5rem" }} />
          Equipamiento
        </h4>
        <div className={styles.cardContent}>
          {equipment[0] ? (
            <ul>{renderEquipment()}</ul>
          ) : (
            <div className={styles.contentCentered}>
              <h4 className={styles.boldText}>No hay Datos</h4>{" "}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Equipment
