import React, { useEffect, useState } from "react"
import Select from "react-select"
import InputText from "../../../../InputText/index"
import { getPairs, getWires, getPorts } from "../../../../../api/index"
import { useDispatch, useSelector } from "react-redux"
import {
  setTechnicalDataBox,
  setTechnicalDataCatastro,
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
  const [selectedWire, setSelectedWire] = useState()

  useEffect(() => {
    getWires().then((res) => setWires(res))
  }, [])

  const inputSelectPairHandler = (inputValue) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      inputValue.length > 0 &&
        getPairs(selectedWire?.value, inputValue, selectedWire?.pairs_secundaries === 1 ? true : false).then((res) => {
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

  const inputCatastroHandler = (value) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      value.length > 0 && dispatch(setTechnicalDataCatastro(value))
    }, 500)
  }

  return (
    <div className={styles.technicalData}>
      <h3 className={styles.boldText}>Datos Tecnicos</h3>

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
      <label>
        Par <span>{selectedWire ? "" : "- Seleccione un Cable"}</span>
        <Select
          options={pairs}
          onInputChange={inputSelectPairHandler}
          onChange={(data) =>
            dispatch(
              setTechnicalDataPair({
                cable_pair: data.value,
                pair_sec: selectedWire.pairs_secundaries === 1 ? true : false,
              })
            )
          }
          defaultValue={{
            value: account?.technical[0]?.par_cable ?? "",
            label: account?.technical[0]?.par_cable ?? "",
          }}
        />
      </label>
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
      <InputText
        type="text"
        label="Catastro"
        onChange={(e) => inputCatastroHandler(e.target.value)}
        placeHolder={account?.technical[0]?.cadastre ?? ""}
      />
    </div>
  )
}

export default TelefoniaFormData
