import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import style from "./style.module.scss"

const Accordion = ({ title, active = false, children }) => {
  const [isActive, setIsActive] = useState(active)
  let accordionStyle = isActive ? style.active : style.inactive
  return (
    <div>
      <div className={style.accordion} onClick={() => setIsActive(!isActive)}>
        <h4>{title} </h4>
        <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} />
      </div>
      <div className={accordionStyle}>{children}</div>
    </div>
  )
}

export default Accordion
