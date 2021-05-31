import React from "react"
import styles from "../style.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import Card from "../../Card"

const Info = ({ subAccData, title }) => {
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.innerHeader}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faUserCircle} color="#D7B644" style={{ marginRight: "0.5rem" }} /> {title}
            {subAccData?.info[0]?.id_sub_account}
          </h4>
          <h5 className={subAccData?.balance === 0 ? styles.balance_false : styles.balance_true}>
            {subAccData?.balance ? "Deuda: " + subAccData.balance : "Sin Deuda"}
          </h5>
        </div>
        <div className={styles.cardContent}>
          <p>
            <span className={styles.boldText}>Razon social:</span> {subAccData?.info[0]?.account_name}
          </p>
          <p>
            <span className={styles.boldText}>Domicilio: </span>
            {subAccData?.info[0]?.address}, {subAccData?.info[0]?.region_name}
          </p>
          <p>
            <span className={styles.boldText}>DNI: </span>
            {subAccData?.info[0]?.doc_number}
          </p>
          {subAccData?.phones.length > 0 ? (
            subAccData.phones.map((e, i) => (
              <p key={i}>
                <span className={styles.boldText}>Contacto {i + 1}: </span>
                {e.phone_number}
              </p>
            ))
          ) : (
            <p>
              <span className={styles.boldText}>Contacto 1: </span>
              {subAccData?.phones?.phone_number}
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Info
