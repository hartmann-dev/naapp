import Config from "../constants/Config";
const URL = Config.api_url;

class Image {
  constructor({ id, url, width, height }) {
    this.id = id;
    this.url = URL + url;
    this.dimensions = { width: width, height: height };
  }
}

export default Image;
