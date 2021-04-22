import React from "react";
import styles from "../../style.module.scss";

import Card from "../../../../../../components/Card";
import Button from "../../../../../../components/Button/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import TaskItem from "../../../../../../components/TasksList/TaskItem/TaskItem";

const TaskDetail = ({ selectedTask, toTask }) => {
  console.log(selectedTask)
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.innerHeader}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faBookmark} color="#60ECFF" style={{ marginRight: "0.5rem" }} />
            Detalles
          </h4>
          {selectedTask?.id && (
            <div style={{ marginTop: "1rem", marginRight: "1rem" }}>
              <Button variant="outline" onClick={() => toTask()}>
                <h4>Ver</h4>
              </Button>
            </div>
          )}
        </div>
        <div className={styles.cardContent}>
          <div className={styles.contentCentered}>
            {selectedTask?.id ? (
              <TaskItem task={selectedTask} />
            ) : (
              <h4 className={styles.boldText}>Seleccione tarea a visualizar</h4>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskDetail;
