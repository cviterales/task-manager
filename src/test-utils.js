import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/store";
import * as actions from './store/actions/index'

function render(ui) {
  function Wrapper({ children }) {
    const user = {
      id: 14,
      first_name: "Cristian",
      last_name: "Viterales",
      email_address: "cviterales@cooperativabatan.com.ar",
      username: "cristianv",
      photo: "http://181.41.240.26:4000/img/0195e83d37b0f05ca98f340bcbf4b527.png",
      permissions: [
        {
          id_permission: 1,
          permission_description: "Permisos de Administrador",
        },
        {
          id_permission: 14,
          permission_description: "Administradores del sistema",
        },
      ],
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9zZXJ2aWNlIjoxLCJpZF91c2VyIjoxNCwiaWF0IjoxNjE3ODkyNTI0LCJleHAiOjE2MTc5Nzg5MjR9.UP42jEdEc_lBdUepcUmLqvW6IS4GkqR8gCcHR4gNFw4",
    };
    store.dispatch(actions.authLogged(user))
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper});
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
