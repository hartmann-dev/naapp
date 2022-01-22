import axios from "axios";
import Config from "../constants/Config";

const URL = Config.api_url;
let headers = {};

export const postAppointment = (data) => {
  return axios({
    method: "post",
    url: URL + "/appointmentss/",
    data: data,
    headers: headers,
  });
};
