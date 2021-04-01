import React from "react";
import styles from "../../style.module.scss";
import Card from "../../../../../../components/Card";
import AnimatedListItem from "../../../../../../components/Animations/AnimatedListItem/AnimatedListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const Observations = ({ subAccData }) => {

  const renderObservations = () => {
    return subAccData.obs.map((e, i) => (
      <AnimatedListItem index={i} key={i}>
        <li style={{ listStyleType: "none" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <Card>
              <div className={styles.observationsContent}>
                <p>{e.text}</p>
                <h5 className={styles.boldText}>{new Date(e.obs_date).toLocaleDateString().toString()}</h5>
              </div>
            </Card>
          </div>
        </li>
      </AnimatedListItem>
    ));
  };

  console.log(subAccData);
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faEye} color="#BE2323" style={{ marginRight: "0.5rem" }} />
          Observaciones
        </h4>
        <div className={styles.cardContent}>
          {subAccData?.obs[0] ? (
            renderObservations(subAccData)
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
