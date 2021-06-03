import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { getEquipmentCharacteristics, getEquipmentMode, updateEquipment } from "../../../api"
import Button from "../../Button"
import Checkbox from "../../Checkbox"
import InputText from "../../InputText"
import styles from "./style.module.scss"
import { setEditMode } from "../../../store/actions/edit/edit"
import { setMessage } from "../../../store/actions/message/action"

const EditEquipment = () => {
  const item = useSelector((state) => state.edit.editData)
  const [equipmentModes, setEquipmentModes] = useState([])
  const [equipmentCharacteristics, setEquipmentCharacteristics] = useState([])
  const [equipmentMode, setEquipmentMode] = useState()
  const [wifi, setWifi] = useState(item?.wifi)
  const [equipmentIP, setEquipmentIP] = useState(item?.ip ?? "")
  const [characteristics, setCharacteristics] = useState([
    { id_characteristic: "1", value: item?.equipment_details[0]?.value ?? "" },
    { id_characteristic: "2", value: item?.equipment_details[1]?.value ?? "" },
    { id_characteristic: "3", value: item?.equipment_details[2]?.value ?? "" },
    { id_characteristic: "4", value: item?.equipment_details[3]?.value ?? "" },
  ])
  const dispatch = useDispatch()
  let timeout

  const editEquipmentHandler = (e) => {
    e.preventDefault()
    let id_sub_cta_equipment = item.id_equipment
    let equipmentCurrentMode = equipmentMode ?? equipmentModes.find((el) => el.label === item.mode).value
    updateEquipment(id_sub_cta_equipment, equipmentCurrentMode, wifi, equipmentIP, characteristics).then((res) => {
      if (res) {
        dispatch(setMessage(res.message, res.error))
        dispatch(setEditMode(null))
      }
    })
  }

  const inputCharacteristicsHandler = (e) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      setCharacteristics(
        characteristics.map((el) =>
          el.id_characteristic === e.target.name ? { id_characteristic: e.target.name, value: e.target.value } : el
        )
      )
    }, 500)
  }

  useEffect(() => {
    getEquipmentCharacteristics().then((res) => setEquipmentCharacteristics(res))
    getEquipmentMode().then((res) => setEquipmentModes(res))
  }, [])

  return (
    <form className={styles.wrapper} onSubmit={(e) => editEquipmentHandler(e)}>
      <div className={styles.content}>
        <label>
          Modo
          <Select
            options={equipmentModes}
            defaultValue={{ value: item?.mode?.toString(), label: item?.mode?.toString() }}
            onChange={(e) => setEquipmentMode(e.value)}
            required
          />
        </label>
        <InputText
          type="text"
          name="4"
          label={equipmentCharacteristics[3]?.label}
          placeHolder={item?.equipment_details[3]?.value ?? ""}
          pattern="(.|\s)*\S(.|\s)*" //whitespace or empty
          required
          onChange={(e) => inputCharacteristicsHandler(e)}
        />
        <InputText
          type="text"
          name="3"
          label={equipmentCharacteristics[2]?.label}
          placeHolder={item?.equipment_details[2]?.value ?? ""}
          pattern="(.|\s)*\S(.|\s)*" //whitespace or empty
          required
          onChange={(e) => inputCharacteristicsHandler(e)}
        />
        <InputText
          type="text"
          label="IP"
          placeHolder={item?.ip ?? ""}
          pattern="^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$" //IP pattern
          onChange={(e) => setEquipmentIP(e.target.value)}
        />
        <Checkbox name="Wifi" label="Wifi" check={item?.wifi === 1 ? true : false} onChange={() => setWifi(!wifi)} />
        {item?.wifi && (
          <>
            <InputText
              type="text"
              name="1"
              label={equipmentCharacteristics[0]?.label}
              placeHolder={item?.equipment_details[0]?.value ?? ""}
              pattern="(.|\s)*\S(.|\s)*" //whitespace or empty
              onChange={(e) => inputCharacteristicsHandler(e)}
            />
            <InputText
              type="text"
              name="2"
              label={equipmentCharacteristics[1]?.label}
              placeHolder={item?.equipment_details[1]?.value ?? ""}
              pattern="(.|\s)*\S(.|\s)*" //whitespace or empty
              onChange={(e) => inputCharacteristicsHandler(e)}
            />
          </>
        )}
      </div>
      <div className={styles.bottom}>
        <Button type="submit" variant="blue" onClick={() => {}}>
          Siguiente
        </Button>
        <Button type="submit" variant="outline" onClick={() => dispatch(setEditMode(null))}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default EditEquipment
