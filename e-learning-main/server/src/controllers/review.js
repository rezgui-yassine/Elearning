const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  try {
    const { review } = req.body;
    const { courseId } = req.params;
    const userId = req.user._id; // Ensure req.user._id is properly obtained
    const newReview = new Review({ userId, courseId, comment: review });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res
      .status(500)
      .json({ error: "Unable to add review. Please try again later." });
  }
};

exports.getReviewsByCourseId = async (req, res) => {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by courseId:", error);
    res
      .status(500)
      .json({ error: "Unable to fetch reviews. Please try again later." });
  }
};
