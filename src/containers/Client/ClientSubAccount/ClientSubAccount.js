import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Modal from "../../../components/Modal";
import NewTaskModal from "../../../components/NewTaskModal/index";
import Spinner from "../../../components/Spinner/index";
import { getSubAccountData, getSubAccountConnections, getTasks, createTask } from "../../../api/index";
import { useSelector } from "react-redux";
import SubAccountDetail from "./SubAccountDetail/SubAccountDetail";

const ClientSubAccount = (props) => {
  const id_service = useSelector((state) => state.auth.user.id_service);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [subAccData, setSubAccData] = useState([]);
  const [connectSubAcc, setConnecSubAcc] = useState();
  const [subAccTasks, setSubAccTasks] = useState([]);

  useEffect(() => {
    if (props.location.state.client_sub_account) {
      getSubAccountData(id_service, props.location.state.client_sub_account).then((res) => {
        setSubAccData(res);
        getSubAccountConnections(res.info[0].radius_login, "", "").then((res) => {
          setConnecSubAcc(res);
        });
      });
      getTasks(id_service, "", props.location.state.client_sub_account, "", "", "", "", "").then((res) => {
        setSubAccTasks(res);
      });
    } else {
      getTasks(id_service, "", props.location.state.client_id, "", "", "", "", "").then((res) => {
        setSubAccTasks(res);
      });
      getSubAccountData(id_service, props.location.state.client_id).then((res) => {
        setSubAccData(res);
      });

      //props.history.goBack();
    }
  }, [id_service, props.location.state.client_sub_account, props.location.state.client_id]);

  return (
    <>
      {subAccData.info ? (
        <SubAccountDetail
          subAccData={subAccData}
          setShowTaskModal={setShowTaskModal}
          location={props.location}
          connectSubAcc={connectSubAcc}
          subAccTasks={subAccTasks}
        />
      ) : (
        <div className={styles.contentCentered}>
          <Spinner color="#4299e1" size="4rem" />
        </div>
      )}

      {showTaskModal && (
        <Modal title="Nuevo Reclamo" onClose={() => setShowTaskModal(false)}>
          <NewTaskModal
            id={props.location.state.client_id}
            sid={props.location.state.client_sub_account}
            serviceType={subAccData?.service[0].id_service_type}
            onClose={() => setShowTaskModal(false)}
            onSave={(id_service, sid, taskType, idProblem, description) =>
              createTask(id_service, sid, taskType, idProblem, description)
            }
          />
        </Modal>
      )}
    </>
  );
};

export default ClientSubAccount;
