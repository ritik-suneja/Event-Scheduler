import { combineReducers } from "redux";
import eventreducer from "./eventreducer";

const reducers = combineReducers({
    data: eventreducer
})

export default reducers;