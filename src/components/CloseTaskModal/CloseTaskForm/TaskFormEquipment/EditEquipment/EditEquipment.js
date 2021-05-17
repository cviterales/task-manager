import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { getEquipmentCharacteristics, getEquipmentMode } from "../../../../../api"
import {
  setMaterials,
  setTaskNewEquipment,
  setTaskUpdatedEquipment,
} from "../../../../../store/actions/closeTask/closeTask"
import Button from "../../../../Button"
import Checkbox from "../../../../Checkbox"
import DropDown from "../../../../DropDown"
import InputText from "../../../../InputText"
import styles from "./style.module.scss"
import Message from "../../../../Message/index"

const EditEquipment = ({ onClose, equipment }) => {
  const closeTask = useSelector((state) => state.closeTask)
  const dispatch = useDispatch()
  let timeout
  const [equipmentModes, setEquipmentModes] = useState([])
  const [equipmentCharacteristics, setEquipmentCharacteristics] = useState([])
  const [selectedMaterial, setSelectedMaterial] = useState()
  const [message, setMessage] = useState()

  const [wifi, setWifi] = useState(equipment?.wifi ?? false)
  const [equipmentMode, setEquipmentMode] = useState(equipment?.mode.toString())
  const [equipmentIP, setEquipmentIP] = useState(equipment?.ip ?? "")
  const [characteristics, setCharacteristics] = useState([
    { id_characteristic: "1", value: equipment?.equipment_details[0]?.value ?? "" },
    { id_characteristic: "2", value: equipment?.equipment_details[1]?.value ?? "" },
    { id_characteristic: "3", value: equipment?.equipment_details[2]?.value ?? "" },
    { id_characteristic: "4", value: equipment?.equipment_details[3]?.value ?? "" },
  ])

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

  useEffect(() => {
    setWifi(equipment?.wifi)
  }, [equipment])

  const getSelectedMaterial = (e) => {
    let material = closeTask.availableMaterials.equipment.find((el) => el.id.toString() === e.target.value)
    setSelectedMaterial(material)
  }

  const submitHandler = (e) => {
    if (equipment) {
      let obj = {
        id_sub_cta_equipment: equipment.id_equipment,
        id_mode: equipmentMode,
        wifi: wifi,
        ip: equipmentIP,
        characteristics: characteristics,
      }
      dispatch(setTaskUpdatedEquipment(obj))
      onClose()
    } else {
      if (selectedMaterial) {
        let obj = {
          id_material: selectedMaterial?.id,
          id_mode: equipmentMode,
          wifi: wifi,
          ip: equipmentIP,
          characteristics: characteristics,
          equipment: true,
        }
        dispatch(setTaskNewEquipment(obj))
        onClose()
      } else {
        setMessage("Debe seleccionar un equipo")
      }
    }
    e.preventDefault()
  }

  return (
    <form className={styles.wrapper} onSubmit={(e) => submitHandler(e)}>
      <div className={styles.container}>
        <div>
          {equipment ? (
            <h4>Equipo: {equipment.model}</h4>
          ) : (
            <label>
              Equipo
              <DropDown
                data={closeTask.availableMaterials.equipment}
                onChange={(e) => getSelectedMaterial(e)}
                selectedValue={selectedMaterial?.id}
                required
              />
            </label>
          )}
        </div>
        <label>
          Modo
          <Select
            options={equipmentModes}
            defaultValue={{ value: equipment?.mode.toString(), label: equipment?.mode.toString() }}
            onChange={(e) => setEquipmentMode(e.value)}
            required
          />
        </label>
        <InputText
          type="text"
          name="4"
          label={equipmentCharacteristics[3]?.label}
          placeHolder={equipment?.equipment_details[3]?.value ?? ""}
          pattern="(.|\s)*\S(.|\s)*" //whitespace or empty
          required
          onChange={(e) => inputCharacteristicsHandler(e)}
        />
        <InputText
          type="text"
          name="3"
          label={equipmentCharacteristics[2]?.label}
          placeHolder={equipment?.equipment_details[2]?.value ?? ""}
          pattern="(.|\s)*\S(.|\s)*" //whitespace or empty
          required
          onChange={(e) => inputCharacteristicsHandler(e)}
        />
        <InputText
          type="text"
          label="IP"
          placeHolder={equipment?.ip ?? ""}
          pattern="^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$" //IP pattern
          onChange={(e) => setEquipmentIP(e.target.value)}
        />
        <Checkbox
          name="Wifi"
          label="Wifi"
          check={equipment?.wifi === 1 ? true : false}
          onChange={() => setWifi(!wifi)}
        />
        {equipment?.wifi === 1 && (
          <>
            <InputText
              type="text"
              name="1"
              label={equipmentCharacteristics[0]?.label}
              placeHolder={equipment?.equipment_details[0]?.value ?? ""}
              pattern="(.|\s)*\S(.|\s)*" //whitespace or empty
              onChange={(e) => inputCharacteristicsHandler(e)}
            />
            <InputText
              type="text"
              name="2"
              label={equipmentCharacteristics[1]?.label}
              placeHolder={equipment?.equipment_details[1]?.value ?? ""}
              pattern="(.|\s)*\S(.|\s)*" //whitespace or empty
              onChange={(e) => inputCharacteristicsHandler(e)}
            />
          </>
        )}
      </div>
      {message && <Message type="error" message={message} />}
      <div className={styles.bottom}>
        <Button type="button" variant="blue" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" variant="blue" onClick={() => {}}>
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default EditEquipment
