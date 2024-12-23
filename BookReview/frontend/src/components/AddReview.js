import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 
export default function AddReview() {
  const [BookTitle, setBookTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [Rating, setRating] = useState(0); 
  const [ReviewText, setReviewText] = useState("");
  const [showModal, setShowModal] = useState(false); 

  const handleStarClick = (index) => {
    setRating(index + 1); 
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Rating) {
        stars.push(<FaStar key={i} onClick={() => handleStarClick(i)} className="star" />);
      } else {
        stars.push(<FaRegStar key={i} onClick={() => handleStarClick(i)} className="star" />);
      }
    }
    return stars;
  };

  function sendData(e) {
    e.preventDefault();
    const newReview = {
      BookTitle,
      Author,
      Rating,
      ReviewText,
    };

    axios
      .post("http://localhost:8070/BookReview/reviews", newReview)
      .then(() => {
        alert("Review Added");
        setBookTitle("");
        setAuthor("");
        setRating(0);
        setReviewText("");
        setShowModal(false); 
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Add Review
      </button>

      {/* Modal for adding review */}
      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <form className="mx-auto w-50 shadow p-5" onSubmit={sendData}>
              <h3 className="mt-5">Fill-up details</h3>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="BookTitle" className="form-label">Book Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="BookTitle"
                      placeholder="Enter Book Title"
                      name="BookTitle"
                      value={BookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Author" className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Author"
                      placeholder="Enter Author Name"
                      name="Author"
                      value={Author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="Rating" className="form-label">Rating</label>
                    <div className="stars-container">
                      {renderStars()}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ReviewText" className="form-label">Review</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ReviewText"
                      placeholder="Enter Review"
                      name="ReviewText"
                      value={ReviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
