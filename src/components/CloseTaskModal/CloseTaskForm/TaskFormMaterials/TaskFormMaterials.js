import React, { useState } from "react"
import styles from "./style.module.scss"

import DropDown from "../../../DropDown"
import InputText from "../../../InputText"
import Button from "../../../Button"
import Card from "../../../Card"

import { useDispatch, useSelector } from "react-redux"
import { setMaterials, updateMaterials, updateStep } from "../../../../store/actions/closeTask/closeTask"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import AnimatedListItem from "../../../Animations/AnimatedListItem/AnimatedListItem"

const TaskFormMaterials = () => {
  const closeTask = useSelector((state) => state.closeTask)
  const dispatch = useDispatch()
  const [selectedMaterial, setSelectedMaterial] = useState()
  const [selectedQuantity, setSelectedQuantity] = useState()

  const getSelectedMaterial = (e) => {
    let material = closeTask.availableMaterials.materials.find((el) => el.id.toString() === e.target.value)
    setSelectedMaterial(material)
  }

  const materialHandler = (e) => {
    const newOb = {
      material: selectedMaterial.id,
      quantity: selectedQuantity,
      equipment: false,
    }
    dispatch(setMaterials(newOb))
    e.preventDefault()
  }

  const renderMaterialList = () => {
    return closeTask.materials
      .filter((el) => el.equipment === false)
      .map((el, i) => (
        <AnimatedListItem index={i} delay={0.15} key={i}>
          <li style={{ listStyleType: "none", width: "100%" }}>
            <Card>
              <div className={styles.gridContainer}>
                <p className={styles.gridItem}>
                  {closeTask.availableMaterials.materials.find((e) => e.id === el.material).name}
                </p>
                <p className={styles.gridItem}>{el.quantity}</p>
                <div className={styles.gridItem}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => dispatch(updateMaterials(el))}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </Card>
          </li>
        </AnimatedListItem>
      ))
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.contentForm} onSubmit={(e) => materialHandler(e)}>
        <h3 className={styles.boldText}>Materiales</h3>
        <label>
          Material
          <DropDown
            data={closeTask.availableMaterials?.materials ?? []}
            onChange={(e) => getSelectedMaterial(e)}
            selectedValue={selectedMaterial ?? 0}
          />
        </label>
        <div className={styles.content}>
          {selectedMaterial && <p>Disponibles:{selectedMaterial?.cant_in_stock}</p>}
          <div className={styles.inputContainer}>
            <InputText
              type="number"
              onChange={(e) => setSelectedQuantity(e.target.value)}
              min={"1"}
              max={selectedMaterial?.cant_in_stock}
              required
            />
          </div>
          <Button variant="blue" type="submit" onClick={() => {}}>
            Agregar
          </Button>
        </div>
      </form>
      <div className={styles.content}>
        {closeTask.materials.filter((el) => el.equipment === false).length > 0 ? (
          <ul className={styles.ul}>{renderMaterialList()}</ul>
        ) : (
          <p>No hay materiales utilizados</p>
        )}
      </div>
      <div>
        <div className={styles.bottom}>
          <Button type="button" variant="blue" onClick={() => dispatch(updateStep())}>
            Atras
          </Button>
          <Button type="button" variant="blue" onClick={() => dispatch(updateStep("next"))}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskFormMaterials
