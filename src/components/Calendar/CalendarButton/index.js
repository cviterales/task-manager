import style from './style.module.scss'

const CalendarButton = ({ id, type, value, name, onChange }) => {
  return (
    <input
      className={style.calendar}
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default CalendarButton
