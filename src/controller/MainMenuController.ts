import {Response} from "express";
import {MainMenu} from "../model/MainMenu";
import {db} from "../db/firebase";

type Request = {
    body: MainMenu,
    params: { id: string }
}

const addMainMenu = async (req: Request, res: Response) => {
    const {name, title, description, majorMenu} = req.body

    try {
        const mainMenu = db.collection('mainMenus').doc()

        const mainMenuObject = {
            id: mainMenu.id,
            name,
            title,
            description,
            majorMenu
        }

        await mainMenu.set(mainMenuObject)

        res.status(200).send({
            status: 'success',
            message: 'mainMenu created successfully',
            data: mainMenuObject
        })
    } catch (e) {
        res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const getAllMainMenus = async (req: Request, res: Response) => {
    try {
        const allMainMenus: MainMenu[] = []

        const querySnapshot = await db.collection('mainMenus').get()

        querySnapshot.forEach((doc: any) => allMainMenus.push(doc.data()))

        return res.status(200).json({
            status: 'success',
            message: 'mainMenus retrieved successfully',
            data: allMainMenus
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const getMainMenuById = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const mainMenu = db.collection('mainMenus').doc(id)

        const mainMenuObject = (await mainMenu.get()).data()

        return res.status(200).json({
            status: 'success',
            message: 'mainMenu retrieved successfully',
            data: mainMenuObject
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const updateMainMenu = async (req: Request, res: Response) => {
    const {body: {name, title, description, majorMenu}, params: {id}} = req

    try {
        const mainMenu = db.collection('mainMenus').doc(id)

        const currentData = (await mainMenu.get()).data() || {}

        const mainMenuObject = {
            id: currentData.id,
            name: name || currentData.name,
            title: title || currentData.title,
            description: description || currentData.description,
            majorMenu: majorMenu || currentData.majorMenu
        }

        await mainMenu.set(mainMenuObject)
            .catch((e: Error) => {
                return res.status(400).json({
                    status: 'error',
                    message: e.message,
                    data: null
                })
            })

        return res.status(200).json({
            status: 'success',
            message: 'mainMenu updated successfully',
            data: mainMenuObject
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const deleteMainMenu = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const mainMenu = db.collection('mainMenus').doc(id)

        await mainMenu.delete()
            .catch((e: Error) => {
                return res.status(400).json({
                    status: 'error',
                    message: e.message,
                    data: null
                })
            })

        return res.status(200).json({
            status: 'success',
            message: 'mainMenu deleted successfully',
            data: mainMenu
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const getMainMenuWithFoods = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const mainMenu = db.collection('mainMenus').doc(id)

        const mainMenuObject = (await mainMenu.get()).data()

        const foods: any[] = []

        const querySnapshot = await db.collection('foods').where('mainMenuId', '==', id).get()

        querySnapshot.forEach((doc: any) => foods.push(doc.data()))

        return res.status(200).json({
            status: 'success',
            message: 'mainMenu retrieved successfully',
            data: {
                ...mainMenuObject,
                foods
            }
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}


const getAllMainMenuWithFoods = async (req: Request, res: Response) => {
    try {
        const allMainMenus: any[] = []

        const querySnapshot = await db.collection('mainMenus').get()

        for (const doc of querySnapshot.docs) {
            const mainMenuObject = doc.data()

            const foods: any[] = []

            const querySnapshot = await db.collection('foods').where('mainMenuId', '==', mainMenuObject.id).get()

            querySnapshot.forEach((doc: any) => foods.push(doc.data()))

            allMainMenus.push({
                ...mainMenuObject,
                foods
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'mainMenus retrieved successfully',
            data: allMainMenus
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}


const getMainMenuByMajorMenu = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const allMainMenus: MainMenu[] = []

        const querySnapshot = await db.collection('mainMenus').where('majorMenu', '==', id).get()

        querySnapshot.forEach((doc: any) => allMainMenus.push(doc.data()))

        return res.status(200).json({
            status: 'success',
            message: 'mainMenus retrieved successfully',
            data: allMainMenus
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

export {
    addMainMenu,
    getAllMainMenus,
    getMainMenuById,
    updateMainMenu,
    deleteMainMenu,
    getMainMenuWithFoods,
    getAllMainMenuWithFoods,
    getMainMenuByMajorMenu
}
