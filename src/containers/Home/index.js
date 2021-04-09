import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Card from "../../components/Card/index";
import { Pie } from "react-chartjs-2";
import { getTasksStatics, getTasksTeam } from "../../api/index";
import { BrowserView, MobileView } from "react-device-detect";
import TaskItem from "../Reclamos/TaskItem/TaskItem";
import AnimatedListItem from "../../components/Animations/AnimatedListItem/AnimatedListItem";
import Modal from "../../components/Modal/index";
import TaskStateModal from "./TaskStateModal/TaskStateModal";
import { useSelector } from "react-redux";

const Home = () => {
  const id_user = useSelector((state) => state?.auth?.user?.id);

  const [chartsData, setChartsData] = useState();
  const [currentTasks, setCurrentTasks] = useState();
  const [open, setOpen] = useState(false);
  const [selectedReclamo, setSelectedReclamo] = useState({});

  const handlerTask = (reclamo) => {
    setSelectedReclamo(reclamo);
    if (!open) {
      setOpen(true);
    }
  };

  const renderTasks = () => {
    if (Array.isArray(currentTasks)) {
      return currentTasks.map((e, i) => (
        <AnimatedListItem key={i + e.id_task}>
          <TaskItem reclamo={e} handlerTask={handlerTask} />
        </AnimatedListItem>
      ));
    }
  };

  useEffect(() => {
    getTasksTeam(id_user).then((res) => setCurrentTasks(res));
    getTasksStatics().then((res) => setChartsData(res));
  }, [id_user]);

  const pieDataTasks = {
    datasets: [
      {
        data: chartsData?.amount_type?.map((el) => el.amount),
        backgroundColor: [
          "rgb(34, 124, 157)",
          "rgb(23, 195, 178)",
          "rgb(255, 203, 119)",
          "rgb(254, 109, 115)",
          "rgb(144,221,240)",
        ],
        hoverBackgroundColor: [
          "rgb(29, 106, 134)",
          "rgb(19, 164, 150)",
          "rgb(255, 185, 71)",
          "rgb(254, 72, 78)",
          "rgb(111,211,235)",
        ],
      },
    ],
    labels: chartsData?.amount_type?.map((el) => el.description_type),
  };

  const pieDataServices = {
    datasets: [
      {
        data: chartsData?.amount_service?.map((el) => el.amount),
        backgroundColor: [
          "rgb(34, 124, 157)",
          "rgb(23, 195, 178)",
          "rgb(255, 203, 119)",
          "rgb(254, 109, 115)",
          "rgb(144,221,240)",
        ],
        hoverBackgroundColor: [
          "rgb(29, 106, 134)",
          "rgb(19, 164, 150)",
          "rgb(255, 185, 71)",
          "rgb(254, 72, 78)",
          "rgb(111,211,235)",
        ],
      },
    ],
    labels: chartsData?.amount_service?.map((el) => el.description_service),
  };

  return (
    <>
      <BrowserView>
        <div className={styles.header}>
          <h3 style={{ marginBottom: "1rem" }}>
            <span className={styles.boldText}>Home</span>
          </h3>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Card>
              <div className={styles.graphContainer}>
                <div className={styles.graph}>
                  <Pie
                    data={pieDataServices}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      title: {
                        display: true,
                        text: "Tareas por servicio",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                      },
                    }}
                  />
                </div>
                <div className={styles.graph}>
                  <Pie
                    data={pieDataTasks}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      title: {
                        display: true,
                        text: "Tareas pendientes",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                      },
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        {currentTasks && renderTasks()}
        {open && (
          <Modal title={`Nuevo Estado`} onClose={() => setOpen(false)}>
            <TaskStateModal onClose={() => setOpen(false)} task={selectedReclamo} />
          </Modal>
        )}
      </MobileView>
    </>
  );
};

export default Home;
