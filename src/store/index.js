import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import redusers from "./redusers"

export default createStore(combineReducers(redusers), applyMiddleware(thunk))