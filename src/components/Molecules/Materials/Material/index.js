import React from "react";
import Card from "../../../Card";
import styles from "./styles.module.scss";

const Material = ({ material }) => {
  const { description, equipment, quantity, price } = material;

  return (

      <div className={styles.content}>
        <p>{description.substring(0, 20)}</p>
        <p style={{ textAlign: "center" }}>{quantity}</p>
        <p style={{ textAlign: "center" }}>$ {price.toFixed(2)}</p>
        <p style={{ textAlign: "center" }}>$ {(quantity * price).toFixed(2)}</p>
      </div>

  );
};

export default Material;
