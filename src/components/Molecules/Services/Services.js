import React from "react"
import styles from "../style.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import Card from "../../Card"
import { useSelector } from "react-redux"

const Services = () => {
  const account = useSelector((state) => state.account.account)

  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.titleContainer}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faEdit} color="#5DCE68" style={{ marginRight: "0.5rem" }} />
            Servicios
          </h4>
        </div>
        <div className={styles.cardContent}>
          {account?.service[0] ? (
            account?.service?.map((e, i) => (
              <p key={i}>
                <span className={styles.boldText}>Servicio: </span>
                {e.service_name} desde {new Date(e.date_from).toLocaleDateString().toString()}
              </p>
            ))
          ) : (
            <div className={styles.contentCentered}>
              <h4 className={styles.boldText}>No hay Datos</h4>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Services
