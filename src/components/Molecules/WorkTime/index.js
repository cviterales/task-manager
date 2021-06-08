import React from "react";
import styles from "../style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/cargo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../../../helpers/formatDate";

import Card from "../../Card";
import Checkbox from "../../Checkbox";

const WorkTime = ({ hour_price }) => {
  const { with_cargo, with_hours } = useSelector((state) => state.cargo.order);
  const { work_time } = useSelector((state) => state.cargo.order_detail);
  const total_hours_prices = useSelector((state) => state.cargo.total_hours_prices);
  const hours = useSelector((state) => state.cargo.hours);
  const price_hour = useSelector((state) => state.cargo.hour_price);

  let time_rounded = 0;
  if (with_hours) {
    const time = with_hours.split(":");
    const seconds = +time[0] * 3600 + +time[1] * 60 + +time[2];
    const minutes = seconds / 60;
    time_rounded = parseFloat(minutes / 60, 2).toFixed(2);
  }

  const total_time_prices = time_rounded * hour_price;
  const dispatch = useDispatch();
  const workTimeHandler = () => {
    if (total_hours_prices > 0 || hours || price_hour > 0 ) {
      dispatch(actions.setHours(0, 0, 0));
    } else {
      dispatch(actions.setHours(with_hours, total_time_prices, hour_price));
    }

  };

  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.titleContainer}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faClock} color="#4299e1" style={{ marginRight: "0.5rem" }} />
            Horas trabajadas
          </h4>
          {!with_cargo && work_time && (
            <Checkbox
              label="Con cargo"
              name="con_cargo"
              onChange={() => {
                workTimeHandler();
              }}
              check={false}
              disabled={false}
            />
          )}
        </div>
        <div className={styles.cardContent}>
          {with_hours && work_time ? (
            <div className={styles.content_list}>
              <ul className={styles.list}>
                <li key="finish" className={styles.list_item}>
                  <h5>Fin:{formatDate(work_time?.date_finish)}</h5>
                  <h5>{work_time?.time_finish}</h5>
                </li>
                <li key="start" className={styles.list_item}>
                  <h5>Inicio: {formatDate(work_time?.date_start)}</h5>
                  <h5>{work_time?.time_start}</h5>
                </li>
              </ul>
              <div className={styles.total_container}>
                <span className={styles.total}>Total: {with_hours} hs</span>
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

export default WorkTime;
