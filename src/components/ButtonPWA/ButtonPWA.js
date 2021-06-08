import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import Button from "../Button"
import styles from "./style.module.scss"

const ButtonPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener("beforeinstallprompt", handler)
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
    })
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }
    return () => {
      window.removeEventListener("transitionend", handler)
      window.removeEventListener("appinstalled", handler)
    }
  }, [])

  const handleDownload = (evt) => {
    evt.preventDefault()
    if (!promptInstall) {
      return
    }
    promptInstall.prompt()
  }

  if (!supportsPWA || isInstalled) {
    return null
  }

  return (
    <div className={styles.buttonContainer}>
      <Button variant="outline" onClick={handleDownload}>
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  )
}

export default ButtonPWA
