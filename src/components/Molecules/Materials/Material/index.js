import React from "react";
import styles from "./styles.module.scss";
import Checkbox from "../../../Checkbox/index";
import { useSelector } from "react-redux";

const Material = ({ material, onHandlerMaterials }) => {
  const { with_cargo } = useSelector((state) => state.cargo.order);
  const { description, quantity, price } = material;

  return (
    <div className={styles.content}>
      <p>{description.substring(0, 20)}</p>
      <p style={{ textAlign: "center" }}>{quantity}</p>
      <p style={{ textAlign: "center" }}>$ {price.toFixed(2)}</p>
      <p style={{ textAlign: "center" }}>$ {(quantity * price).toFixed(2)}</p>
      {!with_cargo && (
        <div className={styles.content_input}>
          <Checkbox
            label=""
            name={material.id_order_detail.toString()}
            check={false}
            onChange={() => onHandlerMaterials(material)}
          />
        </div>
      )}
    </div>
  );
};

export default Material;
