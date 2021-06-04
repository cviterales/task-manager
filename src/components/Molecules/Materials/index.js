import React from "react";
import Card from "../../Card";
import styles from "../style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import AnimatedListItem from "../../Animations/AnimatedListItem/AnimatedListItem";
import Material from "./Material";

const Materials = ({ materials, totalMaterials }) => {
  const renderMaterials = () => {
    return materials.map((material, index) => {
      return (
        <li key={index} style={{ marginBottom: "0.5rem" }}>
          <AnimatedListItem index={index}>
            <Material material={material} />
          </AnimatedListItem>
        </li>
      );
    });
  };
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <h4 className={styles.cardTitle}>
          <FontAwesomeIcon icon={faClipboardList} color="#656565" style={{ marginRight: "0.5rem" }} />
          Materiales utilizados
        </h4>
        <div className={styles.cardContent}>
          <div className={styles.content_list}>
            <div>
              <div className={styles.list_materials}>
                <p>Articulo</p>
                <p>Cantidad</p>
                <p>Precio venta</p>
                <p>Precio final</p>
              </div>
              <ul className={styles.list}>{renderMaterials()}</ul>
            </div>
            <div className={styles.total_work}>
              <span className={styles.total}>Total: $ {totalMaterials}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Materials;
