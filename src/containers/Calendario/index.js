import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";

import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar/index";
import HeaderCalendar from "../../components/Calendar/HeaderCalendar/HeaderCalendar";
import moment from "moment";
import "moment/locale/es";
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
  const isDayNow = useMemo(() => moment().format("DD/MM/YYYY"), []);

  const getDaysArray = useCallback(
    (tasks, year, month) => {
      //generate day for month selected
      //the calendar contain 5 weeks, 4 weeks of this month and 1 week of the next month or prev month
      let monthData = [];
      let weekData = [];
      let monthIndex = month - 1; // 0..11 instead of 1..12
      let date = new Date(year, monthIndex, 1);
      let indexDay = date.getDay();
      let daysOfMonth;

      // me fijo si el primer dia del mes no es Lunes, entonces me traigo los dias del mes pasado para completar la primera semana.
      if (indexDay !== 1) {
        let newMonth = month - 1 < 1 ? 12 : month - 1;
        let newYear = month - 1 < 1 ? year - 1 : year;
        daysOfMonth = moment(`${newYear}-${newMonth}`).daysInMonth();

        let initialDay = daysOfMonth - (indexDay - 1) + 1;
        for (let day = initialDay; day <= daysOfMonth; day++) {
          let dayDate = moment(`${newMonth}/${day}/${newYear}`).format(
            "DD/MM/YYYY"
          );

          let tasksOfDay = tasks.filter((task) => {
            return task.date === dayDate;
          });

          let dayName = moment(dayDate, "DD/MM/YYYY HH:mm:ss")
            .locale("ES")
            .format("dddd")
            .toUpperCase();
          let monthName = moment(dayDate, "DD/MM/YYYY")
            .locale("ES")
            .format("MMMM")
            .toUpperCase();
          let dayNumber = moment(dayDate, "DD/MM/YYYY HH:mm:ss").date();
          let dayOfMonth = {
            day: dayDate,
            dayNumber: dayNumber,
            dayName: dayName,
            monthName: monthName,
            isMonth: false,
            tasks: tasksOfDay,
          };
          if (weekData.length <= 6) {
            weekData.push(dayOfMonth);
          } else {
            monthData.push(weekData);
            weekData = [];
            weekData.push(dayOfMonth);
          }
        }
      }
      daysOfMonth = moment(`${year}-${month}`).daysInMonth();
      let lastDay = moment(`${month}/${daysOfMonth}/${year}`).format(
        "DD/MM/YYYY"
      );
      lastDay = moment(lastDay, "DD/MM/YYYY HH:mm:ss").day();
      for (let day = 1; day <= daysOfMonth; day++) {
        let dayDate = moment(`${month}/${day}/${year}`).format("DD/MM/YYYY");
        let tasksOfDay = tasks.filter((task) => {
          return task.date === dayDate;
        });
        let dayName = moment(dayDate, "DD/MM/YYYY HH:mm:ss")
          .locale("ES")
          .format("dddd")
          .toUpperCase();
        let monthName = moment(dayDate, "DD/MM/YYYY")
          .locale("ES")
          .format("MMMM")
          .toUpperCase();
        let dayNumber = moment(dayDate, "DD/MM/YYYY HH:mm:ss").date();
        let dayOfMonth = {
          day: dayDate,
          dayNumber: dayNumber,
          dayName: dayName,
          monthName: monthName,
          isMonth: true,
          tasks: tasksOfDay,
        };
        if (weekData.length <= 6) {
          weekData.push(dayOfMonth);
        } else {
          monthData.push(weekData);
          weekData = [];
          weekData.push(dayOfMonth);
        }
      }
      //Me fijo si la ultima semana termina en Domingo, sino ya se que arranca una semana nueva y necesito completarla con los dias del mes siguiente.
      if (lastDay !== 0) {
        const cantNextDay = 7 - lastDay;
        // sumo dos por que retorna el indice del mes y los indices inician en cero y el state month es un string.
        const newMonth = date.getMonth() + 2 > 12 ? 1 : date.getMonth() + 2;
        const newYear = date.getMonth() + 2 > 12 ? year + 1 : year;
        for (let day = 1; day <= cantNextDay; day++) {
          let dayDate = moment(`${newMonth}/${day}/${newYear}`).format(
            "DD/MM/YYYY"
          );
          let tasksOfDay = tasks.filter((task) => {
            return task.date === dayDate;
          });
          // nextDay hace referencia al primer dia del mes siguiente.
          let dayName = moment(dayDate, "DD/MM/YYYY HH:mm:ss")
            .locale("ES")
            .format("dddd")
            .toUpperCase();
          let monthName = moment(dayDate, "DD/MM/YYYY")
            .locale("ES")
            .format("MMMM")
            .toUpperCase();

          let dayNumber = moment(dayDate, "DD/MM/YYYY HH:mm:ss").date();

          let dayOfMonth = {
            day: dayDate,
            dayNumber: dayNumber,
            dayName: dayName,
            monthName: monthName,
            isMonth: false,
            tasks: tasksOfDay,
            dayi: day,
          };

          if (weekData.length <= 6) {
            weekData.push(dayOfMonth);
          } else {
            monthData.push(weekData);
            weekData = [];
            weekData.push(dayOfMonth);
          }
        }
      }
      monthData.push(weekData);
      const currenWeek = monthData.findIndex((el) =>
        el.find((e) => e.day === isDayNow)
      );
      if (currenWeek >= 0 && !dayNow) {
        setWeek(currenWeek);
        setDayNow(true);
      }
      return monthData;
    },
    [dayNow, isDayNow]
  );

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
