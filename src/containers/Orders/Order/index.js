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
import { useLocation } from "react-router";
import { formatDate } from "../../../helpers/formatDate";
import Spinner from '../../../components/Spinner';
import * as actions from '../../../store/actions/account/account'

const Order = () => {
  const dispatch = useDispatch()
  const id_service = useSelector((state) => state.auth.user.id_service);
  const location = useLocation();
  const order = location.state.order;
  const [orderDetail, setOrderDetail] = useState({
    incidents: false,
    team: false,
    materials: false,
    work_time: false,
  });
  let timeRounded = 0.0;
  const { id_order, id_account, number, date, order_type, with_hours } = order;
  const dateFormat = formatDate(date);


  useEffect(() => {
    getOrderDetail(id_service, id_order)
      .then(setOrderDetail)
      .catch((err) => console.log(err));
      dispatch(actions.getAccountData(id_service, id_account))
  }, [id_service, id_order, id_account, dispatch]);



  return (
    <>
      {orderDetail ? (
        <div className={styles.wrapper}>
          <Title title={order_type} subtitle={`#${number} - ${dateFormat}`} />
          <div className={styles.container}>
            <div className={styles.content}>
              <Materials materials={orderDetail.materials} />
            </div>

            <div className={styles.container_lg}>
              <div className={styles.content}>
                <WorkTime workTime={orderDetail.work_time} totalTime={with_hours} hourPrice={50}/>
              </div>
              <div className={styles.content}>
                <Concept totalTime={with_hours} />
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.container_lg}>
              <div className={styles.content}>
                <Team task={orderDetail} />
              </div>
              <div className={styles.content}>
                <Info title={`Cuenta #${id_account}`} />
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
