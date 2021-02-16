import NavItem from "../models/navitem";
const NAVIGATION = [
  new NavItem(1, "News", "#708a85", "./2020/07/Ausrufezeichen.png", "News"),
  new NavItem(2, "Galerie", "#809793", "./2020/07/Kamera.png", "Gallery"),
  new NavItem(3, "Team", "#90a4a0", "./2020/06/Team.png", "Artist", false, {
    type: "Team",
    title: "Team",
  }),
  new NavItem(4, "Gäste", "#a1b1ae", "./2020/06/Gaeste.png", "Artist", false, {
    type: "Guest",
    title: "Gäste",
  }),
  new NavItem(
    5,
    "Termine",
    "#b0bebb",
    "./2020/07/Kalender.png",
    "Appointments"
  ),
  // new NavItem(5, "FAQ", "#b0bebb",'', "FAQ"),
  new NavItem(
    6,
    "Shop",
    "#c0cbc0",
    "./2020/06/Shop.png",
    "https://www.noarts.de/shop/",
    "extern"
  ),
];

export default NAVIGATION;
