// calendarRoutes.js

const express = require("express");
const routerCalendar = express.Router();
const nodemailer = require("nodemailer");
const moment = require("moment");

const Event = require("../models/events");
const User = require("../models/userModule");


// 1) Get all events
/**
 * @swagger
 * /api/calander/getEvents:
 *   get:
 *     tags: [Calendar]
 *     summary: Get all events
 *     description: Retrieve all events
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: The start date
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: The end date
 *     responses:
 *       '200':
 *         description: Successfully retrieved all events
 *       '500':
 *         description: Internal server error
 */


// 2) Create an event
/**
 * @swagger
 * /api/calander/createEvent:
 *   post:
 *     tags: [Calendar]
 *     summary: Create an event
 *     description: Create an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               start:
 *                 type: string
 *                 format: date-time
 *               end:
 *                 type: string
 *                 format: date-time
 *               googleMeetURL:
 *                 type: string
 *             required:
 *               - title
 *               - start
 *               - end
 *               - googleMeetURL
 *     responses:
 *       '201':
 *         description: Event created successfully
 *       '400':
 *         description: Missing required data
 *       '500':
 *         description: Internal server error
 */

routerCalendar.get("/getEvents", async (req, res) => {
  const events = await Event.find({
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },
  });
  res.status(200).send(events);
});

routerCalendar.post("/createEvent", async (req, res) => {
  const eventData = req.body;

  // Extract data from the request body
  const { title, start, end, googleMeetURL } = req.body;

  // Validate the data
  if (!title || !start || !end || !googleMeetURL) {
    return res.status(400).send({ error: "Missing required data" });
  }

  // Save the event to the database
  const event = new Event({
    title,
    start,
    end,
    googleMeetURL,
  });

  try {
    const savedEvent = await event.save();

    // Send email notifications to STUDENT users with the Google Meet link
    await sendNotificationToStudents(savedEvent);

    res.status(201).send(savedEvent);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Function to send email notifications to STUDENT users with the Google Meet link
async function sendNotificationToStudents(event) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "yassinedebich214@gmail.com",
      pass: "ubys bnok ansx abpv",
    },
  });

  const { title, start, end, googleMeetURL } = event;

  // Fetch STUDENT users from the database
  const students = await User.find({ role: "STUDENT" });

  // Construct email content
  const mailOptions = {
    from: "yassinedebich214@gmail.com",
    subject: `Invitation to ${title}`,
    html: `
      <h2>Vous êtes invité à rejoindre la réunion "${title}"</h2>
      <p>Heure de début: ${start}</p>
      <p>Heure de fin: ${end}</p>
      <p>Lien Google Meet: <a href="${googleMeetURL}">${googleMeetURL}</a></p>
    `,
  };

  // Send emails to all STUDENT users
  for (const student of students) {
    mailOptions.to = student.email;
    await transporter.sendMail(mailOptions);
  }
}

module.exports = routerCalendar;
