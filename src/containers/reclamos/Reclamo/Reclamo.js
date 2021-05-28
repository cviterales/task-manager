import React, { useState, useEffect, useCallback, useRef } from "react"
import style from "./reclamo.module.scss"

import Card from "../../../components/Card/index"
import Status from "../../../components/Status/index"
import Spinner from "../../../components/Spinner/index"
import Incident from "../../../components/Incident/Incident"
import Button from "../../../components/Button/index"
import Modal from "../../../components/Modal/index"
import NewIssueModal from "../../../components/NewIssueModal/NewIssueModal"
import CloseTaskModal from "../../../components/CloseTaskModal/CloseTaskModal"
import {
  faAddressCard,
  faClipboardCheck,
  faExclamationCircle,
  faHardHat,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AnimatedListItem from "../../../components/Animations/AnimatedListItem/AnimatedListItem"
import { getAccountData } from "../../../store/actions/account/account"
import { getTaskData } from "../../../store/actions/task/task"
import { createIncident } from "../../../api/index"
import { useDispatch, useSelector } from "react-redux"
import { isBrowser } from "react-device-detect"
import { resetForm } from "../../../store/actions/closeTask/closeTask"
import Equipment from "../../Client/ClientSubAccount/SubAccountDetail/Molecules/Equipment/Equipment"
import TechnicalData from "../../Client/ClientSubAccount/SubAccountDetail/Molecules/TechnicalData/TechnicalData"
import Services from "../../Client/ClientSubAccount/SubAccountDetail/Molecules/Services/Services"

const Reclamo = (props) => {
  const id_service = useSelector((state) => state.auth.user.id_service)
  const task = useSelector((state) => state.task.task)
  const subAccount = useSelector((state) => state.account.account)

  const id_account = props.location.state.id_account
  const id_task = props.location.state.id_task
  const user_id = useSelector((state) => state.auth.user.id)
  const [showIssueModal, setShowIssueModal] = useState(false)
  const [showCloseModal, setShowCloseModal] = useState(false)
  const isMounted = useRef(true)

  const dispatch = useDispatch()

  const closeTaskModalHandler = () => {
    dispatch(resetForm())
    setShowCloseModal(false)
  }

  const renderPhones = (phones) => {
    return phones.map((phone, index) => (
      <div className={style.info_content} key={index}>
        <FontAwesomeIcon icon={faPhone} size="1x" color="#4299e1" />
        <p className={style.phone_content}>{phone.phone_number}</p>
      </div>
    ))
  }

  const renderIncidents = (incidents) => {
    return incidents.map((incident, index) => {
      return (
        <AnimatedListItem key={index} index={index}>
          <li style={{ listStyleType: "none" }}>
            <Incident incident={incident} />
          </li>
        </AnimatedListItem>
      )
    })
  }

  const renderTeam = (teams) => {
    return teams.map((team, index) => {
      return (
        <div key={index}>
          <img className={style.img} src={`${team.photo}`} alt="" title={team.operator_name} />
        </div>
      )
    })
  }

  const incidentHandler = useCallback(
    (description) => {
      return createIncident(id_task, description, user_id)
    },
    [id_task, user_id]
  )

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    dispatch(getAccountData(id_service, id_account))
    dispatch(getTaskData(id_service, id_task))
  }, [id_service, id_task, id_account, dispatch, showCloseModal, showIssueModal])


  let loaded = (
    <div className={style.contentCentered}>
      <Spinner color="#4299e1" size="4rem" />
    </div>
  )
  if (task) {
    loaded = (
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.headerChild}>
            <h3 style={{ marginRight: "1rem" }}>
              <b>{"Reclamo #" + task.number + " - " + task.created_at}</b>
            </h3>
            {task.last_state ? <Status description={task.last_state_description} name={task.last_state} /> : ""}
          </div>
          {task.is_active ? (
            <Button onClick={() => setShowCloseModal(true)} variant="outline">
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
                    <FontAwesomeIcon icon={faExclamationCircle} size="1x" color="#c30000" />
                  </div>
                  <h4 className={style.card_title}>Descripcion</h4>
                </div>
                <div className={style.card_content_icon}>
                  {task.user_last_name !== "0" && <p>Ultima modificacion: {task.user_last_name}</p>}
                </div>
              </div>
              <div className={style.card_content}>
                {task.description ? <p> {task.description}</p> : <p>Sin descripcion</p>}
              </div>
            </Card>
          </div>

          <div className={style.card_content_header}>
            <TechnicalData subAccData={subAccount} />
            {task?.equipment?.length > 0 ? (
              <Equipment equipment={task?.equipment} />
            ) : (
              <div className={style.error_message_content}>
                <h4 className={style.boldText}>No existen datos.</h4>
              </div>
            )}
            <Services subAccData={subAccount} />
          </div>
        </div>
        <div className={style.wrapper_content_main}>
          <div className={style.card_container}>
            <div className={style.content_column}>
              <Card>
                <div className={style.wrapper_info_content}>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon icon={faClipboardCheck} size="1x" color="#a91ec1" />
                    </div>
                    <h4 className={style.card_title}>Incidentes</h4>
                  </div>
                  {task?.is_active ? (
                    <div className={style.card_content_icon}>
                      <Button
                        onClick={() => {
                          setShowIssueModal(true)
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
                    <ul>{renderIncidents(task.incidents)}</ul>
                  ) : (
                    <div className={style.error_message_content}>
                      <h4 className={style.boldText}>No existen datos.</h4>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          <div className={style.card_content_main}>
            <div className={style.card_container}>
              <div className={style.content_column}>
                <Card>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon icon={faUserCircle} size="1x" color="#ffca75" />
                    </div>
                    <h4 className={style.card_title}>Cuenta # {task.id_account}</h4>
                  </div>
                  <div className={style.card_content}>
                    {task?.error ? (
                      <div className={style.error_message_content}>
                        <h4 className={style.boldText}>No existen datos.</h4>
                      </div>
                    ) : (
                      <>
                        <div className={style.wrapper_info_content}>
                          <div className={style.info_content}>
                            <p>
                              <span className={style.boldText}>Nombre:</span>
                              {task.account_name}
                            </p>
                          </div>
                          <div className={style.info_content}>
                            <FontAwesomeIcon icon={faAddressCard} size="1x" color="#17c3b2" />
                            <p>
                              <span className={style.boldText}>N° Documento:</span>
                              {task.doc_number}
                            </p>
                          </div>
                        </div>
                        <div className={style.wrapper_info_content}>
                          <div>
                            <div className={style.info_content}>
                              <div className={style.card_content_icon}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#fe6d73" />
                              </div>
                              <p>
                                <span className={style.boldText}>Ubicación</span>
                              </p>
                            </div>
                            <div className={style.info_content}>
                              <p>
                                <span className={style.boldText}>Domicilio: </span>
                                {task.address}
                              </p>
                            </div>
                            <div className={style.info_content}>
                              <p>
                                <span className={style.boldText}>Localidad: </span>
                                {task.region_name}
                              </p>
                            </div>
                            <div className={style.info_content}>
                              <p>
                                <span className={style.boldText}>Zona: </span>
                                {task.region_name}
                              </p>
                            </div>
                          </div>
                          <div>{renderPhones(task.phone)}</div>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            </div>
            {isBrowser && (
              <div className={style.card_container}>
                <Card>
                  <div className={style.card_content_title}>
                    <div className={style.card_content_icon}>
                      <FontAwesomeIcon icon={faHardHat} size="1x" color="#ff791a" />
                    </div>
                    <h4 className={style.card_title}>Cuadrilla</h4>
                  </div>
                  <div className={style.card_content}>
                    {task?.team.length > 0 ? (
                      <div>
                        <Card>
                          <div className={style.team_content}>
                            <p> #{task.team[0].id_team}</p>
                            <p> {task.team[0].vehicle_name}</p>
                            <div className={style.img_content}>{renderTeam(task.team)}</div>
                          </div>
                        </Card>
                      </div>
                    ) : (
                      <div className={style.error_message_content}>
                        <h4 className={style.boldText}>No existen datos.</h4>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
        {showIssueModal && (
          <Modal title="Nuevo Incidente" onClose={() => setShowIssueModal(false)}>
            <NewIssueModal
              onClose={() => setShowIssueModal(false)}
              onSave={(description) => incidentHandler(description)}
            />
          </Modal>
        )}
        {showCloseModal && (
          <Modal title="Cerrar reclamo" onClose={() => closeTaskModalHandler()}>
            <CloseTaskModal onClose={() => closeTaskModalHandler()} />
          </Modal>
        )}
      </div>
    )
  }

  return <>{loaded}</>
}

export default Reclamo
