//import styles from './checkbox.module.sass'
import styles from './checkbox.module.scss'
import PropTypes from 'prop-types';

const Checkbox = ({ label, name, onChange, check, disabled }) => {
  return (
    <label htmlFor={name} className={styles.container}>
      {label.length > 0 && label}
      <input
        id={name}
        data-testid={name}
        name={name}
        type="checkbox"
        defaultChecked={check}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.checkmark}></span>
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
  disabled: PropTypes.bool
}

export default Checkbox
