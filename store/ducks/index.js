import { combineReducers } from "redux";
import articles from "./articles";
import galleries from "./galleries";
import config from "./config";

export default combineReducers({ articles, galleries, config });
