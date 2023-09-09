import {Request, Response, Router} from 'express';
import foodRoutes from "./foodRoutes";
import mainMenuRoutes from "./mainMenuRoutes";
import carouselRoutes from "./carouselRoutes";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.send('⚡️ Food Restaurant API ⚡️');
});

routes.use("/api/v1/foods", foodRoutes);
routes.use("/api/v1/mainMenus", mainMenuRoutes);
routes.use("/api/v1/carousels", carouselRoutes);

export default routes;
