import NavItem from "../models/navitem";
const NAVIGATION = [
  new NavItem(1, "News", "#708a85", "./Ausrufezeichen.gif", "News"),
  new NavItem(2, "Galerie", "#809793", "./Kamera.gif", "Gallery"),
  new NavItem(3, "Team", "#90a4a0", "./Team.png", "Team"),
  new NavItem(4, "Gäste", "#a1b1ae", "./Gaeste.png", "Guests"),
  new NavItem(5, "Termine", "#b0bebb", "./Kalender.gif", "Appointments"),
  // new NavItem(5, "FAQ", "#b0bebb",'', "FAQ"),
  new NavItem(6, "Shop", "#c0cbc0", "./Shop.png", "https://www.noarts.de/shop/", "extern"),
];

export default NAVIGATION;
