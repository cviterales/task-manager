import React from "react";
import Card from "../../Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../style.module.scss";
import { faHardHat } from "@fortawesome/free-solid-svg-icons";
import TeamItems from "./TeamItems";

const Team = ({ task }) => {
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon
            icon={faHardHat}
            color="#ff791a"
            style={{ marginRight: "0.5rem" }}
          />
          Cuadrilla
        </h4>
        <div className={styles.cardContent}>
          {task?.team.length > 0 ? (
            <TeamItems team={task.team} />
          ) : (
            <div className={styles.contentCentered}>
              <h4 className={styles.boldText}>
                No hay Datos
              </h4>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Team;
