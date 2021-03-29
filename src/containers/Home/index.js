import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

import Card from "../../components/Card/index";
import { Pie } from "react-chartjs-2";
import { getTasksStatics } from "../../api/index";
import { BrowserView, MobileView } from "react-device-detect";

const Home = () => {
  const [chartsData, setChartsData] = useState();

  /*   const chartDataByService = () => {
    const result = chartsData?.amount_service?.map((el) => el.description_service);
    return result;
  };
 */
  useEffect(() => {
    //chartDataByService();
    getTasksStatics().then((res) => setChartsData(res));
  }, []);

  /*   const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        fill: true,
        lineTension: 0.4,
        backgroundColor: "rgb(34, 124, 157)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [65, 59, 80, 81, 56],
      },y
    ],
  }; */

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
        <div>
          <h3 style={{ margin: "1rem" }}>
            <b>Dashboard</b>
          </h3>
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
                          text: "Reclamos por servicio",
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
            {/* <div className={styles.content}>
          <Card>
            <div className={styles.graphContainer}>
              <div className={styles.graph}>
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {
                      display: true,
                      text: "Reclamos",
                      fontSize: 20,
                    },
                    legend: {
                      display: false,
                    },
                  }}
                />
              </div>
            </div>
          </Card>
        </div> */}
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <h1> This is rendered only on mobile </h1>
      </MobileView>
    </>
  );
};

export default Home;
