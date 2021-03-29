import React from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarMinus, faMapMarkerAlt, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../components/Card/index";
import Status from "../../../components/Status/index";

const TaskItem = ({ reclamo, history, date, handlerReclamo }) => {
  const toTask = (reclamo) => {
    history.push("/reclamo", { id_task: reclamo.id, id_account: reclamo.id_account });
  };

  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.card}>
          <div className={styles.card_container} onClick={() => toTask(reclamo)}>
            <div className={styles.card_content}>
              <h4>{reclamo.account_name}</h4>
              <div className={styles.card_item}>
                <Status description={reclamo.last_state_description} name={reclamo.last_state} />
              </div>
            </div>
            <div className={styles.card_content}>
              <div className={styles.card_item}>
                <p>
                  <span className={styles.boldText}># {reclamo.number} </span>
                </p>
                <div className={styles.mh}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} color="#fe6d73" size="1x" />
                </div>
                <p>{reclamo.region_name}</p>
              </div>
              <div className={styles.card_item}>
                <div className={styles.mh}>
                  <FontAwesomeIcon className={styles.icon} color="#4299e1" icon={faCalendarMinus} size="1x" />
                </div>
                <div>
                  <p>{date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button_container}>
            <button className={styles.button} onClick={() => handlerReclamo(reclamo)}>
              <FontAwesomeIcon icon={faEllipsisV} size="1x" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskItem;
