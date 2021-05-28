import React, { useEffect, useRef, useState } from "react"
import style from "./style.module.scss"

import Card from "../Card/index"
import Button from "../Button/index"
import DropDown from "../DropDown/index"
import CalendarButton from "../../components/Calendar/CalendarButton/index"
import CheckBox from "../Checkbox/index"
import Spinner from "../Spinner/index"
import Message from "../Message/index"
import { useSelector } from "react-redux"
const AssignTeam = ({ onClose, data, operators, onSave }) => {
  const id_user = useSelector((state) => state.auth.user.id)

  const [teamDate, setTeamDate] = useState(new Date().toISOString().slice(0, 10))
  const [priority, setPriority] = useState(data.priority ? data.priority : false)
  const [team, setTeam] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  const date = new Date(data.created_at).toLocaleString()
  let isMounted = useRef(true)

  const sendData = async (e) => {
    e.preventDefault()
    setLoading(true)
    onSave(data.id, teamDate, team, priority, id_user)
      .then((res) => {
        if (isMounted) {
          res.error ? setError(true) : setError(false)
          setMessage(res.message)
          setLoading(false)
        }
      })
      .catch((err) => {
        setError(true)
        setLoading(false)
      })
    setTimeout(() => {
      if (isMounted) {
        setMessage()
        setError(false)
      }
    }, 5000)
  }

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  })

  const arrOperators = []

  const operatorHandler = () => {
    operators.forEach((el) => {
      let id = el.id_team
      let op = el.operators.map((j) => {
        return j.name
      })
      const newOp = {
        id: id,
        name: op.toString().replace(",", " - "),
      }
      arrOperators.push(newOp)
    })
  }

  operatorHandler()
  return (
    <Card>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.header}>
            <h3>
              <span className={style.boldText}>{"Reclamo #" + data.number}</span>
              <p>{date}</p>
            </h3>
          </div>
          <div className={style.content}>
            <h4>
              <span className={style.boldText}>Subcuenta:</span> #{data.id_account} - {data.account_name}
            </h4>
          </div>
          <div className={style.content}>
            <h4>
              <span className={style.boldText}>Region:</span> {data.region ? data.region : "Sin Region"}
            </h4>
          </div>
          {data.task_description && (
            <div className={style.content}>
              <h4>
                <span className={style.boldText}>Descripcion:</span> {data.task_description}
              </h4>
            </div>
          )}
          {data.description && (
            <div className={style.content}>
              <h4>
                <span className={style.boldText}>Descripcion: </span>
              </h4>
              <p>{data.description}</p>
            </div>
          )}
          <form
            data-testid="form"
            onSubmit={(e) => {
              sendData(e)
            }}
          >
            <div className={style.content}>
              <label htmlFor="cuadrilla">
                <h4>
                  <span className={style.boldText}>Cuadrilla</span>
                </h4>
              </label>
              <DropDown
                selectedValue={team}
                data={arrOperators}
                name="cuadrilla"
                form="asignar"
                id="cuadrilla"
                onChange={(event) => setTeam(event.target.value)}
              />
            </div>
            <div className={style.content}>
              <label htmlFor="fecha">
                <h4>
                  <span className={style.boldText}>Fecha</span>
                </h4>
              </label>
              <CalendarButton
                type={"date"}
                id="fecha"
                value={teamDate}
                name="cuadrillaDate"
                onChange={(event) => setTeamDate(event.target.value)}
              />
            </div>
            <div className={style.content}>
              <CheckBox
                label="Prioridad"
                name="prioridad"
                onChange={() => {
                  setPriority((priority) => !priority)
                }}
                check={priority}
                disabled={false}
              />
            </div>
            <div className={style.bottom}>
              <Button variant="dark" type="submit" onClick={() => {}}>
                {loading ? <Spinner /> : <p>Guardar</p>}
              </Button>
              <Button
                variant="outline"
                type="submit"
                onClick={(e) => {
                  setError(false)
                  onClose(e)
                }}
              >
                <p>Cancelar</p>
              </Button>
            </div>
            <div className={style.contentCenter}>
              {message && <Message type={error ? "error" : "success"} message={message} />}
            </div>
          </form>
        </div>
      </div>
    </Card>
  )
}

export default AssignTeam
