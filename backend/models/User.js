const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookedAppointments: [{
    therapistId: mongoose.Schema.Types.ObjectId,
    time: String
  }]
});

module.exports = mongoose.model("User", UserSchema);
