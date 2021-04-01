import React from "react";
import styles from "../../style.module.scss";
import Card from "../../../../../../components/Card";
import Button from "../../../../../../components/Button/index";
import ConnectionsTable from "../../../../../../components/ConnectionsTable/ConnectionsTable";
import Spinner from "../../../../../../components/Spinner/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { isBrowser } from "react-device-detect";

const Connections = ({ connectSubAcc, setShowCoonectModal }) => {
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.innerHeader}>
          <h4>
            <FontAwesomeIcon icon={faExchangeAlt} color="#D133AF" style={{ marginRight: "0.5rem" }} />
            Conexiones
          </h4>
          <div>
            <Button onClick={() => setShowCoonectModal(true)} type="button" variant="outline">
              <p>{isBrowser ? "Ver mas" : "Ver"}</p>
            </Button>
          </div>
        </div>
        {isBrowser && (
          <div className={styles.cardContent}>
            <div style={{ height: "100%" }}>
              {connectSubAcc ? (
                connectSubAcc.length > 0 ? (
                  <ConnectionsTable headers={["Tiempo de sesion", "IP", "Ancho de banda"]} data={connectSubAcc} />
                ) : (
                  <div className={styles.contentCentered}>
                    <h4 className={styles.boldText}>No hay datos</h4>
                  </div>
                )
              ) : (
                <div className={styles.contentCentered}>
                  <Spinner color="#4299e1" size="2rem" />
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Connections;
