import React from "react";
import Card from "../../../components/Card";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './styles.module.scss'

const OrderItem = ({ order }) => {
  const {
    id_order,
    number,
    date,
    order_type,
    user_name,
    with_materials,
    with_hours,
    with_cargo
  } = order;
  const dateFormat = new Date(date).toLocaleString("es-ES", {
    "day":"2-digit",
    "month": "2-digit",
    "year": "numeric"
  })
  return (
    <li className={styles.card_wrapper}>
      <Card>
        <div className={styles.content}>
          <div>
            <h4>#{number}</h4>
            <h5>{user_name}</h5>
          </div>
          <div>
            <h4>{order_type}</h4>
            <h5>{dateFormat}</h5>
          </div>
          <div>
            <h4>
            <FontAwesomeIcon icon={with_materials ? faCheckCircle : faTimesCircle} color={with_materials ? '#00c851' : '#fb6376'} />
              Materiales</h4>
            <h5>$ {with_materials ? with_materials.toFixed(2) : "0.00"}</h5>
          </div>
          <div>
            <h4>
            <FontAwesomeIcon icon={with_hours ? faCheckCircle : faTimesCircle} color={with_hours ? '#00c851' : '#fb6376'}/>
              Horas</h4>
            <h5>{with_hours ? with_hours : "0:00h"}</h5>
          </div>
          <div>
            <h4>
            <FontAwesomeIcon icon={with_cargo ? faCheckCircle : faTimesCircle} color={with_cargo ? '#00c851' : '#fb6376'}/>
              Cargo</h4>
            <h5>{with_cargo ? "Generado" : "No generado"}</h5>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default OrderItem;
