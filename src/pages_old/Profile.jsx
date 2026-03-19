import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Wallet,
  User,
  Globe,
  LogOut,
  Heart,
  ClipboardList,
  Gift,
  Copy,
  Edit3,
  Save,
  X,
  Camera,
  Star,
} from "lucide-react";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { logo } from "../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  SendInviteCode,
  updateProfile,
} from "../redux/slice/profileSlice";
import {
  depositToWallet,
  createWalletOrder,
  getWalletAmount,
  getTransactionHistory,
} from "../redux/slice/walletSlice";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deActivateAccount } from "../redux/slice/deActivateSlie";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");
  const [show, setShow] = useState(false);
  const [inviteCodeInput, setInviteCodeInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    gender: "",
    date_of_birth: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const profileData = useSelector((state) => state.proile.profile);
  const walletAmount = useSelector(
    (state) => state.wallet.walletAmount?.wallet || 0
  );
  const trasactionHistory = useSelector(
    (state) => state.wallet.transactionHistory
  );

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(getWalletAmount());
  }, [dispatch]);

  useEffect(() => {
    if (show) dispatch(getTransactionHistory());
  }, [show, dispatch]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (profileData) {
      reset({
        firstname: profileData.firstname || "",
        lastname: profileData.lastname || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        country: profileData.country || "",
        city: profileData.city || "",
        gender: profileData.gender || "",
        profilepic: profileData.profilePic || "",
      });
    }
  }, [profileData, reset]);

  const onSubmit = (data) => {
    handleUpdateProfile(data);
  };
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getInitials = (firstname, lastname) => {
    const firstInitial = firstname?.charAt(0)?.toUpperCase() || "";
    const lastInitial = lastname?.charAt(0)?.toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (data) => {
    // setIsUpdating(true);

    try {
      const formData = new FormData();

      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("gender", data.gender);
      if (data.profilepic instanceof File) {
        formData.append("profilepic", data.profilepic);
      } else {
        console.warn("profilepic is not a File object, skipping...");
      }

      const result = await dispatch(updateProfile(formData));

      if (result.type.endsWith("/fulfilled")) {
        toast.success("Profile updated successfully!");
        setShowEditModal(false);
        dispatch(fetchProfile());
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAmountClick = (val) => setAmount(val);

  const handleConfirmClick = () => {
    if (Number.parseFloat(amount) >= 250) {
      dispatch(createWalletOrder(Number.parseFloat(amount)))
        .unwrap()
        .then((res) => {
          setOrderId(res.data.order_id);
          setShowConfirmModal(true);
          setShowWalletModal(false);
        })
        .catch((err) => {
          console.error("Deposit failed:", err);
        });
    } else {
      toast("Please enter a minimum amount of ₹250.", {
        id: "already-fav",
        icon: "⚠️",
      });
    }
  };

  const handleDepositClick = () => {
    if (Number.parseFloat(amount) >= 250 && orderId) {
      displayRazorpay(orderId);
    } else {
      alert("Missing order ID or valid amount.");
    }
  };

  async function displayRazorpay(id) {
    setShowConfirmModal(false);
    setShowWalletModal(false);
    try {
      const options = {
        key: import.meta.env.VITE_RAZOR_KEY,
        currency: "INR",
        name: "Gloup",
        description: "Test Transaction",
        image: logo,
        order_id: id,
        theme: {
          color: "#000000",
        },
        handler: (response) => {
          dispatch(
            depositToWallet({
              amount: Number.parseFloat(amount),
              response: response,
            })
          )
            .unwrap()
            .then((res) => {
              const toastId = "wallet";

              if (res.data == "wallet added sucssesfully") {
                dispatch(getWalletAmount());
                setAmount("");
                setOrderId("");
                toast.dismiss(toastId);
                toast.success("Amount added successfully!", { id: toastId });
              } else {
                alert("Amount could not added on Wallet");
              }
            })
            .catch((err) => {
              console.error("Deposit failed:", err);
            });
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", (response) => {
        console.log("Payment Failed", response.error);
        alert("Payment Failed!");
      });

      paymentObject.open();
    } catch (error) {
      console.log("Error initializing Razorpay", error);
    }
  }

  const handleInviteCodeSubmit = async () => {
    if (!inviteCodeInput.trim()) {
      toast.error("Please enter an invite code");
    } else {
      const result = await dispatch(
        SendInviteCode({ invite_code: inviteCodeInput })
      );
      if (
        result?.payload == "Invite Code Verified Successfully, Wallet Updated"
      ) {
        toast.success(`Invite code "${inviteCodeInput}" submitted`);
      } else if (result?.payload?.error?.message) {
        toast.error(`Invalid Invite Code`);
      }
      setInviteCodeInput("");
    }
  };

  const handleCopy = () => {
    if (profileData?.invited_code) {
      navigator.clipboard.writeText(profileData.invited_code);
      toast.success("Invite code copied!");
    }
  };

  const formatAmount = (type, amount) =>
    `${type === "credit" ? "+" : "-"} ₹ ${amount}/-`;

  const formatINR = (amt) => `${amt.toFixed(2).toLocaleString("en-IN")}`;

  const handleDeactivateClick = async () => {
    const resultAction = await dispatch(deActivateAccount());

    if (deActivateAccount.fulfilled.match(resultAction)) {
      const response = resultAction.payload;

      if (response.data == "User deleted successfully") {
        toast.success(response.data || "Account deactivated successfully.");
        localStorage.removeItem("token");
        setShowDeactivateModal(false);
        window.location.href = "/login";
      } else {
        toast.error(response.data || "Failed to deactivate account.");
      }
    } else if (deActivateAccount.rejected.match(resultAction)) {
      const error = resultAction.payload || resultAction.error.message;
      toast.error(error);
    }
  };
  const handleLogout = async () => {
    try {
      const response = await api.post(
        "/user/auth/logout", // Update to actual logout endpoint if needed
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );

      if (
        response.status === 200 ||
        response.data?.message === "Logout successful"
      ) {
        // Clear user data
        localStorage.removeItem("token");

        toast.success("Logged out successfully", { id: "logout" });
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during logout:", err?.response?.data || err.message);
      toast.error("Logout failed", { id: "logout-failed" });
    }
  };

  return (
    <div className="container py-4">
      {/* Enhanced Profile Header */}
      <div
        className="card mb-4 shadow-sm border-0"
        style={{
          background:
            " linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, rgba(23, 11, 11, 1) 50%, rgba(43, 43, 43, 1) ",
        }}
      >
        <div className="card-body text-white">
          <div className="row align-items-center">
            <div className="col-auto text-center">
              <div className="position-relative">
                <div
                  className="rounded-circle bg-white d-flex align-items-center justify-content-center overflow-hidden shadow"
                  style={{ height: "128px", width: "128px" }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "128px",
                      height: "128px",
                    }}
                  >
                    {/* Profile Image */}
                    {profileData?.profilePic ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/profilepic/${
                          profileData.profilePic
                        }`}
                        alt={`${profileData.firstname} ${profileData.lastname}`}
                        className="img-fluid rounded-circle"
                        style={{
                          width: "128px",
                          height: "128px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling.style.display =
                            "flex";
                        }}
                      />
                    ) : null}

                    {/* Initials fallback */}
                    <div
                      className="d-flex justify-content-center align-items-center bg-secondary text-white rounded-circle"
                      style={{
                        width: "100%",
                        height: "100%",
                        fontSize: "2rem",
                        display: profileData?.profilePic ? "none" : "flex",
                      }}
                    >
                      {getInitials(
                        profileData?.firstname || "M",
                        profileData?.lastname || "S"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div>
                  <h2 className="mb-1 text-capitalize fw-bold">
                    {profileData?.firstname} {profileData?.lastname}
                  </h2>
                  <p className="mb-2 opacity-75">
                    <Mail size={16} className="me-2" />
                    {profileData?.email}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="light"
                    className="d-flex align-items-center gap-2"
                    onClick={() => setShowEditModal(true)}
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={() => handleLogout()}
                    variant="outline-light"
                    className="d-flex align-items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Contact Info */}
        <div className="col-lg-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="mb-0 fw-bold text-dark">
                <Mail className="me-2" size={20} />
                Contact Information
              </h5>
            </div>
            <div className="card-body">
              {profileData?.email && (
                <div className="d-flex align-items-start mb-4">
                  <div className="bg-light rounded-circle p-2 me-3">
                    <Mail className="text-dark" size={20} />
                  </div>
                  <div className="flex-grow-1">
                    <small className="text-muted text-uppercase fw-semibold">
                      Email
                    </small>
                    <p className="mb-0 fw-medium text-break h6">
                      {profileData?.email}
                    </p>
                  </div>
                </div>
              )}
              {profileData?.phone && (
                <div className="d-flex align-items-start mb-4">
                  <div className="bg-light rounded-circle p-2 me-3">
                    <Phone className="text-dark" size={20} />
                  </div>
                  <div className="flex-grow-1">
                    <small className="text-muted text-uppercase fw-semibold">
                      Phone
                    </small>
                    <p className="mb-0 fw-medium h6">{profileData?.phone}</p>
                  </div>
                </div>
              )}
              {profileData?.city && (
                <div className="d-flex align-items-start">
                  <div className="bg-light rounded-circle p-2 me-3">
                    <MapPin className="text-dark" size={20} />
                  </div>
                  <div className="flex-grow-1">
                    <small className="text-muted text-uppercase fw-semibold">
                      Location
                    </small>
                    <p className="mb-0 fw-medium h6">
                      {profileData?.city} {profileData?.country && ","}{" "}
                      {profileData?.country}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="col-lg-6">
          <div className="card h-100 border-0">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="mb-0 fw-bold text-dark">
                <User className="me-2" size={20} />
                Personal Information
              </h5>
            </div>
            <div className="card-body">
              {!(
                profileData?.gender &&
                profileData?.date_of_birth &&
                profileData?.country
              ) ? (
                <div className="text-muted text-center py-4">
                  No personal information available
                </div>
              ) : (
                <>
                  {profileData.gender && (
                    <div className="d-flex align-items-start mb-4">
                      <div className="bg-light rounded-circle p-2 me-3">
                        <User className="text-dark" size={20} />
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-muted text-uppercase fw-semibold">
                          Gender
                        </small>
                        <p className="mb-0 fw-medium text-capitalize h6">
                          {profileData.gender}
                        </p>
                      </div>
                    </div>
                  )}

                  {profileData.date_of_birth && (
                    <div className="d-flex align-items-start mb-4">
                      <div className="bg-light rounded-circle p-2 me-3">
                        <Calendar className="text-dark" size={20} />
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-muted text-uppercase fw-semibold">
                          Date of Birth
                        </small>
                        <p className="mb-0 fw-medium h6">
                          {formatDate(profileData.date_of_birth)}
                        </p>
                      </div>
                    </div>
                  )}

                  {profileData.country && (
                    <div className="d-flex align-items-start">
                      <div className="bg-light rounded-circle p-2 me-3">
                        <Globe className="text-dark" size={20} />
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-muted text-uppercase fw-semibold">
                          Country
                        </small>
                        <p className="mb-0 fw-medium h6">
                          {profileData.country}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="col-12">
          <div className="card border-0 ">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="mb-0 fw-bold text-dark">
                <Wallet className="me-2" size={20} />
                Account Information
              </h5>
            </div>
            <div className="row g-4">
              {/* Left Column: Wallet Info & Actions */}
              <div className="col-lg-8">
                <div className="bg-light rounded-3 p-4 h-100">
                  <div className="text-center mb-4">
                    <Wallet className="text-dark mb-2" size={32} />
                    <small className="text-muted d-block">Wallet Balance</small>
                    <h4 className="mb-0 fw-bold text-dark">
                      ₹ {formatINR(Number(walletAmount))}
                    </h4>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <Button
                        variant="outline-dark"
                        className="w-100 py-2 fw-semibold"
                        onClick={() => setShow(true)}
                      >
                        View Wallet History
                      </Button>
                    </div>
                    <div className="col-md-6">
                      <Button
                        variant="dark"
                        className="w-100 py-2 fw-semibold"
                        onClick={() => setShowWalletModal(true)}
                      >
                        Add Amount
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Deactivate Account */}
              <div className="col-lg-4">
                <div className="bg-light rounded-3 p-4 text-center h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="mb-3">
                      <span className="badge bg-danger px-3 py-2 fs-6">
                        ACTIVE
                      </span>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">
                      Deactivate Account
                    </h5>
                    <p className="text-muted small mb-0">
                      Deactivating your account will remove your access and mark
                      your status as inactive. You can reactivate it by
                      contacting support.
                    </p>
                  </div>
                  <Button
                    variant="outline-danger"
                    className="w-100 mt-4 fw-semibold"
                    onClick={() => setShowDeactivateModal(true)}
                  >
                    Deactivate Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            <Edit3 className="me-2" size={24} />
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("firstname", {
                      required: "First name is required",
                    })}
                    className={`rounded-3 ${
                      errors.firstname ? "is-invalid" : ""
                    }`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstname?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("lastname", {
                      required: "Last name is required",
                    })}
                    className={`rounded-3 ${
                      errors.lastname ? "is-invalid" : ""
                    }`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastname?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                        message: "Invalid email format",
                      },
                    })}
                    className={errors.email ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    className={errors.phone ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">City</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("city", {
                      required: "City is required",
                    })}
                    className={`rounded-3 ${errors.city ? "is-invalid" : ""}`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Country</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className={errors.country ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.country?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Gender</Form.Label>
                  <Form.Select
                    {...register("gender", { required: "Gender is required" })}
                    className={`rounded-3 ${errors.gender ? "is-invalid" : ""}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">
                    Profile Picture
                  </Form.Label>
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <div style={{ minWidth: 60, minHeight: 60 }}>
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/profilepic/${
                          profileData.profilePic
                        }`}
                        alt="Profile"
                        width="60"
                        height="60"
                        className="rounded-circle object-fit-cover"
                        style={{
                          objectFit: "cover",
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    </div>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setValue("profilepic", e.target.files?.[0], {
                          shouldValidate: true,
                        })
                      }
                      className="w-auto"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 d-flex justify-content-end gap-3">
              <Button
                variant="outline-secondary"
                onClick={() => setShowEditModal(false)}
                className="px-4"
              >
                <X size={16} className="me-2" />
                Cancel
              </Button>
              <Button
                variant="dark"
                type="submit"
                disabled={isUpdating}
                className="px-4"
              >
                {isUpdating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={16} className="me-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Wallet Deposit Modal */}
      <Modal
        show={showWalletModal}
        onHide={() => setShowWalletModal(false)}
        centered
      >
        <Modal.Body className="text-center p-4">
          <div className="mb-3">
            <Wallet className="text-dark mb-2" size={48} />
            <h4 className="mb-2 fw-bold">Deposit Money</h4>
            <p className="text-muted mb-4">
              Securely deposit funds to use for salon bookings
            </p>
          </div>

          <Form.Control
            type="number"
            placeholder="Enter Amount above 250"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-3 text-center rounded-3"
            min={250}
            style={{ fontSize: "1.1rem", padding: "12px" }}
          />

          <div className="d-flex justify-content-between mb-4 gap-2">
            {[500, 1000, 1500].map((val) => (
              <Button
                key={val}
                variant={amount == val ? "dark" : "outline-dark"}
                className="flex-fill rounded-3 py-2"
                onClick={() => handleAmountClick(val)}
              >
                ₹ {val}
              </Button>
            ))}
          </div>

          <Button
            variant="dark"
            className="w-100 py-3 rounded-3 fw-semibold"
            onClick={handleConfirmClick}
          >
            Proceed to Deposit
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Body className="text-center p-4">
          <h5 className="fw-bold">Confirm Deposit</h5>
          <p className="text-muted">Do you want to deposit ₹{amount}?</p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button
              variant="outline-secondary"
              onClick={() => setShowConfirmModal(false)}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleDepositClick}
              className="px-4"
            >
              Yes, Proceed
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Wallet History Modal */}
      <Modal show={show} centered size="lg">
        <Modal.Header onHide={() => setShow(false)} closeButton>
          <Modal.Title className="fw-bold">Transaction History</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {trasactionHistory.length === 0 ? (
            <div className="text-center py-4">
              <Wallet className="text-muted mb-3" size={48} />
              <p className="text-muted">No transaction history available.</p>
            </div>
          ) : (
            trasactionHistory.map((txn) => (
              <div
                key={txn.id}
                className="border-bottom py-3 d-flex justify-content-between align-items-start"
              >
                <div>
                  <div className="fw-semibold">
                    {txn.description.charAt(0).toUpperCase() +
                      txn.description.slice(1)}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                    {formatDate(txn.date)}
                  </div>
                </div>
                <div
                  className={`fw-bold ${
                    txn.type === "credit" ? "text-success" : "text-danger"
                  }`}
                >
                  {formatAmount(txn.type, txn.transaction_amount)}
                </div>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Enhanced Additional Actions */}
      <div className="row g-4 mt-3">
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 border-0 shadow-sm text-center p-4 hover-card">
            <div
              className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{ width: "60px", height: "60px" }}
            >
              <ClipboardList className="text-primary" size={28} />
            </div>
            <h6 className="fw-bold mb-2">My Appointments</h6>
            <p className="text-muted small mb-3">
              View and manage your bookings
            </p>
            <Button
              variant="primary"
              className="rounded-3 px-4"
              onClick={() => navigate("/myappointments")}
            >
              View Appointments
            </Button>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 border-0 shadow-sm text-center p-4 hover-card">
            <div
              className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{ width: "60px", height: "60px" }}
            >
              <Heart className="text-danger" size={28} />
            </div>
            <h6 className="fw-bold mb-2">My Favourites</h6>
            <p className="text-muted small mb-3">
              Your saved salons and services
            </p>
            <Button
              variant="danger"
              className="rounded-3 px-4"
              onClick={() => navigate("/favourites")}
            >
              View Favourites
            </Button>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 border-0 shadow-sm text-center p-4 hover-card">
            <div
              className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{ width: "60px", height: "60px" }}
            >
              <Star className="text-warning" size={28} />
            </div>
            <h6 className="fw-bold mb-2">My Reviews</h6>
            <p className="text-muted small mb-3">
              See the reviews you’ve posted for salons and services
            </p>
            <Button
              variant="warning"
              className="rounded-3 px-4"
              onClick={() => navigate("/myreview")}
            >
              View Reviews
            </Button>
          </div>
        </div>

        <div className="col-md-4 col-sm-12">
          <div className="card h-100 border-0 shadow-sm p-4">
            <div className="d-flex align-items-center mb-3">
              <div
                className="bg-light rounded-circle me-3 d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <Gift className="text-warning" size={20} />
              </div>
              <div>
                <h6 className="mb-0 fw-bold">Invite Friends</h6>
                <small className="text-muted">
                  Share your code and earn rewards
                </small>
              </div>
            </div>

            <div className="mb-3">
              <Form.Label className="fw-semibold small">
                Your Invite Code
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={profileData?.invited_code || "N/A"}
                  readOnly
                  className="bg-light"
                />
                {profileData?.invited_code && (
                  <Button variant="outline-secondary" onClick={handleCopy}>
                    <Copy size={16} />
                  </Button>
                )}
              </InputGroup>
            </div>

            <Form.Control
              type="text"
              value={inviteCodeInput}
              placeholder="Enter friend's invite code"
              onChange={(e) => setInviteCodeInput(e.target.value)}
              className="mb-3"
            />
            <Button
              variant="warning"
              className="w-100 rounded-3 fw-semibold"
              onClick={handleInviteCodeSubmit}
            >
              Submit Code
            </Button>
          </div>
        </div>
      </div>

      <Modal
        show={showDeactivateModal}
        onHide={() => setShowDeactivateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-danger">
            Confirm Deactivation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Are you sure you want to deactivate your account? You will lose
            access and your status will change to <strong>INACTIVE</strong>. You
            can reactivate by contacting support.
          </p>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="secondary"
              onClick={() => setShowDeactivateModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeactivateClick}>
              Yes, Deactivate
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .hover-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
