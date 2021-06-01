import React, { useEffect, useState } from "react"
import Select from "react-select"
import InputText from "../../../../InputText"
import Button from "../../../../Button"
import { getPairs, getWires, getPorts } from "../../../../../api"
import { useDispatch, useSelector } from "react-redux"
import {
  setTechnicalDataBox,
  setTechnicalDataPair,
  setTechnicalDataPort,
} from "../../../../../store/actions/closeTask/closeTask"
import styles from "./style.module.scss"

const TelefoniaFormData = () => {
  let timeout
  const dispatch = useDispatch()
  const account = useSelector((state) => state.account.account)

  const [wires, setWires] = useState([])
  const [pairs, setPairs] = useState([])
  const [ports, setPorts] = useState([])
  const [removeCablePair, setRemoveCablePair] = useState()
  const [selectedWire, setSelectedWire] = useState(false)
  useEffect(() => {
    dispatch(
      setTechnicalDataPair({
        cable_pair: account?.technical[0]?.id_cable_pair ?? false,
        pair_sec: account?.technical[0]?.pair_secundary ?? false,
        id_port: account?.technical[0]?.id_ports ?? false,
        box: account?.technical[0]?.nro_box ?? false,
      })
    )
  }, [account, dispatch])

  useEffect(() => {
    getWires().then((res) => setWires(res))
  }, [])
  const inputSelectPairHandler = (inputValue) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      inputValue.length > 0 &&
        getPairs(selectedWire?.value, inputValue).then((res) => {
          if (res.length > 0) {
            setPairs(res)
          }
        })
    }, 500)
  }

  const inputSelectPortHandler = (inputValue) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      inputValue.length > 0 &&
        getPorts(inputValue).then((res) => {
          if (res.length > 0) {
            setPorts(res)
          }
        })
    }, 500)
  }

  const inputBoxHandler = (value) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      value.length > 0 && dispatch(setTechnicalDataBox(value))
    }, 500)
  }

  const inputPairSec = (value) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      value.length > 0 &&
        dispatch(
          setTechnicalDataPair({
            pair_sec: value,
          })
        )
    }, 500)
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.boldText}>Datos Tecnicos</h3>
      <div className={styles.content}>
        <div className={styles.contentColumn}>
          <label>
            Cable
            <Select
              options={wires}
              onChange={(data) => setSelectedWire(data)}
              defaultValue={{
                value: account?.technical[0]?.cable_number ?? "",
                label: account?.technical[0]?.cable_number ?? "",
              }}
            />
          </label>
          <div className={styles.labelContent}>
            <label style={{ width: "100%" }}>
              Par Primario
              {removeCablePair ? (
                <h4 style={{ width: "100%" }} className={styles.boldText}>
                  Par eleminado
                </h4>
              ) : (
                <Select
                  options={pairs}
                  onInputChange={(inputValue) => inputSelectPairHandler(inputValue)}
                  onChange={(data) =>
                    dispatch(
                      setTechnicalDataPair({
                        cable_pair: data.value,
                      })
                    )
                  }
                  defaultValue={{
                    value: account?.technical[0]?.id_cable_pair ?? "",
                    label: account?.technical[0]?.pair_cable ?? "",
                  }}
                />
              )}
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                dispatch(
                  setTechnicalDataPair({
                    cable_pair: false,
                  })
                )
                setRemoveCablePair(!removeCablePair)
              }}
            >
              {removeCablePair ? "Agregar" : "Borrar"}
            </Button>
          </div>
          <InputText
            type="text"
            label="Par Secundario"
            onChange={(e) => inputPairSec(e.target.value)}
            placeHolder={account?.technical[0]?.pair_secondary ?? ""}
          />
        </div>

        <div className={styles.contentColumn}>
          <label>
            Port
            <Select
              options={ports}
              onInputChange={inputSelectPortHandler}
              onChange={(data) => dispatch(setTechnicalDataPort(data.value))}
              defaultValue={{
                value: account?.technical[0]?.port ?? "",
                label: account?.technical[0]?.port ?? "",
              }}
            />
          </label>
          <InputText
            type="text"
            label="Nro Caja"
            onChange={(e) => inputBoxHandler(e.target.value)}
            placeHolder={account?.technical[0]?.nro_box ?? ""}
          />
        </div>
      </div>
    </div>
  )
}

export default TelefoniaFormData
