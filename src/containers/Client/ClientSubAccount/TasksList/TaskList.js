import React from "react";
import styles from "./style.module.scss";

import Card from "../../../../components/Card/index";
import Status from "../../../../components/Status/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarMinus } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({ task, onClick }) => {
  return (
    <li style={{ listStyleType: "none" }}>
      <div className={styles.list_content}>
        <Card>
          <div
            className={styles.card_content}
            onClick={() => {
              onClick(task.id);
            }}
          >
            <div className={styles.card_item}>
              <p style={{ color: "black" }}>
                <span style={{ color: "var(--blue)" }}>#</span> {task.number}
              </p>
            </div>
            <div className={styles.card_item}>
              <div className={styles.mh}>
                <FontAwesomeIcon className={styles.icon} icon={faCalendarMinus} size="1x" />
              </div>
              <div>
                <p>{new Date(task.created_at).toLocaleString().toString()}</p>
              </div>
            </div>
            <div className={styles.card_item}>
              <Status description={task.last_state_description} name={task.last_state} />
            </div>
          </div>
        </Card>
      </div>
    </li>
  );
};

export default TaskList;
