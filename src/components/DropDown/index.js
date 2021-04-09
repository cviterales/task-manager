import style from "./style.module.css";
import PropTypes from "prop-types";

const DropDown = ({ data, form, name, id, onChange, selectedValue = 0, disabled = false }) => {
  const newData = [{ id: 0, name: "Seleccione..." }, ...data];
  const displayOptions = (data) => {
    return data.map((el, index) => {
      return (
        <option value={el.id} key={el.name + el.id} disabled={index === 0 ? true : false} selected={selectedValue === index ? true : false}>
          {el.name ? el.name : "No hay datos"}
        </option>
      );
    });
  };

  return (
    <select
      disabled={disabled}
      data-testid={name}
      className={style.select}
      name={name}
      form={form}
      id={id}
      onChange={onChange}
      required
    >
      {displayOptions(newData)}
    </select>
  );
};

DropDown.propTypes = {
  form: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  selectedValue: PropTypes.number,
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default DropDown;
