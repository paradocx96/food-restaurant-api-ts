import {Response} from "express"
import {Food} from "../model/Food";
import {db} from "../db/firebase"


type Request = {
    body: Food,
    params: { id: string }
}

const addFood = async (req: Request, res: Response) => {
    const {name, description, price, image, mainMenuId} = req.body

    try {
        const food = db.collection('foods').doc()

        const foodObject = {
            id: food.id,
            name,
            description,
            price,
            image,
            mainMenuId
        }

        await food.set(foodObject)

        res.status(200).send({
            status: 'success',
            message: 'food created successfully',
            data: foodObject
        })
    } catch (e) {
        res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const getAllFoods = async (req: Request, res: Response) => {
    try {
        const allFoods: Food[] = []

        const querySnapshot = await db.collection('foods').get()

        querySnapshot.forEach((doc: any) => allFoods.push(doc.data()))

        return res.status(200).json({
            status: 'success',
            message: 'foods fetched successfully',
            data: allFoods
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const getFoodById = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const food = db.collection('foods').doc(id)

        const foodObject = (await food.get()).data()

        return res.status(200).json({
            status: 'success',
            message: 'food fetched successfully',
            data: foodObject
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}


const updateFood = async (req: Request, res: Response) => {
    const {body: {name, description, price, image, mainMenuId}, params: {id}} = req

    try {
        const food = db.collection('foods').doc(id)

        const currentData = (await food.get()).data() || {}

        const foodObject = {
            id: currentData.id,
            name: name || currentData.name,
            description: description || currentData.description,
            price: price || currentData.price,
            image: image || currentData.image,
            mainMenuId: mainMenuId || currentData.mainMenuId
        }

        await food.set(foodObject)
            .catch((e: Error) => {
                return res.status(400).json({
                    status: 'error',
                    message: e.message,
                    data: null
                })
            })

        return res.status(200).json({
            status: 'success',
            message: 'food updated successfully',
            data: foodObject
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const deleteFood = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const food = db.collection('foods').doc(id)

        await food.delete()
            .catch((e: Error) => {
                return res.status(400).json({
                    status: 'error',
                    message: e.message,
                    data: null
                })
            })

        return res.status(200).json({
            status: 'success',
            message: 'food deleted successfully',
            data: food
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const getFoodByMainMenuId = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const allFoods: Food[] = []

        const querySnapshot = await db.collection('foods').where('mainMenuId', '==', id).get()

        querySnapshot.forEach((doc: any) => allFoods.push(doc.data()))

        return res.status(200).json({
            status: 'success',
            message: 'foods fetched successfully',
            data: allFoods
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}


export {addFood, getAllFoods, getFoodById, updateFood, deleteFood, getFoodByMainMenuId}
