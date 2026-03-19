import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { value } = location.state || {};
  const fromStores = useSelector((state) => state.setBookNow.selectedItem);
  const services = Array.isArray(fromStores?.service) ? fromStores.service : [];
  const combos = Array.isArray(fromStores?.combos) ? fromStores.combos : [];

  const combinedList = [...services, ...combos];

  const totalAmount = combinedList.reduce((total, item) => {
    const numeric = Number(item.amount || item.discount_price);
    return total + (isNaN(numeric) ? 0 : numeric);
  }, 0);

  return (
    <div
      className="container-fluid p-0"
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        backgroundColor: "#f8f9fa",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center p-4">
        {/* Success Icon */}
        <div className="mb-4">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center shadow-lg"
            style={{
              width: "120px",
              height: "120px",
              backgroundColor: "#2c2c2c",
              background: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
        </div>

        {/* Confirmation Text */}
        <div className="text-center mb-5">
          <h2
            className="fw-bold mb-3"
            style={{ fontSize: "2rem", color: "#2c2c2c" }}
          >
            Booking Confirmed
          </h2>
          <p
            className="text-muted mb-0"
            style={{ fontSize: "1rem", lineHeight: "1.5" }}
          >
            Your visit to{" "}
            <span className="fw-semibold text-dark">
              {" "}
              {fromStores?.shopDetail?.basicinfo[0]?.name}
            </span>{" "}
            is all set. See you soon!
          </p>
        </div>

        {/* Salon Card */}
        <div
          className="card border-0 shadow-sm w-100 mb-4"
          style={{ borderRadius: "16px" }}
        >
          <div className="card-body p-3">
            <div className="d-flex align-items-center">
              {/* Salon Image */}
              <div className="me-3">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/images/${
                    fromStores?.shopDetail?.basicinfo[0]?.images[0]
                  }`}
                  alt="Tressy Saloon & Spa"
                  className="rounded"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </div>

              {/* Salon Details */}
              <div className="flex-grow-1">
                {/* Rating */}
                <div className="d-flex align-items-center mb-2">
                  <span
                    className="text-warning me-1"
                    style={{ fontSize: "14px" }}
                  >
                    ★
                  </span>
                  <span
                    className="fw-semibold me-1"
                    style={{ fontSize: "14px" }}
                  >
                    {fromStores?.shopDetail?.average?.toFixed(2)}
                  </span>
                  <span className="text-muted" style={{ fontSize: "14px" }}>
                    ({fromStores?.shopDetail?.ratings?.length})
                  </span>
                </div>

                {/* Salon Name */}
                <h6
                  className="fw-bold mb-2"
                  style={{ fontSize: "16px", color: "#2c2c2c" }}
                >
                  {fromStores?.shopDetail?.basicinfo[0]?.name}
                </h6>

                {/* Address */}
                <p
                  className="text-muted mb-2"
                  style={{ fontSize: "13px", lineHeight: "1.4" }}
                >
                  📍 {fromStores?.shopDetail?.address?.addressLine1}
                  {fromStores?.shopDetail?.address?.addressLine2
                    ? `, ${fromStores.shopDetail.address.addressLine2}`
                    : ""}
                </p>

                {/* Price and Services */}
                <div className="d-flex align-items-center">
                  <span
                    className="fw-semibold me-2"
                    style={{ fontSize: "14px", color: "#2c2c2c" }}
                  >
                    ₹ {totalAmount - value}
                  </span>
                  <span className="text-muted" style={{ fontSize: "14px" }}>
                    •{" "}
                    {(() => {
                      const serviceCount = Array.isArray(fromStores?.service)
                        ? fromStores.service.length
                        : 0;
                      const comboCount = Array.isArray(fromStores?.combos)
                        ? fromStores.combos.length
                        : 0;
                      const total = serviceCount + comboCount;

                      return `${total} ${
                        total === 1 ? "service" : "services"
                      }`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Appointments Button */}
        <button
          onClick={() => navigate("/myappointments")}
          className="btn w-100 py-3 fw-semibold"
          style={{
            backgroundColor: "#2c2c2c",
            color: "white",
            borderRadius: "12px",
            fontSize: "16px",
            border: "none",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1a1a1a";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#2c2c2c";
          }}
        >
          View Appointments
        </button>
      </div>
    </div>
  );
}
