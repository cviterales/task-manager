import React from "react"
import styles from "../../style.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWifi } from "@fortawesome/free-solid-svg-icons"
import Card from "../../../../../../components/Card"
import { useSelector } from "react-redux"
const TechnicalData = ({ subAccData }) => {
  const id_service = useSelector((state) => state.auth.user.id_service)

  let item1 = null
  let item2 = null
  let item3 = null
  let item4 = null
  let item5 = null
  let item6 = null
  let item7 = null
  let item8 = null
  let item9 = null
  let item10 = null
  let item11 = null
  switch (id_service) {
    // ECOLAN TECHNICAL DATA // 
    case 1:
      item1 =
        subAccData?.dslam.length > 0 || subAccData?.node.length > 0 ? (
          <>
            <p>
              {subAccData?.dslam[0] ? (
                <span className={styles.boldText}>DSLAM: </span>
              ) : (
                <span className={styles.boldText}>Nodo: </span>
              )}
              <a href={subAccData?.dslam[0]?.ip ?? subAccData?.node[0]?.ip} target="_blank" title={subAccData?.dslam[0]?.ip} rel="noreferrer">
                {subAccData?.dslam[0]?.dslam ?? subAccData?.node[0]?.node}
              </a>
            </p>
            <p>
              {subAccData?.dslam[0] ? (
                <span className={styles.boldText}>Port: </span>
              ) : (
                <span className={styles.boldText}>Banda: </span>
              )}
              {subAccData?.dslam[0]?.port_number ?? subAccData?.node[0]?.band}
            </p>
          </>
        ) : (
          <p>
            {subAccData?.dslam[0] ? (
              <span className={styles.boldText}>Port: </span>
            ) : (
              <span className={styles.boldText}>Banda: </span>
            )}
            {subAccData?.dslam[0]?.port_number ?? subAccData?.node[0]?.band}
          </p>
      ) : (
        <p>
          <span className={styles.boldText}>Sin datos tecnicos</span>
        </p>
      )
      item2 = subAccData?.info[0]?.radius_login && (
        <p>
          <span className={styles.boldText}>Login: </span>
          {subAccData.info[0].radius_login}
        </p>
      )
      item3 = subAccData?.info[0]?.radius_passwd && (
        <p>
          <span className={styles.boldText}>Password: </span>
          {subAccData.info[0].radius_passwd}
        </p>
      )

      break
    case 2:
      // TELEFONIA TECHNICAL DATA //
      item1 = subAccData?.technical[0]?.cadastre && (
        <p>
          <span className={styles.boldText}>Catastro: </span>
          {subAccData.technical[0].cadastre}
        </p>
      )
      item2 = subAccData?.technical[0]?.nro_box && (
        <p>
          <span className={styles.boldText}>Nro de Caja: </span>
          {subAccData.technical[0].nro_box}
        </p>
      )
      item3 = subAccData?.technical[0]?.cable_type && (
        <p>
          <span className={styles.boldText}>Tipo: </span>
          {subAccData.technical[0].cable_type}
        </p>
      )
      item4 = subAccData?.technical[0]?.cable_number && (
        <p>
          <span className={styles.boldText}>Cable N: </span>
          {subAccData.technical[0].cable_number}
        </p>
      )
      item5 = subAccData?.technical[0]?.par_cable && (
        <p>
          <span className={styles.boldText}>Par: </span>
          {subAccData.technical[0].par_cable}
        </p>
      )
      item6 = subAccData?.technical[0]?.par_status && (
        <p>
          <span className={styles.boldText}>Estado de Par: </span>
          {subAccData.technical[0].par_status}
        </p>
      )
      item7 = subAccData?.technical[0]?.par_secondary && (
        <p>
          <span className={styles.boldText}>Par secundario: </span>
          {subAccData.technical[0].par_secondary}
        </p>
      )
      item8 = subAccData?.technical[0]?.shelter && (
        <p>
          <span className={styles.boldText}>Shelter: </span>
          {subAccData.technical[0].shelter}
        </p>
      )
      item9 = subAccData?.technical[0]?.is_active && (
        <p>
          <span className={styles.boldText}>Activo: </span>
          {subAccData.technical[0].is_active ? "Si" : "No"}
        </p>
      )
      item10 = subAccData?.technical[0]?.location && (
        <p>
          <span className={styles.boldText}>Localizacion: </span>
          {subAccData.technical[0].location}
        </p>
      )
      item11 = subAccData?.technical[0]?.associed_account && (
        <p>
          <span className={styles.boldText}>Subcuenta internet: </span>
          {subAccData.technical[0].associed_account}
        </p>
      )
      break
    case 3:
      // GAS TECHNICAL DATA //

      break

    default:
      break
  }
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faWifi} color="#84B5FF" style={{ marginRight: "0.5rem" }} />
          Datos Tecnicos
        </h4>
        <div className={styles.cardContent}>
          {item1}
          {item2}
          {item3}
          {item4}
          {item5}
          {item6}
          {item7}
          {item8}
          {item9}
          {item10}
          {item11}
        </div>
      </Card>
    </div>
  )
}

export default TechnicalData
