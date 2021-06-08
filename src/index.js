import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.scss"
import "./styles/fonts/RobotoRegular.ttf"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/store"
import { AnimatePresence } from "framer-motion"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

serviceWorkerRegistration.register()

reportWebVitals()
