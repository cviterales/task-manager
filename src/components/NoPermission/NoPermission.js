import React from "react";
import styles from "./style.module.scss";
import Card from "../Card/index";
const NewPermission = () => {
  return (
    <Card>
      <div className={styles.container}>
        <h4 className={styles.boldText}>No tiene suficientes permisos para acceder al contenido.</h4>
      </div>
    </Card>
  );
};

export default NewPermission;
