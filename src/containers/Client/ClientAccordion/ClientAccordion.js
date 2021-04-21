import React, { useEffect, useState, useRef } from "react";
import style from "./style.module.scss";

import Card from "../../../components/Card/index";
import Status from "../../../components/Status/index";

import {
  faAddressCard,
  faBan,
  faCalendarTimes,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faPhone,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getClientSubAccounts } from "../../../api/index";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";

const ClientAccordion = ({ client, history }) => {
  const [showAccount, setShowAccount] = useState(false);
  const [subAccounts, setSubAccounts] = useState(false);
  const id_service = useSelector((state) => state.auth.user.id_service);
  const isMounted = useRef(true)

  const showSubAccountHandler = async (id_service, client) => {
    if (id_service === 1) {
      const res = await getClientSubAccounts(id_service, client.id_account)
      if (isMounted.current) {
        setShowAccount((showAccount) => !showAccount);
        setSubAccounts(res);
      }
    } else {
      if (isMounted.current) {
        setShowAccount((showAccount) => !showAccount);
        setSubAccounts();
      }
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const toSubAcc = (item) => {
    console.log(item)
    let state = {
      client_sub_account: item?.id_sub_account ?? client.id_account,
      client_id: client.id_account,
    };
    history.push("/client_sub_account", state);
  };

  const renderClient = (client) => {
    return (
      <>
        <div className={style.client_content}>
          <div className={style.id}>
            <p># {client.id_account}</p>
          </div>
          <div className={style.childs}>
            <div className={style.content_child_info}>
              <div className={style.child}>
                <h4>{client.account_name}</h4>
                <div className={style.content_left}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="#4299e1" />
                  <p>{client.location}</p>
                </div>
              </div>
              <div className={style.child}>
                <div className={style.content_right}>
                  <FontAwesomeIcon icon={faAddressCard} size="1x" color="#17c3b2" />
                  <p>
                    {client.doc_type}: {client.doc_number}
                  </p>
                </div>
                <div className={style.content_right}>
                  <FontAwesomeIcon icon={faPhone} size="1x" color="#4299e1" />
                  <p>{client.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAccount &&
          (subAccounts ? (
            <div className={`${showAccount ? style.show_accounts : style.hidden_accounts}`}>
              {subAccounts?.map((item, index) => {
                let dateInactive = new Date(item.date_inactive).toLocaleDateString();
                return (
                  <div
                    className={style.client_card_child}
                    key={index}
                    onClick={() => {
                      toSubAcc(item);
                    }}
                  >
                    <div className={style.client_content_childs}>
                      <div className={style.id} style={{ opacity: item.inactive ? "0.6" : "1" }}>
                        <p># {item.id_sub_account}</p>
                      </div>
                      <div className={style.childs}>
                        <div className={style.content_child_info}>
                          <div className={style.child}>
                            <div className={style.content_left}>
                              <FontAwesomeIcon icon={faWifi} size="1x" color="#4299e1" />
                              <p>{item.service_name}</p>
                            </div>
                            <div className={style.content_left}>
                              <FontAwesomeIcon icon={faMapMarkedAlt} size="1x" color="#4299e1" />
                              <p>{item.address}</p>
                            </div>
                          </div>

                          <div className={style.child} title="Baja de servicio">
                            {item.date_inactive ? (
                              <div className={style.content_right}>
                                <FontAwesomeIcon icon={faCalendarTimes} size="1x" color="#4299e1" />
                                <p>{dateInactive}</p>
                                {/*                          <Status
                              name={item.inactive ? "disabled" : "enabled"}
                              description={
                                item.inactive ? "Inactivo" : "Activo"
                              } 
                            />*/}
                              </div>
                            ) : null}
                            {item.description_inactive ? (
                              <div className={style.content_right}>
                                <FontAwesomeIcon icon={faBan} size="1x" color="#4299e1" />
                                <p>{item.description_inactive}</p>
                              </div>
                            ) : null}
                            {!item.inactive && (
                              <Status
                                description={item.inactive ? "disabled" : "enabled"}
                                name={item.inactive ? "Inactivo" : "Activo"}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={style.client_account}>
              <Button
                variant="outline"
                onClick={() => {
                  toSubAcc();
                }}
              >
                <h4>Ver Cuenta</h4>
              </Button>
            </div>
          ))}
      </>
    );
  };
  return (
    <div className={style.client_card}>
      <Card>
        <div onClick={() => showSubAccountHandler(id_service, client)}>{renderClient(client)}</div>
      </Card>
    </div>
  );
};

export default ClientAccordion;
