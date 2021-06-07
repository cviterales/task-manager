import React from "react"
import styles from "../style.module.scss"
import Card from "../../Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AnimatedListItem from "../../Animations/AnimatedListItem/AnimatedListItem"
import TaskList from "../../TasksList/TaskList"
import { faNewspaper } from "@fortawesome/free-regular-svg-icons"
import Button from "../../Button"

const Tasks = ({ subAccTasks, taskHandler, setShowTaskModal }) => {
  const renderTasks = () => {
    return subAccTasks.map((e, i) => (
      <AnimatedListItem key={i} index={i}>
        <TaskList key={i} task={e} onClick={(val) => taskHandler(val)} />
      </AnimatedListItem>
    ))
  }
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.titleContainer}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faNewspaper} color="#2B4E93" style={{ marginRight: "0.5rem" }} />
            Reclamos
          </h4>
          <Button type="button" variant="outline" onClick={() => setShowTaskModal(true)}>
            <p>Nuevo Reclamo</p>
          </Button>
        </div>
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
  )
}

export default Tasks
