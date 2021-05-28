import * as actionTypes from "./actionTypes";
//import { io } from 'socket.io-client'

export const authLogged = (user) => {
  return {
    type: actionTypes.AUTH_LOGGED,
    payload: user
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const setSocketInstance = (socket) => {
  return {
    type: actionTypes.SET_SOCKET,
    payload: socket
  }
}

const refreshMessage = (value) => {
  return {
    type: actionTypes.SET_SOCKET_REFRESH,
    payload: value
  }
}

export const eventSocketRefresh = (refresh) => {
  return dispatch => {
    dispatch(refreshMessage(refresh))
  }
}

export const updatedService = (id_service) => {
  return {
    type: actionTypes.UPDATED_SERVICE_SELECTED,
    payload: id_service
  }
}