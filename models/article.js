import Config from "../constants/Config";
const URL = Config.api_url;

class Article {
  constructor({ id, title, image, date, content, social, type, slug }) {
    this.id = id;
    this.title = title;
    this.image = image ? URL + image : undefined;
    this.content = content;
    this.social = social;
    this.type = type;
    this.date = date;
    this.slug = slug;
  }
}

export default Article;
