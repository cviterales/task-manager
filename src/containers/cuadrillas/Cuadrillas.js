import React, { useState, useEffect } from "react";
import styles from "./cuadrilla.module.scss";

import { useSelector } from "react-redux";
import WorkTeam from "../../components/WorkTeam";
import Button from "../../components/Button";
import ListTeams from "./ListTeams/ListTeams";
import { getTeams, getOperators, getVehicles, createTeam, updateTeam, closeTeam } from "../../api/index";
import withPermission from "../../hoc/withPermission/withPermission";

const Cuadrillas = () => {
  const user = useSelector((state) => state.auth.user);

  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({
    id_team: null,
    id_vehicle: null,
    operators: [],
  });
  const [teamData, setTeamData] = useState({
    vehicles: [],
    operators: [],
  });

  const handlerCloseData = async () => {
    return closeTeam(user.id_service, selectedTeam.id_team)
      .then((res) => {
        getTeams(user.id_service).then((res) => {
          setTeams(res);
        });
        setSelectedTeam({
          id_team: null,
          id_vehicle: null,
          operators: [],
        });
        return res;
      })
      .catch((res) => {
        return res;
      });
  };

  const handleSendData = async (selectedVehicle, selectedOperators) => {
    if (selectedTeam.id_team) {
      return updateTeam(user.id_service, selectedTeam.id_team, selectedVehicle, selectedOperators)
        .then((res) => {
          getTeams(user.id_service).then((res) => {
            setTeams(res);
          });
          return res;
        })
        .catch((res) => {
          return res;
        });
    } else {
      return createTeam(user.id_service, selectedVehicle, selectedOperators)
        .then((res) => {
          getTeams(user.id_service).then((res) => {
            setTeams(res);
          });
          return res;
        })
        .catch((res) => {
          return res;
        });
    }
  };

  const setDataHandler = async (id_team) => {
    let operators = await getOperators(user.id_service, id_team);
    let vehicles = await getVehicles(user.id_service, id_team);
    setTeamData({
      vehicles: vehicles,
      operators: operators,
    });
    setOpen(true);
  };

  const handleEditTeam = async (val) => {
    setSelectedTeam({
      id_team: val.id_team,
      id_vehicle: val.id_vehicle,
      operators: val.operators,
    });
    setDataHandler(val.id_team);
  };

  const handlerCreateTeam = async () => {
    setSelectedTeam({
      id_team: null,
      id_vehicle: null,
      operators: [],
    });
    setDataHandler("");
  };

  const handlerClose = (e) => {
    setOpen(false);
    e.preventDefault();
  };

  useEffect(() => {
    getTeams(user.id_service).then((res) => {
      setTeams(res);
    });
  }, [user]);

  return (
    <>
      <div className={styles.header}>
        <h3 style={{ marginBottom: "1rem" }}>
          <span className={styles.boldText}>Cuadrillas</span>
        </h3>
        <Button variant="outline" disabled={false} type="submit" onClick={handlerCreateTeam}>
          <p style={{ fontSize: "16px" }}>Crear</p>
        </Button>
      </div>
      <div className={styles.wrapper}>
        {teams && (
          <>
            <ListTeams data={teams} sendData={handleEditTeam} />
            <div className={open ? styles.modal_open : styles.modal_close}>
              {open && (
                <WorkTeam
                  onClose={handlerClose}
                  sendData={handleSendData}
                  deleteData={handlerCloseData}
                  teamData={teamData}
                  selectedTeam={selectedTeam}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default withPermission(Cuadrillas);
