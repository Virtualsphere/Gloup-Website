import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, SquarePen } from "lucide-react";
import { review } from "../assets/images";
import {
  getReview,
  updateReview,
  deleteReview,
} from "../redux/slice/reviewSlice";
import logo from "../assets/images/profile.jpg";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function MyReviewList() {
  const dispatch = useDispatch();
  const { myReview, loading } = useSelector((state) => state.review);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  const handleEdit = (review) => {
    setSelectedReview(review);
    setRating(review.rating);
    setDescription(review.review_description);
    setShowEditModal(true);
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId)).unwrap();
    dispatch(getReview());
  };

  const handleSubmitEdit = () => {
    if (!rating || !description.trim()) {
      alert("Please provide both rating and description.");
      return;
    }

    dispatch(
      updateReview({
        id: selectedReview.review_id,
        rating,
        description,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getReview());
        closeModal();
      })
      .catch((err) => {
        alert("Failed to update review. Try again.");
        console.error("Update error:", err);
      });
  };

  const closeModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
    setRating(0);
    setDescription("");
  };

  return (
    <div>
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your reviews...</p>
          </div>
        </div>
      )}

      {!loading && (!myReview || myReview.length === 0) && (
        <>
          {/* Header */}
          <div className="page-header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8 order-md-1 order-2">
                  <div className="page-header-box">
                    <h1 className="text-anime">Review</h1>
                  </div>
                </div>
                <div className="col-md-4 order-md-2 order-1">
                  <div
                    className="page-header-icon-box wow fadeInUp"
                    data-wow-delay="0.5s"
                  >
                    <div className="page-header-icon">
                      <img src={review} alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Empty Message */}
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <div className="text-center">
              <div className="mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  fill="currentColor"
                  className="bi bi-chat-left-dots text-secondary"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2 2a2 2 0 0 0-2 2v9.586a1 1 0 0 0 1.707.707L4.414 12H14a2 2 0 0 0 2-2V4a2 
                2 0 0 0-2-2H2zm0 1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 
                0-.707.293L2 12.586V4a1 1 0 0 1 1-1zm3 3a1 1 0 1 0 0 2 1 1 0 0 
                0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                  />
                </svg>
              </div>
              <h5 className="fw-semibold text-dark mb-2">No Reviews Yet</h5>
              <p className="text-muted mb-3">
                You haven’t reviewed any store yet. Start by visiting a store
                and sharing your experience!
              </p>
              <a href="/" className="btn btn-outline-dark rounded px-4">
                Go to Home
              </a>
            </div>
          </div>
        </>
      )}

      {!loading && myReview && myReview.length > 0 && (
        <>
          {/* Header */}
          <div className="page-header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-8 order-md-1 order-2">
                  <div className="page-header-box">
                    <h1 className="text-anime">Review</h1>
                  </div>
                </div>
                <div className="col-md-4 order-md-2 order-1">
                  <div
                    className="page-header-icon-box wow fadeInUp"
                    data-wow-delay="0.5s"
                  >
                    <div className="page-header-icon">
                      <img src={review} alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="container py-4">
            {myReview.map((item) => (
              <div
                key={item.review_id}
                className="card mb-4 shadow-sm border-0 rounded-4"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={`${baseURL}/images/${item.store_images?.[0]}`}
                        onError={(e) => (e.target.src = logo)}
                        alt="Store"
                        className="rounded"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">{item.store_name}</h6>
                        <div className="text-muted small">
                          {item.addressLine1}, {item.addressLine2}, {item.city}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <SquarePen
                        className="text-dark"
                        style={{ cursor: "pointer" }}
                        title="Edit"
                        onClick={() => handleEdit(item)}
                      />
                      <Trash2
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        title="Delete"
                        onClick={() => handleDelete(item.review_id)}
                      />
                    </div>
                  </div>

                  <hr />

                  <div className="d-flex align-items-center gap-3 mb-2">
                    <img
                      src={
                        item.profilePic
                          ? `${baseURL}/images/${item.profilePic}`
                          : logo
                      }
                      alt="User"
                      className="rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="text-warning fs-5">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </div>
                  </div>

                  <p className="mb-1 text-secondary">
                    {item.review_description}
                  </p>
                  <div className="text-end text-muted small">
                    {moment(item.cretaed_at).format("DD MMM, YYYY h:mm A")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* {showEditModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header bg-light border-0">
                <h5 className="modal-title fw-bold">Edit Your Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body px-4">
                <p className="text-muted mb-2">Rate our service:</p>
                <div className="d-flex justify-content-center mb-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      onClick={() => setRating(value)}
                      style={{
                        cursor: "pointer",
                        fontSize: "26px",
                        color: value <= rating ? "#f1c40f" : "#ccc",
                        marginRight: "8px",
                        transition: "color 0.2s",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  className="form-control rounded-3"
                  rows="4"
                  placeholder="Write your thoughts..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer border-0 d-flex justify-content-between px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3 px-4"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-dark rounded-3 px-4"
                  onClick={handleSubmitEdit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {showEditModal && (
        <div
          className="modal fade show d-flex align-items-center justify-content-center"
          style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
            overflowY: "auto",
            padding: "1rem",
          }}
        >
          <div className="modal-dialog w-100" style={{ maxWidth: "480px" }}>
            <div className="modal-content border-0 shadow rounded-4">
              {/* Modal Header */}
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold"> Edit Your Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body pt-0">
                {/* Star Rating */}
                <div className="mb-4 text-center">
                  <label className="form-label fw-semibold mb-2 d-block">
                    Update Rating
                  </label>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      style={{
                        cursor: "pointer",
                        fontSize: "32px",
                        color: star <= rating ? "#ffc107" : "#e4e5e9",
                        transition: "color 0.2s",
                        marginRight: "6px",
                        userSelect: "none",
                      }}
                      title={`${star} Star${star > 1 ? "s" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                  <div className="mt-1">
                    <small className="text-muted">
                      Current rating: {rating} star{rating !== 1 ? "s" : ""}
                    </small>
                  </div>
                </div>

                {/* Review Description */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Update Review
                  </label>
                  <textarea
                    className="form-control shadow-sm rounded-3"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Update your feedback here..."
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn btn-light border me-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-dark px-4"
                  onClick={handleSubmitEdit}
                  disabled={rating === 0 || description.trim() === ""}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
