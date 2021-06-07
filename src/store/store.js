import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import thunk from "redux-thunk"
import accountReducer from "./reducers/account"
import authReducer from "./reducers/auth"
import closeTaskReducer from "./reducers/closeTask"
import editReducer from "./reducers/edit"
import messageReducer from "./reducers/message"
import taskReducer from "./reducers/task"
import cargoReducer from "./reducers/cargo"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
  auth: authReducer,
  closeTask: closeTaskReducer,
  account: accountReducer,
  message: messageReducer,
  task: taskReducer,
  edit: editReducer,
  cargo: cargoReducer,
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
