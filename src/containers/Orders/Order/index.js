import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { useSelector } from "react-redux";
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

const Order = () => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  const location = useLocation();
  const order = location.state.order;
  const [orderDetail, setOrderDetail] = useState({
    info: false,
    incidents: false,
    team: false,
    materials: false,
    work_time: false,
  });
  let timeRounded = 0.0;
  const { id_order, number, date, order_type, with_hours, with_cargo } = order;
  const dateFormat = formatDate(date);

  useEffect(() => {
    getOrderDetail(id_service, id_order)
      .then(setOrderDetail)
      .catch((err) => console.log(err));
  }, [id_service, id_order]);


  if (with_hours) {
    const time = with_hours.split(":");
    const seconds = +time[0] * 3600 + +time[1] * 60 + +time[2];
    const minutes = seconds / 60;
    timeRounded = (minutes / 60).toFixed(1);
  }
  return (
    <>
      {orderDetail.info ? (
        <div className={styles.wrapper}>
          <Title title={order_type} subtitle={`#${number} - ${dateFormat}`} />
          <div className={styles.container}>
            <div className={styles.content}>
              <Materials materials={orderDetail.materials} />
            </div>

            <div className={styles.container_lg}>
              <div className={styles.content}>
                <WorkTime work={orderDetail.work_time} totalTime={with_hours} totalTimeRounded={timeRounded} />
              </div>
              <div className={styles.content}>
                <Concept totalTime={timeRounded} />
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.container_lg}>
              <div className={styles.content}>
                <Team task={orderDetail} />
              </div>
              <div className={styles.content}>
                <Info subAccData={orderDetail} title={`Cuenta #${orderDetail.info.id_account}`} />
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
