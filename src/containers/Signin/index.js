import React, { useState } from "react";

import styles from "./signin.module.scss";
import Button from "../../components/Button/index";
import Input from "../../components/InputText/index";
import Spinner from "../../components/Spinner/index";

import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { getLoginUser } from "../../api/index";

import * as actions from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { connectSocket } from "../../webSocket/webSocket";

const Signin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const userHandler = (newUser) => {
    const nickname = newUser;
    setUser(nickname);
    if (error) {
      setError(false);
    }
  };

  const passwordHandler = (newPassword) => {
    const pass = newPassword;
    setPassword(pass);
    if (error) {
      setError(false);
    }
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    if (!error && user.length > 4 && password.length > 2) {
      setLoading(true);
      getLoginUser(user, password)
        .then((response) => {
          setLoading(false);
          if (response.error) {
            setError(true);
            setLoading(false);
          } else {
            dispatch(actions.authLogged(response));
            connectSocket(response.id);
          }
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <div className={styles.content_logo}>
          <img className={styles.logo} src="/images/logon.png" alt="G2 Logo" />
        </div>
        <div className={styles.img_content}>
          <div className={styles.lines}>
            <div className={styles.line}></div>
            <div className={styles.line}>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.img_content_img}>
            <img className={styles.img} src="/images/login.png" alt="G2 Logo" />
          </div>
        </div>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.logForm} onSubmit={(e) => sumbitHandler(e)}>
          <h4 className={styles.formContent}>
            <strong></strong>Inicie sesion para acceder
          </h4>
          <div className={styles.input}>
            <Input
              type="text"
              placeHolder="Usuario"
              icon={faUser}
              iconColor="#4299e1"
              onChange={(e) => {
                userHandler(e.target.value);
              }}
            />
          </div>
          <div className={styles.input}>
            <Input
              type="password"
              placeHolder="Contraseña"
              icon={faLock}
              iconColor="#4299e1"
              onChange={(e) => {
                passwordHandler(e.target.value);
              }}
            />
          </div>
          <div className={styles.content_button}>
            <Button variant="blue" type="submit" onClick={() => {}}>
              {loading ? <Spinner /> : <p>Ingresar</p>}
            </Button>
            <Button variant="outline" type="" onClick={() => {}}>
              <p>Olvido su contraseña?</p>
            </Button>
          </div>
          {error && <p style={{ color: "red" }}>Usuario y/o contraseña incorrecto.</p>}
        </form>
      </div>
    </div>
  );
};

export default Signin;
