import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../../api";

import Info from "../../../components/Molecules/Info/Info";
import Title from "../../../components/Title";
import Team from "../../../components/Molecules/Team";
import Incidents from "../../../components/Molecules/Incidents";
import WorkTime from "../../../components/Molecules/WorkTime";
import Materials from "../../../components/Molecules/Materials";
import Concept from "../../../components/Molecules/Concept";
import { formatDate } from "../../../helpers/formatDate";
import Spinner from '../../../components/Spinner';
import * as actionsAccount from '../../../store/actions/account/account'
import * as actionsCargo from '../../../store/actions/cargo/index'

const Order = () => {
  const dispatch = useDispatch()
  const id_service = useSelector((state) => state.auth.user.id_service);
  const order = useSelector((state) => state.cargo.order);
  const orderDetail = useSelector((state) => state.cargo.order_detail);
/*   const [orderDetail, setOrderDetail] = useState({
    incidents: false,
    team: false,
    materials: false,
    work_time: false,
  }); */


  const dateFormat = formatDate(order?.date);
  useEffect(() => {
/*     getOrderDetail(id_service, id_order, with_cargo)
      .then(setOrderDetail)
      .catch((err) => console.log(err)); */
      dispatch(actionsAccount.getAccountData(id_service, order?.id_account))
  }, [id_service, dispatch, order]);

  return (
    <>
      {orderDetail ? (
        <div className={styles.wrapper}>
          <Title title={order?.order_type} subtitle={`#${order?.number} - ${dateFormat}`} />
          <div className={styles.container}>
            <div className={styles.content}>
              <Materials />
            </div>

            <div className={styles.container_lg}>
              <div className={styles.content}>
                <WorkTime hour_price={50}/>
              </div>
              <div className={styles.content}>
                <Concept />
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.container_lg}>
              <div className={styles.content}>
                <Team task={orderDetail} />
              </div>
              <div className={styles.content}>
                <Info title={`Cuenta #${order?.id_account ? order?.id_account : ""}`} />
              </div>
            </div>
            <div className={styles.content}>
              <Incidents task={orderDetail} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contentCentered}>
          <Spinner color="#4299e1" size="4rem" />
        </div>
      )}
    </>
  );
};

export default Order;
