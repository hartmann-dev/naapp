import axios from "axios";
import Config from "../constants/Config";

const URL = Config.api_url;
let headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: URL,
  headers,
});

export default instance;
