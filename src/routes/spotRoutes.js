import { Router } from "express";
import { getSpots, getSpotById } from "../controllers/spotController.js";

const router = Router();

router.get("/", getSpots);
router.get("/:id", getSpotById);

export default router;