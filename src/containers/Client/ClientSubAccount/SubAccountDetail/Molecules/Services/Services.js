import React from "react";
import styles from "../../style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Card from "../../../../../../components/Card";

const Services = ({ subAccData }) => {
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faEdit} color="#5DCE68" style={{ marginRight: "0.5rem" }} />
          Servicios
        </h4>
        <div className={styles.cardContent}>
          {subAccData?.service?.map((e, i) => (
            <p key={i}>
              <span className={styles.boldText}>Servicio: </span>
              {e.service_name} desde {new Date(e.date_from).toLocaleDateString().toString()}
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Services;
