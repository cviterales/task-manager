import React, { useEffect, useState } from "react"
import styles from "./style.module.scss"

import ConnectionsModal from "../../../../components/ConnectionsModal/ConnectionsModal"
import ObservationsModal from "../../../../components/ObservationsModal/ObservationsModal"
import Modal from "../../../../components/Modal/index"
import { getTask, createObservation, getObservations } from "../../../../api/index"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Info from "../../../../components/Molecules/Info/Info"
import Services from "../../../../components/Molecules/Services/Services"
import TechnicalData from "../../../../components/Molecules/TechnicalData/TechnicalData"
import Equipment from "../../../../components/Molecules/Equipment/Equipment"
import Connections from "../../../../components/Molecules/Connections/Connections"
import Observations from "../../../../components/Molecules/Observations/Observations"
import Tasks from "../../../../components/Molecules/Tasks/Tasks"
import TaskDetail from "../../../../components/Molecules/TaskDetail/TaskDetail"

const SubAccountDetail = ({ setShowTaskModal, location, connectSubAcc, subAccTasks }) => {
  const account = useSelector((state) => state.account.account)
  const id_service = useSelector((state) => state.auth.user.id_service)
  const history = useHistory()
  const [selectedTask, setSelectedTask] = useState({})
  const [showConnecModal, setShowCoonectModal] = useState(false)
  const [showObsModal, setShowObsModal] = useState(false)
  const [obsAccount, setObsAccount] = useState()

  const id_account = account.info.id_sub_account > 0 ? account.info.id_sub_account : account.info.id_account

  const taskHandler = async (id) => {
    const res = await getTask(id_service, id)
    setSelectedTask(res)
  }

  const observationHandler = async (description, important) => {
    const result = await createObservation(id_service, id_account, description, important)
    getObservations(id_service, id_account).then((res) => {
      setObsAccount(res)
    })
    return result
  }

  const toTask = () => {
    let state = {
      id_task: selectedTask.id,
      id_account: id_account,
    }
    history.push("/reclamo", state)
  }

  useEffect(() => {
    getObservations(id_service, id_account).then((res) => {
      setObsAccount(res)
    })
  }, [id_service, id_account])

  return (
    <div className={styles.client_sub}>
      <div className={styles.header}>
        <div className={styles.child}>
          <h3 styles={{ marginRight: "1rem" }}>
            <b>Cliente # {location.state.client_id}</b>
          </h3>
        </div>
      </div>

      <div className={styles.ctnr_sm}>
        <div className={styles.content}>
          <Info title={id_service === 1 ? "Subcuenta: #" : `Cuenta: #${location.state.client_id}`} />
          <Services />
        </div>
        <div className={styles.content}>
          <TechnicalData edit={true} />
          {location.state.client_sub_account && <Equipment equipment={account.equipment} edit={true} />}
        </div>
      </div>

      {/* Conexiones y Observaciones */}
      <div className={styles.ctnr_lg}>
        {id_service === 1 && <Connections connectSubAcc={connectSubAcc} setShowCoonectModal={setShowCoonectModal} />}
        <Observations obsAccount={obsAccount} setShowObsModal={setShowObsModal} />
      </div>

      {/* Reclamos y Detalle */}
      <div className={styles.ctnr_lg}>
        <Tasks subAccTasks={subAccTasks} taskHandler={taskHandler} setShowTaskModal={setShowTaskModal} />
        <TaskDetail selectedTask={selectedTask} toTask={toTask} />
      </div>

      {showConnecModal && (
        <Modal title="Buscar Conexiones" onClose={() => setShowCoonectModal(false)}>
          <ConnectionsModal
            onClose={() => setShowCoonectModal(false)}
            connectSubAcc={connectSubAcc}
            login={account?.info?.radius_login}
          />
        </Modal>
      )}

      {showObsModal && (
        <Modal title="Nueva Observacion" onClose={() => setShowObsModal(false)}>
          <ObservationsModal
            onClose={() => setShowObsModal(false)}
            account={id_account}
            onSave={(description, importan) => observationHandler(description, importan)}
          />
        </Modal>
      )}
    </div>
  )
}

export default SubAccountDetail
