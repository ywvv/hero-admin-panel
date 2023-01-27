import heroes from "./heroes";
import filters from "./filters";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ heroes, filters });

export default rootReducer;
