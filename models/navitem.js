class NavItem {
  constructor(id, title, bgColor, icon, target, extern, params) {
    this.id = id;
    this.title = title;
    this.bgColor = bgColor;
    this.icon = icon;
    this.target = target;
    this.extern = extern == "extern" || extern == true ? true : false;
    this.params = params;
  }
}

export default NavItem;
