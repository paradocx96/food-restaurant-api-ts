import {Food} from "./Food";

export interface MainMenu {
    name: string
    title: string
    description: string
    majorMenu: string
    foods?: Food[]
}
