import React, { useMemo, useState } from "react";
import style from "./style.module.scss";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import CalendarButton from "../CalendarButton/index";
import Button from "../../Button/index";
import { getStatus } from "../../../api/index";

const HeaderCalendar = ({ month, year, dateHandler, nextWeek, prevWeek }) => {
  const [statusInfo, setStatusInfo] = useState(false);
  const [states, setStates] = useState();

  useMemo(() => {
    getStatus().then((res) => setStates(res));
  }, []);

  const renderStatusInfo = () => {
    return states.map((state, index) => {
      return (
        <div key={index} className={style.info}>
          <div className={[style.status_color, state.description].join(" ")}></div> {state.name}
        </div>
      );
    });
  };

  return (
    <div className={style.header_options}>
      <h3 style={{ marginBottom: "1rem" }}>
        <span className={style.boldText}>Calendario</span>
      </h3>
      <div className={style.header_buttons}>
        <div className={style.wrapperCalendarButton}>
          <CalendarButton
            id="fecha"
            type={"month"}
            value={year + "-" + month}
            name="fecha"
            onChange={(e) => {
              dateHandler(e);
            }}
          />
        </div>
        <Button onClick={(e) => prevWeek(e)} variant="outline">
          <FontAwesomeIcon icon={faChevronLeft} size="1x" color="#4299e1" />
        </Button>
        <Button onClick={(e) => nextWeek(e)} variant="outline">
          <FontAwesomeIcon icon={faChevronRight} size="1x" color="#4299e1" />
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setStatusInfo(!statusInfo);
          }}
          variant="outline"
        >
          <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: "20px", color: "#2d3748" }} />
        </Button>
        {statusInfo && (
          <div className={style.info_option}>
            <div className={style.options_menu}></div>
            {renderStatusInfo()}
          </div>
        )}
      </div>
    </div>
  );
};

HeaderCalendar.protoType = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  dateHandler: PropTypes.func.isRequired,
  nextWeek: PropTypes.func.isRequired,
  prevWeek: PropTypes.func.isRequired,
};

export default HeaderCalendar;
