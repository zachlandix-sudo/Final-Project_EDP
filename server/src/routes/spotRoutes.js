
import { Router } from "express";
import { uploadSpotImage } from "../middleware/upload.js";

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
router.post("/upload", (req, res, next) => {
  uploadSpotImage(req, res, (error) => {
    if (error) return next(error);

    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image to upload.",
      });
    }

    return res.status(201).json({
      message: "Image uploaded successfully.",
      imageUrl: `/uploads/${req.file.filename}`,
    });
  });
});
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
