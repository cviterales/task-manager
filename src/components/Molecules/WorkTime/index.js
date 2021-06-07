import React from "react";
import Card from "../../Card";
import styles from "../style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../../../helpers/formatDate";

const WorkTime = ({ work, totalTime }) => {
  const renderWork = () => {
    return work.map(({ date, time, status }) => {
      const dateFormat = formatDate(date);
      return (
        <li key={status} className={styles.list_item}>
          <h5>{dateFormat}</h5>
          <h5>{time}</h5>
        </li>
      );
    });
  };
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.titleContainer}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faClock} color="#4299e1" style={{ marginRight: "0.5rem" }} />
            Horas trabajadas
          </h4>
        </div>
        <div className={styles.cardContent}>
          {totalTime ? (
            <div className={styles.content_list}>
              <ul className={styles.list}>{renderWork()}</ul>
              <div className={styles.total_work}>
                <span className={styles.total}>Total: {totalTime}</span>
              </div>
            </div>
          ) : (
            <div className={styles.contentCentered}>
              <h4 className={styles.boldText}>No hay Datos</h4>{" "}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default WorkTime;
