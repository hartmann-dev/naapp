import { Dimensions } from "react-native";

const winDim = Dimensions.get("window");
let factor = 1;

const space = Math.min(winDim.width, winDim.height);

//console.log( "space: "  + space);

if (space < 1400) factor = 3.2;

if (space < 1030) factor = 2.5;

if (space < 840) factor = 2.2;

if (space < 420) factor = 1.7;

if (space < 400) factor = 1.5;

if (space < 350) factor = 1.2;

// console.log( "factor: "  + factor);

const stretchOneItem = (width, margin) => {
  oneItem = (width + margin * 2) * 2 > space;
  if (oneItem) {
    return space - margin * 2;
  }
  return width;
};

const sizes = {
  home: {
    height: 100 * factor,
    width: 100 * factor,
    margin: 15,
  },
  card: {
    height: 200 * factor,
    width: stretchOneItem(150 * factor, 15),
    margin: 15,
  },
  gallery: {
    height: 60 * factor,
    width: 60 * factor,
    margin: 15,
  },
};

export default sizes;
