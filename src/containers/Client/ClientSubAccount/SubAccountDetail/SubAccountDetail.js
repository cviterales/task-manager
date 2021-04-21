import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Button from "../../../../components/Button/index";
import ConnectionsModal from "../../../../components/ConnectionsModal/ConnectionsModal";
import ObservationsModal from "../../../../components/ObservationsModal/ObservationsModal";
import Modal from "../../../../components/Modal/index";
import {
  getTask,
  createObservation,
  getObservations,
} from "../../../../api/index";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Info from "./Molecules/Info/Info";
import Services from "./Molecules/Services/Services";
import TechnicalData from "./Molecules/TechnicalData/TechnicalData";
import Equipment from "./Molecules/Equipment/Equipment";
import Connections from "./Molecules/Connections/Connections";
import Observations from "./Molecules/Observations/Observations";
import Tasks from "./Molecules/Tasks/Tasks";
import TaskDetail from "./Molecules/TaskDetail/TaskDetail";

const SubAccountDetail = ({
  subAccData,
  setShowTaskModal,
  location,
  connectSubAcc,
  subAccTasks,
}) => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  const history = useHistory();
  const [selectedTask, setSelectedTask] = useState({});
  const [showConnecModal, setShowCoonectModal] = useState(false);
  const [showObsModal, setShowObsModal] = useState(false);
  const [obsAccount, setObsAccount] = useState();

  const id_account =
    subAccData.info[0].id_sub_account > 0
      ? subAccData.info[0].id_sub_account
      : subAccData.info[0].id_account;

  const taskHandler = async (id) => {
    const res = await getTask(id_service, id);
    setSelectedTask(res);
  };

  const observationHandler = async (description, important) => {
    const result = await createObservation(id_service, id_account, description, important);
    getObservations(id_service, id_account).then((res) => {
      setObsAccount(res);
    });
    return result;
  };

  const toTask = () => {
    let state = {
      id_task: selectedTask.id,
      id_account: id_account,
    };
    history.push("/reclamo", state);
  };

  useEffect(() => {
    getObservations(id_service, id_account).then((res) => {
      setObsAccount(res);
    });
  }, [id_service, id_account])

  return (
    <div className={styles.client_sub}>
      <div className={styles.header}>
        <div className={styles.child}>
          <h3 styles={{ marginRight: "1rem" }}>
            <b>Cliente # {location.state.client_id}</b>
          </h3>
        </div>
        <div className={styles.child}>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowTaskModal(true)}
          >
            <p>Nuevo Reclamo</p>
          </Button>
        </div>
      </div>

      <div className={styles.ctnr_sm}>
        <div className={styles.content}>
          <Info
            subAccData={subAccData}
            title={
              location.state.client_sub_account
                ? "Subcuenta: #"
                : `Cuenta: #${location.state.client_id}`
            }
          />
          <Services subAccData={subAccData} />
        </div>
        <div className={styles.content}>
          <TechnicalData subAccData={subAccData} />
          {location.state.client_sub_account && (
            <Equipment subAccData={subAccData} />
          )}
        </div>
      </div>

      {/* Conexiones y Observaciones */}
      <div className={styles.ctnr_lg}>
        {id_service === 1 && (
          <Connections
            connectSubAcc={connectSubAcc}
            setShowCoonectModal={setShowCoonectModal}
          />
        )}
        <Observations
          obsAccount={obsAccount}
          setShowObsModal={setShowObsModal}
        />
      </div>

      {/* Reclamos y Detalle */}
      <div className={styles.ctnr_lg}>
        <Tasks subAccTasks={subAccTasks} taskHandler={taskHandler} />
        <TaskDetail selectedTask={selectedTask} toTask={toTask} />
      </div>

      {showConnecModal && (
        <Modal
          title="Buscar Conexiones"
          onClose={() => setShowCoonectModal(false)}
        >
          <ConnectionsModal
            onClose={() => setShowCoonectModal(false)}
            connectSubAcc={connectSubAcc}
            login={subAccData?.info[0]?.radius_login}
          />
        </Modal>
      )}
      {showObsModal && (
        <Modal title="Nueva Observacion" onClose={() => setShowObsModal(false)}>
          <ObservationsModal
            onClose={() => setShowObsModal(false)}
            account={id_account}
            onSave={(description, importan) =>
              observationHandler(description, importan)
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default SubAccountDetail;
