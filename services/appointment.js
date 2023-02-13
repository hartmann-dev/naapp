import axios from 'axios';
import Config from '../constants/Config';

const URL = Config.api_url;
let headers = { 'Content-Type': 'multipart/form-data' };

export const postAppointment = (data) => {
  return axios({
    method: 'post',
    url: URL + '/appointments/',
    data: data,
    params: {
      populate: '*',
    },
    headers: headers,
  });
};
