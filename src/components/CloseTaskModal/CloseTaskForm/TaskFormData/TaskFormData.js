import React, { useEffect, useState } from "react"
import { getNodes, getDslams, getOlt, getDslamPorts } from "../../../../api/index"
import styles from "./style.module.scss"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import {
  setTaskDslam,
  setTaskOlt,
  updateStep,
  setTaskPort,
  setTaskNode,
} from "../../../../store/actions/closeTask/closeTask"
import Button from "../../../Button"

const TaskFormData = () => {
  const task = useSelector((state) => state.task.task)
  const account = useSelector((state) => state.account.account)
  const closeTask = useSelector((state) => state.closeTask)

  const [data, setData] = useState()
  const [ports, setPorts] = useState()

  const [clientConnection, setClientConnection] = useState("")
  const dispatch = useDispatch()

  const connectionHandler = (val) => {
    switch (task.service[0].id_service_type) {
      case 25:
        dispatch(setTaskOlt(val))
        break
      case 1:
        dispatch(setTaskDslam(val))
        break
      case 2:
        dispatch(setTaskNode(val))
        break
      default:
        break
    }
  }

  useEffect(() => {
    account[clientConnection]?.length > 0 &&
      clientConnection === "dslam" &&
      getDslamPorts(closeTask.dslam.id_dslam ?? account[clientConnection][0].id_dslam).then((res) => setPorts(res))
  }, [account, clientConnection, closeTask.dslam])

  useEffect(() => {
    switch (task.service[0].id_service_type) {
      case 25:
        getOlt().then((res) => {
          setClientConnection("fo")
          setData(res)
        })
        break
      case 1:
        getDslams().then((res) => {
          setClientConnection("dslam")
          setData(res)
        })
        break
      case 2:
        getNodes().then((res) => {
          setClientConnection("node")
          setData(res)
        })
        break
      default:
        break
    }
  }, [task])

  return (
    <form className={styles.wrapper} onSubmit={() => dispatch(updateStep("next"))}>
      <div className={styles.tecnicalData}>
        <h3 className={styles.boldText}>Datos Tecnicos</h3>
        {account[clientConnection] && (
          <label>
            {clientConnection.toUpperCase()}
            <Select
              options={data}
              defaultValue={{
                value:
                  account[clientConnection].length > 0
                    ? account[clientConnection][0]["id_" + clientConnection] ?? account[clientConnection][0]["id_olt"]
                    : "",
                label:
                  account[clientConnection].length > 0
                    ? account[clientConnection][0][clientConnection].toString() ??
                      account[clientConnection][0]["olt"].toString()
                    : "",
              }}
              onChange={(e) => connectionHandler(e.value)}
              required
            />
          </label>
        )}
        {account[clientConnection]?.length > 0 && (
          <label>
            Port
            <Select
              options={ports}
              defaultValue={{
                value: account[clientConnection][0]["id_dslam_port"],
                label: `${account[clientConnection][0]["port_number"]} - Actual`,
              }}
              onChange={(e) => dispatch(setTaskPort(e.value))}
              required
            />
          </label>
        )}
      </div>

      <div>
        <div className={styles.bottom}>
          <Button type="button" variant="blue" onClick={() => dispatch(updateStep())}>
            Atras
          </Button>
          <Button type="submit" variant="blue" onClick={() => {}}>
            Siguiente
          </Button>
        </div>
      </div>
    </form>
  )
}

export default TaskFormData
