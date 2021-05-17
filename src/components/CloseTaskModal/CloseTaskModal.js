import React, { useEffect } from "react"
import styles from "./style.module.scss"
import PropTypes from "prop-types"

import CloseTaskForm from "./CloseTaskForm/CloseTaskForm"
import { useDispatch, useSelector } from "react-redux"
import { getMaterials } from "../../store/actions/closeTask/closeTask"

const CloseTask = ({ onClose }) => {
  const task = useSelector((state) => state.task.task)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMaterials(task?.team[0]?.id_deposit ?? 2))
  }, [task, dispatch])

  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.contentWrapper}>
        <CloseTaskForm onClose={onClose} />
      </div>
    </div>
  )
}

CloseTask.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default CloseTask
