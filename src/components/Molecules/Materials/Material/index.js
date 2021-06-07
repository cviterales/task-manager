import React from "react";
import styles from "./styles.module.scss";
import Checkbox from '../../../Checkbox/index';

const Material = ({ material, onHandlerMaterials }) => {
  const { description, quantity, price } = material;

  return (
      <div className={styles.content}>
        <p>{description.substring(0, 20)}</p>
        <p style={{ textAlign: "center" }}>{quantity}</p>
        <p style={{ textAlign: "center" }}>$ {price.toFixed(2)}</p>
        <p style={{ textAlign: "center" }}>$ {(quantity * price).toFixed(2)}</p>
        <div className={styles.content_input}>
          <Checkbox label="" name={material.id.toString()} check={false} onChange={() => onHandlerMaterials(material)} />
        </div>
      </div>

  );
};

export default Material;
