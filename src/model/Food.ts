import {MainMenu} from "./MainMenu";

export interface Food {
    name: string
    description: string
    price: number
    image: string
    mainMenu?: MainMenu
    mainMenuId?: string
}
