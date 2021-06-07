import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setEditMode } from "../../../store/actions/edit/edit"
import Button from "../../Button"
import styles from "./style.module.scss"
import EcolanFormData from "../../CloseTaskModal/CloseTaskForm/TaskFormData/EcolanFormData/EcolanFormData"
import TelefoniaFormData from "../../CloseTaskModal/CloseTaskForm/TaskFormData/TelefoniaFormData/TelefoniaFormData"
import { updateTechnical } from "../../../api"
import { setMessage } from "../../../store/actions/message/action"
import Spinner from "../../Spinner"

const EditAccountTechnical = () => {
  const id_service = useSelector((state) => state.auth.user.id_service)
  const closeTask = useSelector((state) => state.closeTask)
  const account = useSelector((state) => state.account.account)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const render = {
    1: <EcolanFormData />,
    2: <TelefoniaFormData />,
  }

  const saveHandler = (e) => {
    setLoading(true)
    e.preventDefault()
    updateTechnical(
      id_service,
      account?.service[0]?.id_sub_account,
      closeTask.dslam.id_port,
      closeTask.id_node,
      closeTask.technical_data
    ).then((res) => {
      setLoading(false)
      dispatch(setMessage(res.message, res.error))
      dispatch(setEditMode(null))
    })
  }

  return (
    <form className={styles.wrapper} onSubmit={(e) => saveHandler(e)}>
      <div className={styles.content}>{render[id_service]}</div>
      <div className={styles.bottom}>
        <Button type="submit" variant="blue" onClick={() => {}}>
          {loading ? <Spinner /> : "Guardar"}
        </Button>
        <Button type="submit" variant="outline" onClick={() => dispatch(setEditMode(null))}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default EditAccountTechnical
