import React, { useEffect } from "react";
import Card from "../Card/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/message/action";

import styles from "./style.module.scss";

const Toast = () => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.message);
  const icon = error ? faTimesCircle : faCheckCircle;

  useEffect(() => {

    let time = setTimeout(() => {
      dispatch(actions.setMessage("", false))
    }, 5000)
    return () => {
      clearTimeout(time)
    }
  },[message, dispatch])

  return (
    <>
      {message && (
        <Card style={styles.show_on}>
          <div className={error ? styles.error : styles.success}>
            <FontAwesomeIcon icon={icon} size="2x"/>
            <h5>{message}</h5>
          </div>
        </Card>
      )}
    </>
  );
};

export default Toast;
