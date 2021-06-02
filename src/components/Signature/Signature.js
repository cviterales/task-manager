import React, { useRef } from "react";
import Button from "../Button/index";
import SignatureCanvas from "react-signature-canvas";
import styles from "./style.module.scss";
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/closeTask/closeTask'
const Signature = () => {
  const dispatch = useDispatch()
  const signatureRef = useRef(null);

  const handleClear = () => {
    signatureRef.current.clear();
    signatureRef.current.on()
  };
  const handleConfirm = () => {
    if (!signatureRef.current.isEmpty()) {
      signatureRef.current.off()
      const imageBase64 = signatureRef.current.getTrimmedCanvas().toDataURL();
      dispatch(actions.setSignature(imageBase64));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.signatureContainer}>
        <SignatureCanvas
          ref={signatureRef}
          penColor="green"
          canvasProps={{ className: styles.sigPad }}
        />
      </div>
      <div className={styles.bottom}>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleClear()}
        >
          <p>Borrar</p>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleConfirm()}
        >
          <p>Confirmar</p>
        </Button>
      </div>
    </div>
  );
};

export default Signature;
