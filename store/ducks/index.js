import { combineReducers } from "redux";
import navigation from "./navigation";
import articles from "./articles";
import galleries from "./galleries";

export default combineReducers({ navigation, articles, galleries });
