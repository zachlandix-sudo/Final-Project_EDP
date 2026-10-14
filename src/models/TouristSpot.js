import mongoose from "mongoose";

const touristSpotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tourist spot name is required."],
      trim: true,
      maxlength: 150
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: ["Nature", "Beach", "Religious", "Historical", "Adventure", "Cultural", "Other"]
    },
    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true
    },
    coordinates: {
      latitude: {
        type: Number,
        min: -90,
        max: 90
      },
      longitude: {
        type: Number,
        min: -180,
        max: 180
      }
    },
    entranceFee: {
      type: Number,
      min: 0,
      default: 0
    },
    estimatedTravelCost: {
      type: Number,
      min: 0,
      default: 0
    },
    openingHours: {
      type: String,
      trim: true,
      default: ""
    },
    contactDetails: {
      type: String,
      trim: true,
      default: ""
    },
    imageUrl: {
      type: String,
      trim: true,
      default: ""
    },
    gallery: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ["draft", "published", "inactive"],
      default: "published"
    }
  },
  { timestamps: true }
);

touristSpotSchema.index({ name: "text", description: "text", address: "text" });

export default mongoose.model("TouristSpot", touristSpotSchema);