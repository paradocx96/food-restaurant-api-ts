import * as express from 'express'

import {
    addCarousel,
    deleteCarousel,
    getAllCarousels,
    getCarouselById,
    updateCarousel
} from '../controller/CarouselController'

const router = express.Router();

router.post('/', addCarousel);
router.get('/', getAllCarousels);
router.get('/:id', getCarouselById);
router.put('/:id', updateCarousel);
router.delete('/:id', deleteCarousel);

export default router;
