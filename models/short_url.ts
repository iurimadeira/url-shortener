import mongoose from "mongoose";
import shortId from "shortid";

export interface IShortURL extends mongoose.Document {
  full: string;
  short: string;
  clicks: number;
}

export const ShortURLSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ShortURL = mongoose.model<IShortURL>("ShortURL", ShortURLSchema, "urls");
export { ShortURL };
