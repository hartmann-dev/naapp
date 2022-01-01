import axios from "axios";
import Config from "../constants/Config";

const URL = Config.api_url;
let headers = {};

export const postAppointment = (data) => {
  axios({
    method: "post",
    url: URL + "/appointments/",
    data: data,
    headers: headers,
  })
    .then((response) => {
      const resData = response.data;
      //  console.log(response);
    })
    .catch((error) => {
      //  console.log(data);
      // console.log(error);
      //throw new Error("Ein Fehler ist aufgetreten!");
    });
};
