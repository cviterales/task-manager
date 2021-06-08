import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getOrderType } from "../../api";
import AnimatedListItem from "../../components/Animations/AnimatedListItem/AnimatedListItem";
import Selector from "../../components/Selector/Selector";
import Title from '../../components/Title';
import OrderItem from "./OrderItem";
import styles from "./styles.module.scss";
import * as actions from '../../store/actions/cargo/index'

const status = [
  { id: 0, name: "Sin Cargo" },
  { id: 1, name: "Con Cargo" },
];

const Orders = () => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [types, setTypes] = useState([]);

  const [valuesSelected, setValuesSelected] = useState({
    stateSelected: "",
    typeSelected: "",
  });

  useEffect(() => {
    getOrderType().then(setTypes)
    dispatch(actions.setReset())
  },[dispatch])

  useEffect(() => {
    getOrders(
      id_service,
      valuesSelected.typeSelected,
      valuesSelected.stateSelected
    )
      .then(setOrders)
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
        <Title title="Buscar Ordenes" />
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
