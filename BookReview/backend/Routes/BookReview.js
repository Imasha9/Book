const express = require("express");
const router = express.Router();
const cors = require("cors");
const BookReview = require("../models/BookReview");


const { ObjectId } = require("mongoose").Types;
router.use(cors());





//route for create
router.post("/reviews", async (req, res) => {
  const {
    BookTitle,
    Author,
    Rating,
    ReviewText,
  } = req.body;

  try {
    const newReview = new BookReview({
    BookTitle,
    Author,
    Rating,
    ReviewText,
    });

    await newReview.save();

    res.json("Review Added");
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json(errors);
    }
    console.error("Error adding review:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});




//route for read
router.route("/reviews").get((req,res)=>{
    BookReview.find().then((reviewRt)=>{
        res.json(reviewRt)
    }).catch((err)=>{
        console.log(err)
    }) 
})

// Route for updating a review
router.route("/reviews/:id").put(async (req, res) => {
  const reviewId = req.params.id; 
  const { BookTitle, Author, Rating, ReviewText, DateAdded } = req.body;

  // Create an object to update the review
  const updateReview = {
    BookTitle,
    Author,
    Rating,
    ReviewText,
    DateAdded,
  };

  try {
    const updatedReview = await BookReview.findByIdAndUpdate(reviewId, updateReview, { new: true });

    if (updatedReview) {
      res.status(200).send({ status: "Review updated", updatedReview });
    } else {
      res.status(404).send({ status: "Review not found" });
    }
  } catch (err) {
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});



// Route for deleting a review by ID
router.delete('/reviews/:id', async (req, res) => {
  const { id } = req.params; // Extract id from URL params
  try {
    const deletedReview = await BookReview.findByIdAndDelete(id);
    
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.status(200).json({ message: 'Review deleted successfully', deletedReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get data from one student (or equipment based on context)
router.route("/view/:id").get(async (req, res) => {
  const id = req.params.id; 
  try {
    const bookreview = await BookReview.findById(id);

    if (!bookreview) {
      return res.status(404).json({ message: 'review not found' });
    }

    res.status(200).send({ status: "review fetched", bookreview });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      status: "Error with fetching review",
      error: `An error occurred while fetching the review: ${err.message}`,
    });
  }
});

 
module.exports=router;