import React from "react";
import Card from "../../Card";
import styles from "../style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const WorkTime = ({ work, totalTime }) => {
  const renderWork = () => {
    return work.map(({ date, time, status }) => {
      const dateFormat = new Date(date).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return (
        <li key={status} className={styles.innerHeader}>
          <h5>{dateFormat}</h5>
          <h5>{time}</h5>
        </li>
      );
    });
  };
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faClock} color="#4299e1" style={{ marginRight: "0.5rem" }} />
          Horas trabajadas
        </h4>
        <div className={styles.cardContent}>
          <div className={styles.content_list}>
            <ul className={styles.list}>{renderWork()}</ul>
            <div className={styles.total_work}>
              <span className={styles.total}>Total: {totalTime}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkTime;
