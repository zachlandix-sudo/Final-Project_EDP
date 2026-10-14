import mongoose from "mongoose";
import TouristSpot from "../models/TouristSpot.js";

// GET /api/spots - list spots, with optional search and filters
export async function getSpots(req, res, next) {
  try {
    const {
      search = "",
      category,
      status = "published",
      page = "1",
      limit = "20",
      sort = "newest"
    } = req.query;

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const filter = {};

    if (status !== "all") filter.status = status;
    if (category) filter.category = category;

    if (search.trim()) {
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { description: { $regex: escaped, $options: "i" } },
        { address: { $regex: escaped, $options: "i" } }
      ];
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
      fee_asc: { entranceFee: 1 },
      fee_desc: { entranceFee: -1 }
    };

    const [items, total] = await Promise.all([
      TouristSpot.find(filter)
        .sort(sortOptions[sort] || sortOptions.newest)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      TouristSpot.countDocuments(filter)
    ]);

    res.status(200).json({
      data: items,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/spots/:id - get one spot by MongoDB ObjectId
export async function getSpotById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid tourist spot ID." });
    }

    const spot = await TouristSpot.findById(id).lean();
    if (!spot) {
      return res.status(404).json({ message: "Tourist spot not found." });
    }

    res.status(200).json({ data: spot });
  } catch (error) {
    next(error);
  }
}