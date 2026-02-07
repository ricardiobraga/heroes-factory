import { Router } from "express";
import { HeroController } from "./controllers/HeroController";
import { HeroStatusController } from "./controllers/HeroStatusController";

const heroesRoutes = Router();
const controller = new HeroController();
const heroStatusController = new HeroStatusController();

heroesRoutes.post("/", controller.create);
heroesRoutes.get("/", controller.list);
heroesRoutes.put("/:id", controller.update);
heroesRoutes.delete("/:id", controller.delete);
heroesRoutes.patch("/:id/status", heroStatusController.update);

export { heroesRoutes };