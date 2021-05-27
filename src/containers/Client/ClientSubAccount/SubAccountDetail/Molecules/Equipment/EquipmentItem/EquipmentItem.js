import React, { useState } from "react";
import styles from "./style.module.scss";

const EquipmentItem = ({ item }) => {
  const [show, setShow] = useState(false);

  const renderCharacteristics = (item) => {
    return item.equipment_details.map((el, i) => (
      <p key={i}>
        <span className={styles.boldText}>{el.characteristic_name} </span>
        {el.value}
      </p>
    ));
  };
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
            {renderCharacteristics(item)}
          </div>
      </div>
    </li>
  );
};

export default EquipmentItem;
