import axios from 'axios';
import Config from '../constants/Config';
import { getLocale } from '../utils/locale';
const URL = Config.api_url;
let headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};

const instance = axios.create({
  baseURL: URL,
  headers,
  params: {
    locale: getLocale(),
    populate: '*',
  },
});

export default instance;
