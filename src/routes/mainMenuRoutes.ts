import * as express from 'express';

import {
    addMainMenu,
    deleteMainMenu,
    getAllMainMenus,
    getAllMainMenuWithFoods,
    getMainMenuById,
    getMainMenuByMajorMenu,
    getMainMenuWithFoods,
    updateMainMenu
} from '../controller/MainMenuController';

const router = express.Router();

router.post('/', addMainMenu);
router.get('/', getAllMainMenus);
router.get('/:id', getMainMenuById);
router.put('/:id', updateMainMenu);
router.delete('/:id', deleteMainMenu);
router.get('/foods/:id', getMainMenuWithFoods);
router.get('/all/foods', getAllMainMenuWithFoods);
router.get('/majorMenu/:id', getMainMenuByMajorMenu);

export default router;
