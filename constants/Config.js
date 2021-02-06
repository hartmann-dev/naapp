import Constants from "expo-constants";

let API_URL = Constants.manifest.extra.apiUrlProd;

if (process.env.NODE_ENV === "development") {
  API_URL = Constants.manifest.extra.apiUrlDev;
}
export default {
  api_url: API_URL,
};
