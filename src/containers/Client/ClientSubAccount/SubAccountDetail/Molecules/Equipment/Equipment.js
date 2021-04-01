import React from "react";
import styles from "../../style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../../../../../components/Card";
import { faHdd } from "@fortawesome/free-solid-svg-icons";
const Equipment = ({ subAccData }) => {
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faHdd} color="#656565" style={{ marginRight: "0.5rem" }} />
          Equipamiento
        </h4>
        <div className={styles.cardContent}>
          {subAccData?.equipment[0]?.model ? (
            subAccData.equipment.map((e, i) => {
              return (
                <div key={i}>
                  <p>
                    <span className={styles.boldText}>Modelo: </span>
                    {e?.model}
                  </p>
                  <p>
                    <span className={styles.boldText}>MAC: </span>
                    {e?.mac}
                  </p>
                  <p>
                    <span className={styles.boldText}>IP: </span>
                    {e?.ip}
                  </p>
                  <p>
                    <span className={styles.boldText}>Modo: </span>
                    {e?.mode}
                  </p>
                </div>
              );
            })
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

export default Equipment;
