import React from "react"
import { useSelector } from "react-redux"
import EditEquipment from "./EditAccEquipment/EditAccEquipment"

const EditAccountModal = () => {
  const editMode = useSelector((state) => state.edit.editMode)
  const editType = {
    equipment: <EditEquipment />,
  }
  return editType[editMode]
}

export default EditAccountModal
