import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions/cargo";
import styles from "../style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import AnimatedListItem from "../../Animations/AnimatedListItem/AnimatedListItem";
import Material from "./Material";
import Card from "../../Card";

const Materials = ({ materials }) => {
  const dispatch = useDispatch();
  const [materialsSelected, setMaterialsSelected] = useState({
    materials: [],
    total: 0.0,
  });

  const handlerMaterials = (material) => {
    let total = materialsSelected.total;
    let materials = [...materialsSelected.materials];
    let exists = materials.includes(material);
    materials = exists ? materials.filter((el) => el.id !== material.id) : [...materials, material];
    total = exists ? total - material.price * material.quantity : total + material.price * material.quantity;
    total = parseFloat(total.toFixed(2));
    setMaterialsSelected({ materials, total });
    dispatch(actions.add_materials(materials, total));
  };

  const renderMaterials = () => {
    return materials.map((material, index) => {
      return (
        <li key={index} style={{ marginBottom: "0.5rem" }}>
          <AnimatedListItem index={index}>
            <Material material={material} onHandlerMaterials={handlerMaterials} />
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
          {materials ? (
            <div className={styles.content_list}>
              <div>
                <div className={styles.list_materials}>
                  <p>Articulo</p>
                  <p>Cantidad</p>
                  <p>Precio venta</p>
                  <p>Precio total</p>
                  <p>Con cargo</p>
                </div>
                <ul className={styles.list}>{renderMaterials()}</ul>
              </div>
              <div className={styles.total_work}>
                <span className={styles.total}>Total: $ {materialsSelected.total.toFixed(2)}</span>
              </div>
            </div>
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

export default Materials;
