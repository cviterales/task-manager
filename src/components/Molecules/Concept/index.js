import React, { useState } from "react";
import Card from "../../Card";
import styles from "../style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { createCargo } from "../../../api/index";
import * as actionsCargo from "../../../store/actions/cargo/index";
import * as actionsMessage from "../../../store/actions/message/action";
import Spinner from '../../Spinner';

const Concept = () => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  const order = useSelector((state) => state.cargo.order);
  const materials = useSelector((state) => state.cargo.materials);
  const total_materials = useSelector((state) => state.cargo.total_materials_prices);
  const total_hours_prices = useSelector((state) => state.cargo.total_hours_prices);
  const total_hours = useSelector((state) => state.cargo.hours);
  const hour_price = useSelector((state) => state.cargo.hour_price);
  const total_cargo = total_materials + total_hours_prices;
  const { id_order, id_account, with_cargo } = order;
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    createCargo(id_service, id_account, id_order, total_cargo, materials, total_hours_prices, hour_price)
      .then((res) => {
        if (res.error) {
          dispatch(actionsMessage.setMessage("Ocurrio un error!", res.error));
        } else {
          order["with_cargo"] = 1;
          dispatch(actionsCargo.setOrder(order));
          dispatch(actionsMessage.setMessage("Cargo creado!", res.error));
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        dispatch(actionsMessage.setMessage("Ocurrio un error!", err));
      });
  };
  return (
    <div className={styles.card_wrapper}>
      <Card>
        <div className={styles.titleContainer}>
          <h4 className={styles.cardTitle}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} color="#38a3a5" style={{ marginRight: "0.5rem" }} />
            {!with_cargo ? "Nuevo Cargo" : "Detalle de Cargo"}
          </h4>
        </div>
        <div className={styles.cardContent}>
          {total_cargo > 0 ? (
            <div className={styles.content_list}>
              <ul className={styles.list}>
                {total_hours_prices > 0 && (
                  <>
                    <li className={styles.list_item}>
                      <p>Total horas:</p>
                      <p>
                        $ {hour_price} x {total_hours} hs
                      </p>
                      <p>$ {total_hours_prices?.toFixed(2)}</p>
                    </li>
                  </>
                )}
                {total_materials > 0 && (
                  <>
                    <li className={styles.list_item}>
                      <p>Total Materiales:</p>
                      <p>$ {total_materials?.toFixed(2)}</p>
                    </li>
                  </>
                )}
              </ul>
              <div className={!with_cargo ? styles.total_cargo : styles.total_container}>
                {!with_cargo && (
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      handlerSubmit(e);
                    }}
                  >
                    <p>{loading ? <Spinner color="#4299e1" size="1rem" /> : "Crear Cargo"}</p>
                  </Button>
                )}
                <span className={styles.total}>Total: $ {total_cargo?.toFixed(2)}</span>
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

export default Concept;
