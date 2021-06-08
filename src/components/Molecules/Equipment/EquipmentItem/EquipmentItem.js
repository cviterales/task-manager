import React, { useState } from "react"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./style.module.scss"
import { useDispatch } from "react-redux"
import { setEditData, setEditMode } from "../../../../store/actions/edit/edit"

const EquipmentItem = ({ item, edit = false }) => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const renderCharacteristics = () => {
    return item?.equipment_details?.map((el, i) => (
      <p key={i}>
        <span className={styles.boldText}>{el.characteristic_name} </span>
        {el.value}
      </p>
    ))
  }

  const editHandler = (e) => {
    e.stopPropagation()
    dispatch(setEditMode("equipment"))
    dispatch(setEditData(item))
  }

  return (
    <li style={{ listStyleType: "none", marginBottom: "1rem" }}>
      <div className={styles.wrapper}>
        <div className={!show ? styles.listItem : styles.listItemClicked} onClick={() => setShow(!show)}>
          <p>
            <span className={styles.boldText}>{item.model}</span>
          </p>
          <p>
            <span className={styles.boldText}>MAC: </span>
            {item.mac}
          </p>
          {edit && (
            <button className={styles.editButton} type="button" variant="dark" onClick={(e) => editHandler(e)}>
              <FontAwesomeIcon icon={faPencilAlt} size="1x" />
            </button>
          )}
        </div>
        <div className={show ? styles.detailsShow : styles.detailsHidden}>
          <p>
            <span className={styles.boldText}>IP: </span>
            {item.ip}
          </p>
          <p>
            <span className={styles.boldText}>Modo: </span>
            {item.mode}
          </p>
          {item?.equipment_details && renderCharacteristics()}
        </div>
      </div>
    </li>
  )
}

export default EquipmentItem
