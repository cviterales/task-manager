import React, { useCallback, useEffect, useState } from "react";
import style from "./style.module.scss";

import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar/index";
import HeaderCalendar from "../../components/Calendar/HeaderCalendar/HeaderCalendar";

import moment from "moment";
import { getCalendar, getTeams, updateCalendarTask } from "../../api/index";

const Calendario = () => {
  const id_service = useSelector((state) => state.auth.user.id_service);
  const id_user = useSelector((state) => state.auth.user.id);
  const socket_refresh = useSelector((state) => state.auth.isSocketRefresh);

  const monthNow = moment().format("MM");
  const yearNow = moment().format("YYYY");
  const [year, setYear] = useState(yearNow);
  const [month, setMonth] = useState(monthNow);
  const [week, setWeek] = useState(0);
  const [teams, setTeams] = useState();
  const [calendar, setCalendar] = useState();
  const [dayNow, setDayNow] = useState(false);

  const getDaysArray = useCallback((tasks, year, month) => {
    let monthIndex = month - 1; // 0..11 instead of 1..12
    let date = new Date(year, monthIndex, 1);
    let result = [];
    let weekData = [];
    let dayData = {};
    let daysOfMonth = moment(`${year}-${month}`).daysInMonth();
    while (date.getMonth() === monthIndex) {
      let dayDate = moment(`${month}/${date.getDate()}/${year}`).format(
        "DD/MM/YYYY"
      );
      let tasksOfDay = tasks.filter((task) => {
        return task.date === dayDate;
      });
      dayData = {
        day: dayDate,
        isMonth: true,
        tasks: tasksOfDay,
      };
      if (weekData.length <= 6) {
        weekData.push(dayData);
      } else {
        result.push(weekData);
        weekData = [];
        weekData.push(dayData);
      }
      date.setDate(date.getDate() + 1);
      if (date.getDate() === daysOfMonth) {
        result.push(weekData);
      }
    }
    const currenWeek = result.findIndex((el) =>
      el.find((e) => e.day === moment().format("DD/MM/YYYY"))
    );
    if (currenWeek >= 0 && !dayNow) {
      setWeek(currenWeek)
      setDayNow(true)
    }
    return result;
  }, [dayNow]);

  useEffect(() => {
    getTeams(id_service).then((res) => setTeams(res));
    const dateSelected = year + "-" + month;
    getCalendar(id_service, dateSelected).then((res) => {
      const tasks = res;
      const calendar = getDaysArray(tasks, year, month);
      setCalendar(calendar);
    });
  }, [year, month, socket_refresh, id_service, getDaysArray]);



  const updateCalendar = (updateDay, updateTask, updateTeam) => {
    let day = updateDay.day.substring(0, 2);
    let month = updateDay.day.substring(3, 5);
    let year = updateDay.day.substring(6);
    const date = moment(year + "-" + month + "-" + day).format("YYYY-MM-DD");
    const newTeam = updateTeam ? updateTeam.id_team : updateTask.id_team;
    console.log(id_user)
    updateCalendarTask(
      updateTask.id_calendar,
      updateTask.id_task,
      date,
      newTeam,
      updateTask.priority,
      id_user
    ).then(() => {
      const dateSelected = year + "-" + month;
      getCalendar(id_service, dateSelected).then((res) => {
        const tasks = res;
        const calendar = getDaysArray(tasks, year, month);
        setCalendar(calendar);
      });
    });
  };

  const dateHandler = (e) => {
    const updateDateSelected = e.target.value.toString();
    const year = moment(updateDateSelected).format("YYYY");
    const month = moment(updateDateSelected).format("MM");
    setWeek(0);
    setMonth(month);
    setYear(year);
    e.preventDefault();
  };

  const nextWeek = (e) => {
    e.preventDefault();
    let selectedWeek = week;
    const calendarMonth = calendar.length;
    if (selectedWeek === calendarMonth - 1) {
      setWeek(0);
    } else {
      selectedWeek = selectedWeek + 1;
      setWeek(selectedWeek);
    }
  };

  const prevWeek = (e) => {
    e.preventDefault();
    let selectedWeek = week;
    const calendarMonth = calendar.length;
    if (selectedWeek === 0) {
      setWeek(calendarMonth - 1);
    } else {
      setWeek(selectedWeek - 1);
    }
  };

  return (
    <div className={style.wrapper}>
      <HeaderCalendar
        month={month}
        year={year}
        dateHandler={dateHandler}
        prevWeek={prevWeek}
        nextWeek={nextWeek}
      />
      {teams && calendar ? (
        <Calendar
          calendar={calendar}
          teams={teams}
          week={week}
          updateCalendar={updateCalendar}
        />
      ) : null}
    </div>
  );
};

export default Calendario;
