import React from "react";
import styles from "../../style.module.scss";
import Card from "../../../../../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedListItem from "../../../../../../components/Animations/AnimatedListItem/AnimatedListItem";
import TaskList from "../../../../../../components/TasksList/TaskList";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

const Tasks = ({ subAccTasks, taskHandler }) => {
  const renderTasks = () => {
    return subAccTasks.map((e, i) => (
      <AnimatedListItem key={i} index={i}>
        <TaskList key={i} task={e} onClick={(val) => taskHandler(val)} />
      </AnimatedListItem>
    ));
  };
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faNewspaper} color="#2B4E93" style={{ marginRight: "0.5rem" }} />
          Reclamos
        </h4>
        <div className={styles.cardContent}>
          {!subAccTasks.error ? (
            <div className={styles.tbody}>{renderTasks()}</div>
          ) : (
            <div className={styles.contentCentered}>
              <h4 className={styles.boldText}>No hay Datos</h4>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Tasks;
