
import { Router } from "express";

import {
  getSpots,
  getSpotById,
  createSpot,
  updateSpot,
  deleteSpot,
} from "../controllers/spotController.js";

const router = Router();

// READ
router.get("/", getSpots);
router.get("/:id", getSpotById);

// CREATE
// temporary router.post("/", createSpot);
router.post("/", (req, res, next) => {
  console.log("[POST ROUTE] Matched /api/spots");
  next();
}, createSpot);

// UPDATE
router.put("/:id", updateSpot);

// DELETE
router.delete("/:id", deleteSpot);

export default router;
