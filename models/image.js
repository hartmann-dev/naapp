import Config from "../constants/Config";
const URL = Config.api_url;

class Image {
  constructor({ id, title, url, date, content, social, type }) {
    this.id = id;
    this.tilte = title;
    this.url = URL + url;
    this.date = date;
    this.dimensions = { width: width, height: height };
  }
}

export default Image;
