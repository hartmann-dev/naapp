import Config from "../constants/Config";

const URL = Config.api_url;
class Artist {
  constructor(
    id,
    name,
    image,
    image_width,
    image_height,
    content,
    social,
    type
  ) {
    this.id = id;
    this.name = name;
    this.image = URL + image;
    this.image_width = image_width;
    this.image_height = image_height;
    this.content = content;
    this.social = social;
    this.type = type;
  }
}

export default Artist;
