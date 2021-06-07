import React from "react";
import Card from "../../Card";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../style.module.scss";
import AnimatedListItem from "../../Animations/AnimatedListItem/AnimatedListItem";
import Incident from "../../Incident/Incident";
import Button from "../../Button";

const Incidents = ({ task, setShowIssueModal }) => {
  
  const renderIncidents = (incidents) => {
    return incidents.map((incident, index) => {
      return (
        <AnimatedListItem key={index} index={index}>
          <li style={{ listStyleType: "none" }}>
            <Incident incident={incident} />
          </li>
        </AnimatedListItem>
      );
    });
  };

  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.innerHeader}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon
              icon={faClipboardCheck}
              color="#a91ec1"
              style={{ marginRight: "0.5rem" }}
            />
            Incidentes
          </h4>

          {task?.is_active ? (
            <div className={styles.cardTitle}>
              <Button
                onClick={() => {
                  setShowIssueModal(true);
                }}
                variant="outline"
              >
                <p>Nuevo Incidente</p>
              </Button>
            </div>
          ) : null}
        </div>
        <div className={styles.cardContent}>
          {task?.incidents?.length > 0 ? (
            <ul>{renderIncidents(task.incidents)}</ul>
          ) : (
            <div className={styles.error_message_content}>
              <h4 className={styles.boldText}>No existen datos.</h4>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Incidents;
