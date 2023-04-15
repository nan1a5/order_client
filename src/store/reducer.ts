import { combineReducers } from "redux";
import { trolleyReducer } from "./trolley";
import { pageReducer } from "./page";

export const rootReducer = combineReducers({
    trolley: trolleyReducer,
    page: pageReducer
});