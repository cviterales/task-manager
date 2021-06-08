import React from "react"
import styles from "../style.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencilAlt, faWifi } from "@fortawesome/free-solid-svg-icons"
import Card from "../../Card"
import { useDispatch, useSelector } from "react-redux"
import { setEditMode } from "../../../store/actions/edit/edit"
const TechnicalData = ({ edit = false }) => {
  const id_service = useSelector((state) => state.auth.user.id_service)
  const account = useSelector((state) => state.account.account)
  const dispatch = useDispatch()
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

  const editHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(setEditMode("technical"))
  }

  switch (id_service) {
    // ECOLAN TECHNICAL DATA //
    case 1:
      item1 =
        account?.dslam?.length > 0 || account?.node?.length > 0 ? (
          <>
            <p>
              {account?.dslam[0] ? (
                <span className={styles.boldText}>DSLAM: </span>
              ) : (
                <span className={styles.boldText}>Nodo: </span>
              )}
              <a
                href={account?.dslam[0]?.ip ?? account?.node[0]?.ip}
                target="_blank"
                title={account?.dslam[0]?.ip}
                rel="noreferrer"
              >
                {account?.dslam[0]?.dslam ?? account?.node[0]?.node}
              </a>
            </p>
            <p>
              {account?.dslam[0] ? (
                <span className={styles.boldText}>Port: </span>
              ) : (
                <span className={styles.boldText}>Banda: </span>
              )}
              {account?.dslam[0]?.port_number ?? account?.node[0]?.band}
            </p>
          </>
        ) : (
          <p>
            <span className={styles.boldText}>Sin datos tecnicos</span>
          </p>
        )
      item2 = account?.info[0]?.radius_login && (
        <p>
          <span className={styles.boldText}>Login: </span>
          {account?.info[0]?.radius_login}
        </p>
      )
      item3 = account?.info[0]?.radius_passwd && (
        <p>
          <span className={styles.boldText}>Password: </span>
          {account?.info[0]?.radius_passwd}
        </p>
      )

      break
    case 2:
      // TELEFONIA TECHNICAL DATA //
      item2 = account?.technical[0]?.nro_box && (
        <p>
          <span className={styles.boldText}>Nro de Caja: </span>
          {account.technical[0].nro_box}
        </p>
      )
      item3 = account?.technical[0]?.cable_type && (
        <p>
          <span className={styles.boldText}>Tipo: </span>
          {account.technical[0].cable_type}
        </p>
      )
      item4 = account?.technical[0]?.cable_number && (
        <p>
          <span className={styles.boldText}>Cable N: </span>
          {account.technical[0].cable_number}
        </p>
      )
      item5 = account?.technical[0]?.pair_cable && (
        <p>
          <span className={styles.boldText}>Par: </span>
          {account.technical[0].pair_cable}
        </p>
      )
      item7 = account?.technical[0]?.par_secondary && (
        <p>
          <span className={styles.boldText}>Par secundario: </span>
          {account.technical[0].par_secondary}
        </p>
      )
      item8 = account?.technical[0]?.shelter && (
        <p>
          <span className={styles.boldText}>Shelter: </span>
          {account.technical[0].shelter}
        </p>
      )
      item9 = account?.technical[0]?.is_active && (
        <p>
          <span className={styles.boldText}>Activo: </span>
          {account.technical[0].is_active ? "Si" : "No"}
        </p>
      )
      item10 = account?.technical[0]?.location && (
        <p>
          <span className={styles.boldText}>Localizacion: </span>
          {account.technical[0].location}
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
        <div className={styles.titleContainer}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faWifi} color="#84B5FF" style={{ marginRight: "0.5rem" }} />
            Datos Tecnicos
          </h4>
          {edit && (
            <button className={styles.editButton} type="button" variant="dark" onClick={(e) => editHandler(e)}>
              <FontAwesomeIcon icon={faPencilAlt} size="1x" />
            </button>
          )}
        </div>
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
