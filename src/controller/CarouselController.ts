import {Response} from "express"
import {db} from "../db/firebase"
import {Carousel} from "../model/Carousel"

type Request = {
    body: Carousel,
    params: { id: string }
}

const addCarousel = async (req: Request, res: Response) => {
    const {title, image, url, width, height} = req.body

    try {
        const carousel = db.collection('carousels').doc()

        const carouselObject = {
            id: carousel.id,
            title,
            image,
            url,
            width,
            height
        }

        await carousel.set(carouselObject)

        res.status(200).send({
            status: 'success',
            message: 'carousel created successfully',
            data: carouselObject
        })
    } catch (e) {
        res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const getAllCarousels = async (req: Request, res: Response) => {
    try {
        const allCarousels: Carousel[] = []

        const querySnapshot = await db.collection('carousels').get()

        querySnapshot.forEach((doc: any) => allCarousels.push(doc.data()))

        return res.status(200).json({
            status: 'success',
            message: 'carousels fetched successfully',
            data: allCarousels
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const getCarouselById = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const carousel = db.collection('carousels').doc(id)

        const carouselObject = (await carousel.get()).data()

        return res.status(200).json({
            status: 'success',
            message: 'carousel fetched successfully',
            data: carouselObject
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const updateCarousel = async (req: Request, res: Response) => {
    const {params: {id}, body: {title, image, url, width, height}} = req

    try {
        const carousel = db.collection('carousels').doc(id)

        const currentData = (await carousel.get()).data() || {}

        const carouselObject = {
            id: currentData.id,
            title: title || currentData.title,
            image: image || currentData.image,
            url: url || currentData.url,
            width: width || currentData.width,
            height: height || currentData.height
        }

        await carousel.set(carouselObject)
            .catch((e: Error) => {
                return res.status(400).json({
                    status: 'error',
                    message: e.message,
                    data: null
                })
            })

        return res.status(200).json({
            status: 'success',
            message: 'carousel updated successfully',
            data: carouselObject
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

const deleteCarousel = async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const carousel = db.collection('carousels').doc(id)

        await carousel.delete()
            .catch((e: Error) => {
                return res.status(400).json({
                    status: 'error',
                    message: e.message,
                    data: null
                })
            })

        return res.status(200).json({
            status: 'success',
            message: 'carousel deleted successfully',
            data: null
        })
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: (e as Error).message,
            data: null
        })
    }
}

export {addCarousel, getAllCarousels, getCarouselById, updateCarousel, deleteCarousel}
