import style from './style.module.scss'
import PropTypes from "prop-types";

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

CalendarButton.propTypes = {
  id: PropTypes.string, 
  type: PropTypes.string, 
  value: PropTypes.any, 
  name: PropTypes.string, 
  onChange: PropTypes.func
}
export default CalendarButton
