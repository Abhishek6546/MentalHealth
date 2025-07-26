import mongoose from "mongoose";

const TherapistSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  experience: Number,
  languages: [String],
  availableSlots: [String], // e.g., ['2025-07-28T16:00']
});

export const Therapist = mongoose.model("Therapist", TherapistSchema);
