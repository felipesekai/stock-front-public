import {bgColor} from "./Colors";

export const AlterColorRows = (index: number)=>{
    return { backgroundColor: index % 2 > 0 ? bgColor.bgSecondary : bgColor.bgThird }
}