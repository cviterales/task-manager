import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Title = ({ title, subtitle }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      {subtitle?.length && <h5 className={styles.subtitle}>{subtitle}</h5>}
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default Title;
