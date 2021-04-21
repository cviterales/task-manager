import React from "react";
import styles from "../../style.module.scss";
import Card from "../../../../../../components/Card";
import AnimatedListItem from "../../../../../../components/Animations/AnimatedListItem/AnimatedListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { isBrowser } from "react-device-detect";
import Button from "../../../../../../components/Button";

const Observations = ({ obsAccount, setShowObsModal }) => {

  const renderObservations = () => {
    return obsAccount.map((e, i) => (
      <AnimatedListItem index={i} key={i}>
        <li style={{ listStyleType: "none" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <Card>
              <div className={styles.observationsContent}>
                <p>{e.text}</p>
                <h5 className={styles.boldText}>
                  {new Date(e.obs_date).toLocaleDateString().toString()}
                </h5>
              </div>
            </Card>
          </div>
        </li>
      </AnimatedListItem>
    ));
  };
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.innerHeader}>
          <h4>
            <FontAwesomeIcon
              icon={faEye}
              color="#BE2323"
              style={{ marginRight: "0.5rem" }}
            />
            Observaciones
          </h4>
          <Button
            onClick={() => {setShowObsModal(true)}}
            type="button"
            variant="outline"
          >
            <p>{isBrowser ? "Nueva Observacion" : "Nueva"}</p>
          </Button>
        </div>

        <div className={styles.cardContent}>
          {obsAccount ? (
            renderObservations(obsAccount)
          ) : (
            <div className={styles.contentCentered}>
              <h4 className={styles.boldText}>No hay Datos</h4>{" "}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Observations;
