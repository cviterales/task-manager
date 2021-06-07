import React, { useCallback, useEffect, useState } from "react"
import styles from "./style.module.scss"

import Modal from "../../../components/Modal"
import NewTaskModal from "../../../components/NewTaskModal/index"
import Spinner from "../../../components/Spinner/index"
import { getSubAccountConnections, getTasks, createTask } from "../../../api/index"
import { useDispatch, useSelector } from "react-redux"
import SubAccountDetail from "./SubAccountDetail/SubAccountDetail"
import EditAccountModal from "../../../components/EditAccountModal/EditAccountModal"
import { setEditMode } from "../../../store/actions/edit/edit"
import { getAccountData } from "../../../store/actions/account/account"

const ClientSubAccount = (props) => {
  const id_service = useSelector((state) => state.auth.user.id_service)
  const id_user = useSelector((state) => state.auth.user.id)
  const editModal = useSelector((state) => state.edit.editMode)
  const account = useSelector((state) => state.account.account)

  const [showTaskModal, setShowTaskModal] = useState(false)
  const [connectSubAcc, setConnecSubAcc] = useState()
  const [subAccTasks, setSubAccTasks] = useState([])

  const dispatch = useDispatch()
  const newTaskHandler = useCallback(
    (id_service, sid, taskType, idProblem, description) => {
      return createTask(id_service, sid, taskType, idProblem, description, id_user)
    },
    [id_user]
  )

  useEffect(() => {
    let login = account?.info[0]?.radius_login
    id_service === 1 &&
      getSubAccountConnections(login, "", "").then((res) => {
        setConnecSubAcc(res)
      })
  }, [account, id_service])

  useEffect(() => {
    if (props.location.state.client_sub_account) {
      dispatch(getAccountData(id_service, props.location.state.client_sub_account))

      getTasks(id_service, "", props.location.state.client_sub_account, "", "", "", "", "").then((res) => {
        setSubAccTasks(res)
      })
    } else {
      getTasks(id_service, "", props.location.state.client_id, "", "", "", "", "").then((res) => {
        setSubAccTasks(res)
      })
      dispatch(getAccountData(id_service, props.location.state.client_id))
    }
  }, [
    id_service,
    props.location.state.client_sub_account,
    props.location.state.client_id,
    showTaskModal,
    editModal,
    dispatch,
  ])
  return (
    <>
      {account?.info ? (
        <SubAccountDetail
          subAccData={account}
          setShowTaskModal={setShowTaskModal}
          location={props.location}
          connectSubAcc={connectSubAcc}
          subAccTasks={subAccTasks}
        />
      ) : (
        <div className={styles.contentCentered}>
          <Spinner color="#4299e1" size="4rem" />
        </div>
      )}

      {showTaskModal && (
        <Modal title="Nuevo Reclamo" onClose={() => setShowTaskModal(false)}>
          <NewTaskModal
            id={props.location.state.client_id}
            sid={props.location.state.client_sub_account}
            serviceType={account?.service[0]?.id_service_type ?? ""}
            onClose={() => setShowTaskModal(false)}
            onSave={newTaskHandler}
          />
        </Modal>
      )}
      {editModal && (
        <Modal title="Editar" onClose={() => dispatch(setEditMode(null))}>
          <EditAccountModal />
        </Modal>
      )}
    </>
  )
}

export default ClientSubAccount
