import AppDimensions from "../constants/Dimensions";
import { Dimensions } from "react-native";


const numCols = type => {
    const { width } = Dimensions.get("window");
    const itemWidth = AppDimensions[type].width + (2 * AppDimensions[type].margin);
    return Math.floor(width / itemWidth)
}

const cardSize = type => {
    let size =  {
        width: AppDimensions[type].width,
        height: AppDimensions[type].height,
        margin: AppDimensions[type].margin,
    }


    return size;

}

export default {
    numCols, cardSize
}