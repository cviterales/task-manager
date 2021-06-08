import React from "react";
import styles from "../style.module.scss";
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/cargo'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDate } from "../../../helpers/formatDate";

import Card from "../../Card";
import Checkbox from '../../Checkbox';

const WorkTime = ({ workTime, totalTime, hourPrice }) => {

  const { date_start, date_finish, time_start, time_finish } = workTime;

  let timeRounded = false
    if (totalTime) {
    const time = totalTime.split(":");
    const seconds = +time[0] * 3600 + +time[1] * 60 + +time[2];
    const minutes = seconds / 60;
    timeRounded = parseFloat((minutes / 60),2).toFixed(2);
  }

  const totalTimePrices = timeRounded * hourPrice;
  const dispatch = useDispatch()
  const workTimeHandler = () => {
    dispatch(actions.setHours(totalTime, totalTimePrices, hourPrice))
  }

  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.titleContainer}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faClock} color="#4299e1" style={{ marginRight: "0.5rem" }} />
            Horas trabajadas
          </h4>
        </div>
        <div className={styles.cardContent}>
          {totalTime ? (
            <div className={styles.content_list}>
              <ul className={styles.list}>
                <li key="finish" className={styles.list_item}>
                  <h5>Fin:{formatDate(date_finish)}</h5>
                  <h5>{time_finish}</h5>
                </li>
                <li key="start" className={styles.list_item}>
                  <h5>Inicio: {formatDate(date_start)}</h5>
                  <h5>{time_start}</h5>
                </li>
              </ul>
              <div className={styles.total_cargo}>
              <Checkbox
                label="Con cargo"
                name="con_cargo"
                onChange={() => {workTimeHandler()}}
                check={false}
                disabled={false}
              />
                <span className={styles.total}>Total: {totalTime} hs</span>
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
