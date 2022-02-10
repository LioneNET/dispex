import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import redusers from "./redusers";

const rootReduser = combineReducers(redusers)

export default createStore(rootReduser, applyMiddleware(thunk))