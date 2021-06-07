import React from "react"
import { useSelector } from "react-redux"
import EditEquipment from "./EditAccEquipment/EditAccEquipment"
import EditAccountTechnical from "./EditAccTechnical/EditAccountTechnical"

const EditAccountModal = () => {
  const editMode = useSelector((state) => state.edit.editMode)
  const editType = {
    equipment: <EditEquipment />,
    technical: <EditAccountTechnical />,
  }
  return editType[editMode]
}

export default EditAccountModal
