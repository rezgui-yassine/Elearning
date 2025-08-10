const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  googleMeetURL: {
    type: String,
    required: true, 
  },
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
