import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./SplitScreen.css";

export default function AllEquipment() {
  const [bookreview, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedAuthor, setUpdatedAuthor] = useState("");
  const [updatedReviewText, setUpdatedReviewText] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(0);

  const [selectedRatingFilter, setSelectedRatingFilter] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc"); 

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8070/BookReview/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => alert(err.message));
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    document.querySelector(".delete-modal").classList.add("show"); 
  };

  const confirmDelete = () => {
    if (deleteId) {
      axios
        .delete(`http://localhost:8070/BookReview/reviews/${deleteId}`)
        .then((res) => {
          alert(res.data.message);
          navigate(0);
        })
        .catch((err) => alert(err.message));
      setDeleteId(null);
      document.querySelector(".delete-modal").classList.remove("show"); 
    }
  };
  const handleClose = () => {
    
    document.querySelector(".update-form").classList.remove("show");
    setSelectedReview(null); 
  };
  

  const cancelDelete = () => {
    setDeleteId(null);
    document.querySelector(".delete-modal").classList.remove("show"); 
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? <FaStar key={i} className="star" /> : <FaRegStar key={i} className="star" />
    );
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const handleEdit = (review) => {
    
    if (review) {
      setSelectedReview(review);
      setUpdatedTitle(review.BookTitle);
      setUpdatedAuthor(review.Author);
      setUpdatedReviewText(review.ReviewText);
      setUpdatedRating(review.Rating);
      document.querySelector(".update-form").classList.add("show");
    }
  };
  

  const handleUpdate = () => {
    const updatedReview = {
      BookTitle: updatedTitle,
      Author: updatedAuthor,
      ReviewText: updatedReviewText,
      Rating: updatedRating,
    };

    axios
      .put(`http://localhost:8070/BookReview/reviews/${selectedReview._id}`, updatedReview)
      .then(() => {
        alert("Review updated successfully");
        navigate(0);
        setSelectedReview(null);
        document.querySelector(".update-form").classList.remove("show"); 
      })
      .catch((err) => alert(err.message));
  };

  const renderEditableStars = (rating, setRating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="star editable" onClick={() => setRating(i + 1)} />
      ) : (
        <FaRegStar key={i} className="star editable" onClick={() => setRating(i + 1)} />
      )
    );
  };

  const handleAddReview = () => {
    const newReview = {
      BookTitle: newReviewTitle,
      Author: newReviewAuthor,
      ReviewText: newReviewText,
      Rating: newReviewRating,
    };

    axios
      .post("http://localhost:8070/BookReview/reviews", newReview)
      .then((res) => {
        alert("Review added successfully");
        navigate(0);
        setShowModal(false);
      })
      .catch((err) => alert(err.message));
  };

  // Sorting reviews by date added
  const sortedReviews = [...bookreview].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.DateAdded) - new Date(b.DateAdded);
    } else {
      return new Date(b.DateAdded) - new Date(a.DateAdded);
    }
  });

  return (
    <div className="split-container">
      <div className="left-section">
        <div className="review-box">
          <p>One More Page</p>
        </div>
        <div className="left-description">
          <div className="review-box2">
            <p>
              Book reviews provide thoughtful insights into the content, themes, and writing style of a book, helping readers decide if it aligns with their interests. They offer a summary of the book’s key points without revealing too much, followed by a critical evaluation of its strengths and weaknesses. Reviews often highlight the emotions, ideas, or lessons the book evokes, making them a useful tool for readers seeking meaningful and engaging literature. Whether celebrating a book’s brilliance or critiquing its shortcomings, reviews serve as a bridge between authors and readers, fostering a shared appreciation for storytelling.
            </p>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="container mt-5">
          <header
            className="sticky-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="text"
                placeholder="Find books, and more..."
                className="form-control"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="filter-sort-container">
            <div className="filter-rating">
              <label>Filter by Rating:</label>
              <select
                value={selectedRatingFilter}
                onChange={(e) => setSelectedRatingFilter(parseInt(e.target.value))}
              >
                <option value={0}>All Ratings</option>
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
            <div className="sort-date">
              <label>Sort by Date</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              Add Review
            </button>
          </header>

       

          <div className="mt-3">
            {showModal && (
              <div className="modal" style={{ display: "block" }}>
                <div className="modal-content">
                  <span className="close" onClick={() => setShowModal(false)}>
                    &times;
                  </span>
                  <h3>Add a New Review</h3>
                  <div className="form-group">
                    <label>Book Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Review</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <div>{renderEditableStars(newReviewRating, setNewReviewRating)}</div>
                  </div>
                  <button className="btn btn-primary" onClick={handleAddReview}>
                    Add Review
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="row">
            {sortedReviews
              .filter((review) => {
                return (
                  (selectedRatingFilter === 0 || review.Rating === selectedRatingFilter) &&
                  (review.BookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    review.Author.toLowerCase().includes(searchTerm.toLowerCase()))
                );
              })
              .map((review, index) => (
                <div className="col-12 mb-4" key={index}>
                  <div className="card transparent-card">
                    <div className="card-body">
                      <p className="card-rating">{renderStars(review.Rating)}</p>
                      <h2 className="card-title">Title -{review.BookTitle}</h2>
                      <h5 className="card-subtitle mb-2 text-muted">Author -{review.Author}</h5>
                      <p className="card-text">{review.ReviewText}</p>
                      <p className="card-date">{formatDate(review.DateAdded)}</p>
                      <div className="action-buttons">
                        <button
                          className="btn btn-default"
                          onClick={() => handleEdit(review)}
                        >
                          <AiFillEdit className="edit-icon" />
                        </button>
                        <button
                          className="btn btn-default"
                          onClick={() => handleDelete(review._id)}
                        >
                          <MdDelete className="delete-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        
          <div className="update-form">
            <h5>Edit Review</h5>
            <div className="form-group">
              <label>Book Title</label>
              <input
                type="text"
                className="form-control"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                className="form-control"
                value={updatedAuthor}
                onChange={(e) => setUpdatedAuthor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Review Text</label>
              <input
                      type="text"
                className="form-control"
                value={updatedReviewText}
                onChange={(e) => setUpdatedReviewText(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div>{renderEditableStars(updatedRating, setUpdatedRating)}</div>
            </div>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update Review
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleClose} >Close</button>
          </div>

          {/* Delete confirmation modal */}
          <div className="delete-modal">
            <div className="delete-modal-content">
              <h5>Are you sure you want to delete this review?</h5>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
