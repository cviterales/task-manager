import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import style from "./reclamo.module.scss";

import Card from "../../../components/Card/index";
import Status from "../../../components/Status/index";
import Spinner from "../../../components/Spinner/index";
import Incident from "../../../components/Incident/Incident";
import Button from "../../../components/Button/index";
import Modal from "../../../components/Modal/index";
import NewIssueModal from "../../../components/NewIssueModal/NewIssueModal";
import CloseTaskModal from "../../../components/CloseTaskModal/CloseTaskModal";
import {
  faClipboardCheck,
  faExclamationCircle,
  faHardHat,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedListItem from "../../../components/Animations/AnimatedListItem/AnimatedListItem";
import { getAccountData } from "../../../store/actions/account/account";
import { getTaskData } from "../../../store/actions/task/task";
import { createIncident } from "../../../api/index";
import { useDispatch, useSelector } from "react-redux";
import { isBrowser } from "react-device-detect";
import { resetForm } from "../../../store/actions/closeTask/closeTask";
import Equipment from "../../../components/Molecules/Equipment/Equipment";
import TechnicalData from "../../../components/Molecules/TechnicalData/TechnicalData";
import Services from "../../../components/Molecules/Services/Services";
import Info from "../../../components/Molecules/Info/Info";
import Team from "../../../components/Molecules/Team";

const Reclamo = (props) => {
  const id_service = useSelector(
    (state) => state.auth.user.id_service
  );
  const task = useSelector((state) => state.task.task);
  const subAccount = useSelector(
    (state) => state.account.account
  );

  const id_account = props.location.state.id_account;
  const id_task = props.location.state.id_task;
  const user_id = useSelector(
    (state) => state.auth.user.id
  );
  const [showIssueModal, setShowIssueModal] =
    useState(false);
  const [showCloseModal, setShowCloseModal] =
    useState(false);
  const isMounted = useRef(true);

  const dispatch = useDispatch();

  const closeTaskModalHandler = () => {
    dispatch(resetForm());
    setShowCloseModal(false);
  };

  const renderIncidents = (incidents) => {
    return incidents.map((incident, index) => {
      return (
        <AnimatedListItem key={index} index={index}>
          <li style={{ listStyleType: "none" }}>
            <Incident incident={incident} />
          </li>
        </AnimatedListItem>
      );
    });
  };

  const incidentHandler = useCallback(
    (description) => {
      return createIncident(id_task, description, user_id);
    },
    [id_task, user_id]
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    dispatch(getAccountData(id_service, id_account));
    dispatch(getTaskData(id_service, id_task));
  }, [
    id_service,
    id_task,
    id_account,
    dispatch,
    showCloseModal,
    showIssueModal,
  ]);

  let loaded = (
    <div className={style.contentCentered}>
      <Spinner color="#4299e1" size="4rem" />
    </div>
  );
  if (task) {
    loaded = (
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.headerChild}>
            <h3 style={{ marginRight: "1rem" }}>
              <b>
                {"Reclamo #" +
                  task.number +
                  " - " +
                  task.created_at}
              </b>
            </h3>
            {task.last_state ? (
              <Status
                description={task.last_state_description}
                name={task.last_state}
              />
            ) : (
              ""
            )}
          </div>
          {task.is_active ? (
            <Button
              onClick={() => setShowCloseModal(true)}
              variant="outline"
            >
              <p>Cerrar reclamo</p>
            </Button>
          ) : null}
        </div>
        <div className={style.wrapper_content_header}>
          <div className={style.card_container}>
            <Card>
              <div className={style.wrapper_info_content}>
                <div className={style.card_content_title}>
                  <div className={style.card_content_icon}>
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      size="1x"
                      color="#c30000"
                    />
                  </div>
                  <h4 className={style.card_title}>
                    Descripcion
                  </h4>
                </div>
                <div className={style.card_content_icon}>
                  {task.user_last_name !== "0" && (
                    <p>
                      Ultima modificacion:{" "}
                      {task.user_last_name}
                    </p>
                  )}
                </div>
              </div>
              <div className={style.card_content}>
                {task.description ? (
                  <p> {task.description}</p>
                ) : (
                  <p>Sin descripcion</p>
                )}
              </div>
            </Card>
          </div>

          <div className={style.card_content_header}>
            <TechnicalData subAccData={subAccount} />
            <Equipment equipment={task?.equipment} />
            <Services subAccData={subAccount} />
          </div>
        </div>
        <div className={style.wrapper_content_main}>
          <div className={style.card_container}>
            <div className={style.content_column}>
              <Card>
                <div className={style.wrapper_info_content}>
                  <div className={style.card_content_title}>
                    <div
                      className={style.card_content_icon}
                    >
                      <FontAwesomeIcon
                        icon={faClipboardCheck}
                        size="1x"
                        color="#a91ec1"
                      />
                    </div>
                    <h4 className={style.card_title}>
                      Incidentes
                    </h4>
                  </div>
                  {task?.is_active ? (
                    <div
                      className={style.card_content_icon}
                    >
                      <Button
                        onClick={() => {
                          setShowIssueModal(true);
                        }}
                        variant="outline"
                      >
                        <p>Nuevo Incidente</p>
                      </Button>
                    </div>
                  ) : null}
                </div>
                <div className={style.card_content}>
                  {task?.incidents?.length > 0 ? (
                    <ul>
                      {renderIncidents(task.incidents)}
                    </ul>
                  ) : (
                    <div
                      className={
                        style.error_message_content
                      }
                    >
                      <h4 className={style.boldText}>
                        No existen datos.
                      </h4>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          <div className={style.card_content_main}>
            <div className={style.card_content_aside}>
              <Info
                subAccData={subAccount}
                title={
                  id_service === 1
                    ? `Subcuenta: #${task.id_account}`
                    : `Cuenta: #${task.id_account}`
                }
              />
            </div>

            {isBrowser && (
              <div className={style.card_content_aside}>
                <Team task={task} />
              </div>
            )}
          </div>
        </div>
        {showIssueModal && (
          <Modal
            title="Nuevo Incidente"
            onClose={() => setShowIssueModal(false)}
          >
            <NewIssueModal
              onClose={() => setShowIssueModal(false)}
              onSave={(description) =>
                incidentHandler(description)
              }
            />
          </Modal>
        )}
        {showCloseModal && (
          <Modal
            title="Cerrar reclamo"
            onClose={() => closeTaskModalHandler()}
          >
            <CloseTaskModal
              onClose={() => closeTaskModalHandler()}
            />
          </Modal>
        )}
      </div>
    );
  }

  return <>{loaded}</>;
};

export default Reclamo;
