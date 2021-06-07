import React from "react";
import Card from "../../Card";
import styles from "../style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import { useSelector } from "react-redux";

const Concept = ({ priceHours, totalTime }) => {
  const totalMaterials = useSelector((state) => state.cargo.totalMaterialsPrices);

  return (
    <div className={styles.card_wrapper}>
      <Card>
      <div className={styles.titleContainer}>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faFileInvoiceDollar} color="#38a3a5" style={{ marginRight: "0.5rem" }} />
          Nuevo cargo
        </h4>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.content_list}>
            <ul className={styles.list}>
              <li className={styles.list_item}>
                <p>Total horas:</p>
                <p>$ 50 x {totalTime + "hs"}</p>
                <p>$ {(50 * totalTime).toFixed(2)}</p>
              </li>
              <li className={styles.list_item}>
                <p>Total Materiales:</p>
                <p>$ {totalMaterials.toFixed(2)}</p>
              </li>
            </ul>
            <div className={styles.total_cargo}>
              <Button
                variant="outline"
                onClick={(e) => {
                  console.log("E");
                }}
              >
                Crear Cargo
              </Button>
              <span className={styles.total}>Total: $ {totalMaterials.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Concept;
