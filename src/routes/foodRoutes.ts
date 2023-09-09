import * as express from "express";

import {
    addFood,
    deleteFood,
    getAllFoods,
    getFoodById,
    getFoodByMainMenuId,
    updateFood
} from "../controller/foodController";

const router = express.Router();

router.post("/", addFood);
router.get("/", getAllFoods);
router.get("/:id", getFoodById);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);
router.get("/mainMenu/:id", getFoodByMainMenuId);

export default router;
