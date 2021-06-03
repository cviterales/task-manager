import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../../api";
import AnimatedListItem from "../../components/Animations/AnimatedListItem/AnimatedListItem";
import Selector from "../../components/Selector/Selector";
import OrderItem from "./OrderItem";
import styles from "./styles.module.scss";

const types = [
  { id: 1, name: "Trabajo" },
  { id: 2, name: "Instalacion" },
];
const status = [
  { id: 0, name: "Sin Cargo" },
  { id: 1, name: "Con Cargo" },
];
const Orders = () => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  const [orders, setOrders] = useState([]);

  const [valuesSelected, setValuesSelected] = useState({
    stateSelected: "",
    typeSelected: "",
  });

  useEffect(() => {
    console.log("SEGUNDO");
    console.log(valuesSelected)
    getOrders(
      id_service,
      valuesSelected.typeSelected,
      valuesSelected.stateSelected
    )
      .then(res => {setOrders(res); console.log(res)})
      .catch((err) => console.log(err));
  }, [id_service, valuesSelected]);

  const filterHandler = (event) => {
    setValuesSelected({
      ...valuesSelected,
      [event.target.name]: event.target.value,
    });
  };

  const renderOrders = (orders) => {
    return orders.map((order, index) => {
      return (
        <AnimatedListItem key={order.id_order} index={index}>
          <OrderItem order={order} />
        </AnimatedListItem>
      );
    });
  };

  return (
    <>
      <div className={styles.header}>
        <h3 style={{ marginBottom: "1rem" }}>
          <span className={styles.boldText}>Buscar ordenes</span>
        </h3>
      </div>
      <div className={styles.filters}>
        <div className={styles.input_container}>
          <p className={styles.boldText}>Tipo</p>
          <Selector
            nameKey="typeSelected"
            data={types}
            onSelected={filterHandler}
          />
        </div>
        <div className={styles.input_container}>
          <p className={styles.boldText}>Estado</p>
          <Selector
            nameKey="stateSelected"
            data={status}
            onSelected={filterHandler}
          />
        </div>
      </div>

      <ul>{orders.length > 0 && renderOrders(orders)}</ul>
    </>
  );
};

export default Orders;
