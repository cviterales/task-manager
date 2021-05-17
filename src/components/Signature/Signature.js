import React, { useRef } from "react"
import Button from "../Button/index"
import SignatureCanvas from "react-signature-canvas"
import styles from "./style.module.scss"

const Signature = () => {
  const signatureRef = useRef(null)

  const handleClear = () => {
    signatureRef.current.clear()
  }
  const handleConfirm = () => {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.signatureContainer}>
        <SignatureCanvas
          ref={signatureRef}
          penColor="green"
          canvasProps={{ width: 300, height: 200, className: "sigCanvas" }}
        />
      </div>
      <div className={styles.container}>
        <Button type="button" variant="outline" onClick={() => handleClear()}>
          <p>Borrar</p>
        </Button>
        <Button type="button" variant="outline" onClick={() => handleConfirm()}>
          <p>Confirmar</p>
        </Button>
      </div>
    </div>
  )
}

export default Signature
