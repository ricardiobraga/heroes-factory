import { Router } from "express";
import { HeroController } from "./controllers/HeroController";

const heroesRoutes = Router();
const controller = new HeroController();

heroesRoutes.post("/", controller.create);
heroesRoutes.get("/", controller.list);
heroesRoutes.put("/:id", controller.update);
heroesRoutes.delete("/:id", controller.delete);

export { heroesRoutes };
