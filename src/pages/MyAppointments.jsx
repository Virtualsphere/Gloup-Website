import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { booking } from "../assets/images";
import {
  cancelBook,
  getAllAppointments,
  rescheduleBook,
} from "../redux/slice/appointmentsSlice";
import { Modal, Button } from "react-bootstrap";
import { fetchAvailableSlots } from "../redux/slice/slotSlice";
import { CalendarIcon } from "lucide-react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  startOfDay,
  isBefore,
} from "date-fns";
import toast from "react-hot-toast";
import { addReview } from "../redux/slice/reviewSlice";
const BookingCard = ({
  booking,
  onReschedule,
  setId,
  setDefaultDate,
  setDefaultSlot,
  setAppointmentId,
}) => {
  const dispatch = useDispatch();
  const { common_data, items } = booking;
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleOpenRatingModal = () => setRatingModalVisible(true);
  const handleCloseRatingModal = () => setRatingModalVisible(false);

  const handleSubmitRating = async () => {
    try {
      const resultAction = await dispatch(
        addReview({
          rating: ratingValue,
          description: reviewText,
          store_id: common_data.store_id,
        })
      );

      // Check if action was fulfilled (if using createAsyncThunk)
      if (addReview.fulfilled.match(resultAction)) {
        toast.success("Review Added Successfully");

        // Clear state values
        setRatingValue(0);
        setReviewText("");

        // Close modal
        handleCloseRatingModal();
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [getid, setGetId] = useState("");

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setCancelReason("");
  };

  const handleSubmitCancelReason = async () => {
    try {
      const result = await dispatch(
        cancelBook({ id: getid, reason: cancelReason })
      );

      if (result.type.endsWith("/fulfilled")) {
        setShowCancelModal(false);
        setCancelReason("");
        toast.success(result?.payload);
      } else {
        setShowCancelModal(false);
        setCancelReason("");
        toast.error(
          `${result?.payload?.error?.message}, Already it is initiated to refund `
        );
      }
    } catch (error) {
      console.error("Dispatch error:", error);
      toast.error("An error occurred while cancelling booking.");
    }
  };
  const modalBackdropRef = useRef();

  const handleBackdropClick = (e) => {
    if (e.target === modalBackdropRef.current) {
      handleCloseRatingModal();
    }
  };

  return (
    <>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/images/${
                  common_data.images[0]
                }`}
                alt={common_data.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title mb-1">{common_data.name}</h5>
                <span
                  className={`badge ${
                    common_data.status === "upcomming"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {common_data.status.toUpperCase()}
                </span>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <small className="text-muted">
                    📅 {formatDate(common_data?.booking_date)}
                  </small>
                </div>
                <div className="col-sm-6">
                  {common_data?.slot_from && common_data?.slot_to && (
                    <small className="text-muted">
                      🕐 {formatTime(common_data.slot_from)} -{" "}
                      {formatTime(common_data.slot_to)}
                    </small>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <small className="text-muted">
                  📍 {common_data.addressLine1}, {common_data.addressLine2}
                </small>
              </div>

              <div className="mb-3">
                <h6 className="mb-2">Services:</h6>
                <div className="row">
                  {items.map((item, index) => (
                    <div key={index} className="col-sm-6 mb-2">
                      <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                        <span className="small">
                          {item?.service_name || item?.combo_name}
                        </span>
                        <span className="badge bg-dark">₹{item?.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                {/* <small className="text-muted">
                Booking ID: #{common_data.id}a
              </small> */}
                <h5 className="mb-0 text-dark">
                  Total: ₹{common_data.total_amount}
                </h5>
              </div>

              {common_data.status === "upcomming" && (
                <div className="mt-3">
                  <button
                    className="btn btn-outline-dark btn-sm me-2"
                    onClick={() => {
                      onReschedule();
                      setId(common_data?.store_id);
                      setDefaultDate(common_data?.booking_date);
                      setDefaultSlot(common_data?.slot_id);
                      setAppointmentId(common_data?.id);
                    }}
                  >
                    Reschedule
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      handleCancelClick();
                      setGetId(common_data?.id);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {common_data.status === "past" && (
                <div className="mt-3">
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => handleOpenRatingModal()}
                  >
                    Rate & Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancel Reason</h5>
                <button
                  className="btn-close"
                  onClick={handleCloseCancelModal}
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="cancelReason" className="form-label">
                  Why are you cancelling?
                </label>
                <textarea
                  id="cancelReason"
                  className="form-control mt-2"
                  rows="4"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter your reason here..."
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseCancelModal}
                >
                  Close
                </button>
                <button
                  className="btn btn-dark"
                  onClick={handleSubmitCancelReason}
                  disabled={!cancelReason.trim()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {ratingModalVisible && (
        <div
          className="modal fade show d-flex align-items-center justify-content-center"
          ref={modalBackdropRef}
          onClick={handleBackdropClick}
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
                <h5 className="modal-title fw-bold">⭐ Rate & Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseRatingModal}
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body pt-0">
                {/* Star Rating */}
                <div className="mb-4 text-center">
                  <label className="form-label fw-semibold mb-2 d-block">
                    Your Rating
                  </label>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRatingValue(star)}
                      style={{
                        cursor: "pointer",
                        fontSize: "32px",
                        color: star <= ratingValue ? "#ffc107" : "#e4e5e9",
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
                      You rated: {ratingValue} star
                      {ratingValue !== 1 ? "s" : ""}
                    </small>
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Your Feedback
                  </label>
                  <textarea
                    className="form-control shadow-sm rounded-3"
                    rows="4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your experience here..."
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn btn-light border me-2"
                  onClick={handleCloseRatingModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-dark px-4"
                  onClick={handleSubmitRating}
                  disabled={ratingValue === 0 || reviewText.trim() === ""}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MyAppointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [id, setId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  // const [bookingData] = useState(sampleData);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [defaultSlot, setDefaultSlot] = useState("");
  const [isMonthViewOpen, setIsMonthViewOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState(new Date());
  // const defaultDate = new Date("2025-06-20");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  const [showModal, setShowModal] = useState(false);
  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const currentWeek = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );
  const allAppointments = useSelector(
    (state) => state.allAppointments.allAppointments
  );
  const {
    availabeSlots,
    loading: slotsLoading,
    error: slotsError,
  } = useSelector((state) => state.availabeSlots);
  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);
  useEffect(() => {
    const today = startOfDay(new Date());
    dispatch(
      fetchAvailableSlots({
        date: format(today, "yyyy-MM-dd"),
        store_id: Number(id),
      })
    );

    // setSelectedDate(today); // if you want to also set it as default selected
  }, [dispatch, id]);

  useEffect(() => {
    setSelectedDate(defaultDate);
    // setSelectedSlotId(defaultSlot);
  }, [defaultDate]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && modalRef.current) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const renderMonthCalendar = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const weeks = [];
    let days = [];
    let day = startDate;
    while (day <= monthEnd) {
      for (let i = 0; i < 7; i++) {
        days.push(day);
        day = addDays(day, 1);
      }
      if (days.some((d) => isSameMonth(d, selectedDate))) {
        weeks.push(days);
      }
      days = [];
    }
    return weeks;
  };
  const monthCalendar = renderMonthCalendar();
  function formatTo12Hour(time24) {
    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
  }
  const formattedSlots = availabeSlots.map((slot) => ({
    ...slot,
    from: formatTo12Hour(slot.from),
    to: formatTo12Hour(slot.to),
  }));

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleDayClick = (day) => {
    if (!isBefore(day, startOfDay(today))) {
      setSelectedDate(day);
      dispatch(
        fetchAvailableSlots({
          date: format(day, "yyyy-MM-dd"),
          store_id: Number(id),
        })
      );
      setIsMonthViewOpen(false);
    }
  };

  const handleReschedule = async () => {
    if (selectedSlotId) {
      let result = await dispatch(
        rescheduleBook({
          id: appointmentId,
          slot_id: selectedSlotId,
          booking_date: selectedDate,
        })
      );
      const toastId = "reschedule";
      if (rescheduleBook.fulfilled.match(result)) {
        toast.dismiss(toastId);
        toast.success("Booking rescheduled successfully!", { id: toastId });
        dispatch(getAllAppointments());
        setShowModal(false);
      } else if (rescheduleBook.rejected.match(result)) {
        toast.dismiss(toastId);
        toast.error(result?.error?.message || "Failed to reschedule booking.", {
          id: toastId,
        });
      }
    }
  };

  return (
    <>
      {
        // <div className="page-header">
        //   <div className="container">
        //     <div className="row align-items-center">
        //       <div className="col-md-8 order-md-1 order-2">
        //         {/* Page Heading Start  */}
        //         <div className="page-header-box">
        //           <h1 className="text-anime">Bookings</h1>
        //           {/* <ol className="breadcrumb wow fadeInUp" data-wow-delay="0.25s">
        //                 <li className="breadcrumb-item">
        //                   <Link to="#">Home</Link>
        //                 </li>
        //                 <li className="breadcrumb-item">
        //                   <Link to="#">Services</Link>
        //                 </li>
        //                 <li className="breadcrumb-item active" aria-current="page">
        //                   Cutting & Styling
        //                 </li>
        //               </ol> */}
        //         </div>
        //         {/* Page Heading End  */}
        //       </div>
        //       <div className="col-md-4 order-md-2 order-1">
        //         {/* Page Header Right Icon Start  */}
        //         <div
        //           className="page-header-icon-box wow fadeInUp"
        //           data-wow-delay="0.5s"
        //         >
        //           <div className="page-header-icon">
        //             <img src={booking} alt="" />
        //           </div>
        //         </div>
        //         {/* Page Header Right Icon End  */}
        //       </div>
        //     </div>
        //   </div>
        // </div>
      }
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">My Bookings</h2>
          {/* <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-1"></i> New Booking
          </button> */}
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
              {allAppointments?.upcoming?.length > 0 && (
                <span className="badge bg-dark ms-2">
                  {allAppointments?.upcoming?.length}
                </span>
              )}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              Past
              {allAppointments?.past?.length > 0 && (
                <span className="badge bg-secondary ms-2">
                  {allAppointments?.past?.length}
                </span>
              )}
            </button>
          </li>
        </ul>

        <div>
          {activeTab === "upcoming" && allAppointments?.upcoming?.length > 0 ? (
            allAppointments?.upcoming?.map((booking) => (
              <BookingCard
                key={booking.common_data.id}
                booking={booking}
                onReschedule={handleOpenModal}
                setId={setId}
                setDefaultDate={setDefaultDate}
                setDefaultSlot={setDefaultSlot}
                setAppointmentId={setAppointmentId}
              />
            ))
          ) : activeTab === "upcoming" ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No Upcoming Bookings</h4>
              <p className="text-muted">
                You don't have any upcoming appointments.
              </p>
              <button className="btn btn-dark" onClick={() => navigate("/")}>
                Book Now
              </button>
            </div>
          ) : null}

          {activeTab === "past" && allAppointments?.past?.length > 0 ? (
            allAppointments?.past?.map((booking) => (
              <BookingCard
                key={booking.common_data.id}
                booking={booking}
                onReschedule={handleOpenModal}
                setId={setId}
                setDefaultDate={setDefaultDate}
                setDefaultSlot={setDefaultSlot}
                setAppointmentId={setAppointmentId}
              />
            ))
          ) : activeTab === "past" ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No Past Bookings</h4>
              <p className="text-muted">
                Your booking history will appear here.
              </p>
            </div>
          ) : null}
        </div>
        {/* Modal */}
        {showModal && (
          <div
            ref={modalRef}
            className="modal fade show"
            tabIndex="-1"
            style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Reschedule Booking</h5>
                  <button
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="container mb-5">
                    <h2 className="mb-4 mt-5">
                      Secure a Time That Works for You
                    </h2>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h2 className="h5 mb-0">
                        {format(selectedDate, "MMMM yyyy")}
                      </h2>

                      <div className="position-relative">
                        <button
                          className="btn btn-outline-dark p-2"
                          onClick={() => setIsMonthViewOpen(!isMonthViewOpen)}
                        >
                          <CalendarIcon className="me-1" size={18} />
                          <span className="visually-hidden">Open calendar</span>
                        </button>

                        {isMonthViewOpen && (
                          <div
                            className="position-absolute end-0 mt-2 p-3 bg-white shadow rounded zindex-dropdown"
                            style={{
                              width: "18rem",
                              border: "1px solid #dddddd",
                            }}
                          >
                            <div
                              className="d-grid gap-1 text-center small mb-2"
                              style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
                            >
                              {[
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Sun",
                              ].map((day) => (
                                <div key={day} className="fw-semibold">
                                  {day}
                                </div>
                              ))}
                            </div>

                            {monthCalendar.map((week, weekIndex) => (
                              <div
                                key={weekIndex}
                                className="d-grid gap-1 mb-1"
                                style={{
                                  gridTemplateColumns: "repeat(7, 1fr)",
                                }}
                              >
                                {week.map((day, dayIndex) => {
                                  const isSelected = isSameDay(
                                    day,
                                    selectedDate
                                  );
                                  const isCurrentMonth = isSameMonth(
                                    day,
                                    selectedDate
                                  );
                                  const isPastDay = isBefore(
                                    day,
                                    startOfDay(today)
                                  );

                                  if (!isCurrentMonth)
                                    return <div key={dayIndex}></div>;

                                  return (
                                    <div
                                      key={dayIndex}
                                      className="d-flex justify-content-center"
                                    >
                                      <button
                                        className={`d-flex align-items-center justify-content-center rounded-circle ${
                                          isSelected
                                            ? "bg-dark text-white"
                                            : "bg-white text-dark"
                                        }`}
                                        style={{
                                          width: "34px",
                                          height: "34px",
                                          fontSize: "0.85rem",
                                          transition: "all 0.2s ease",
                                          border: "1px solid #dddddd",
                                          opacity: isPastDay ? 0.4 : 1,
                                          cursor: isPastDay
                                            ? "not-allowed"
                                            : "pointer",
                                        }}
                                        disabled={isPastDay}
                                        onClick={() => {
                                          if (!isPastDay) {
                                            setSelectedDate(day);
                                            setIsMonthViewOpen(false);
                                          }
                                        }}
                                      >
                                        {format(day, "d")}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Inline Week View */}
                    <div
                      className="d-grid gap-2 mb-4"
                      style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
                    >
                      {currentWeek.map((day, index) => {
                        const isToday = isSameDay(day, today);
                        const isSelected = isSameDay(day, selectedDate);
                        const isPast = isBefore(day, startOfDay(today));

                        return (
                          <div
                            key={index}
                            className={`text-center py-2 rounded ${
                              isSelected
                                ? "bg-dark text-white"
                                : isToday
                                ? "bg-light"
                                : ""
                            }`}
                            style={{
                              cursor: isPast ? "not-allowed" : "pointer",
                              opacity: isPast ? 0.4 : 1,
                            }}
                            onClick={() => !isPast && handleDayClick(day)}
                          >
                            <div className="fw-semibold">
                              {format(day, "EEE")}
                            </div>
                            <div>{format(day, "d")}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Time Slots */}
                    <h5 className="mt-4 mb-3">Available Time Slots</h5>
                    <div className="mt-4">
                      <h5 className="mb-3">
                        Available Slots for{" "}
                        {format(selectedDate, "do MMM yyyy")}:
                      </h5>

                      {slotsLoading ? (
                        <p>Loading slots...</p>
                      ) : slotsError ? (
                        <p className="text-danger">
                          Failed to load slots. Please try again.
                        </p>
                      ) : formattedSlots && formattedSlots.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                          {formattedSlots.map((slot) => {
                            const isFree = slot.status === "free";
                            const isSelected = selectedSlotId === slot.id;

                            return (
                              <button
                                key={slot.id}
                                style={{
                                  backgroundColor: isFree
                                    ? isSelected
                                      ? "#000" // Black for selected
                                      : "#fff" // White for unselected
                                    : "#e0e0e0", // Gray for booked
                                  color: isFree
                                    ? isSelected
                                      ? "#fff"
                                      : "#000"
                                    : "#888",
                                  border: "1px solid #dddddd",
                                  borderRadius: "0.5rem",
                                  fontSize: "0.9rem",
                                  padding: "0.5rem 1rem",
                                  cursor: isFree ? "pointer" : "not-allowed",
                                  opacity: isFree ? 1 : 0.6,
                                  transition: "all 0.2s ease-in-out",
                                }}
                                disabled={!isFree}
                                onClick={() => {
                                  if (isFree) {
                                    setSelectedSlotId(slot.id);
                                  }
                                }}
                              >
                                {`${slot.from} - ${slot.to}`}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p>No slots available for this day.</p>
                      )}
                    </div>

                    <div className="row justify-content-center mt-4">
                      <div className="col-12 col-md-8 col-lg-6">
                        {/* <a href="/checkout"> */}{" "}
                        <button
                          onClick={() => handleReschedule()}
                          className={`w-100 px-4 py-3 rounded-pill shadow-sm ${
                            selectedSlotId
                              ? "btn btn-dark"
                              : "btn btn-secondary"
                          }`}
                          style={{
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                            cursor: selectedSlotId ? "pointer" : "not-allowed",
                            opacity: selectedSlotId ? 1 : 0.6,
                          }}
                          disabled={!selectedSlotId}
                          onMouseOver={(e) => {
                            if (selectedSlotId) {
                              e.currentTarget.style.transform =
                                "translateY(-2px)";
                            }
                          }}
                          onMouseOut={(e) => {
                            if (selectedSlotId) {
                              e.currentTarget.style.transform = "translateY(0)";
                            }
                          }}
                        >
                          Book Now
                        </button>
                        {/* </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAppointments;
