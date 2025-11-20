import { AlertCircle, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentFailed() {
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
        <div className="text-center mb-4">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg"
            style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
            }}
          >
            <X size={48} color="white" strokeWidth={3} />
          </div>
        </div>

        <div className="text-center mb-4">
          <h2
            className="fw-bold mb-3 text-dark"
            style={{ fontSize: "1.75rem" }}
          >
            Payment Failed
          </h2>
          <p
            className="text-muted mb-0"
            style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
          >
            We couldn't process your payment for{" "}
            <span className="fw-semibold text-dark">
              {fromStores?.shopDetail?.basicinfo[0]?.name || "Tressy Salon"}
            </span>
            . Please try again or use a different payment method.
          </p>
        </div>

        <div
          className="alert alert-danger d-flex align-items-start mb-4"
          role="alert"
        >
          <AlertCircle
            size={20}
            className="text-danger me-2 mt-1 flex-shrink-0"
          />
          <div>
            <h6
              className="alert-heading fw-semibold mb-1"
              style={{ fontSize: "0.875rem" }}
            >
              Transaction Failed
            </h6>
            <p className="mb-0" style={{ fontSize: "0.8rem" }}>
              Your payment of ₹{totalAmount} could not be processed. No amount
              has been charged.
            </p>
          </div>
        </div>

        {fromStores?.shopDetail && (
          <div className="card border mb-4">
            <div className="card-body p-3">
              <div className="d-flex align-items-center">
                <div className="me-3 flex-shrink-0">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/images/${
                      fromStores?.shopDetail?.basicinfo[0]?.images[0]
                    }`}
                    alt="Salon"
                    className="rounded"
                    style={{
                      width: "64px",
                      height: "64px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="flex-grow-1 min-width-0">
                  <div className="d-flex align-items-center mb-2">
                    <span
                      className="text-warning me-1"
                      style={{ fontSize: "0.875rem" }}
                    >
                      ★
                    </span>
                    <span
                      className="fw-semibold me-1"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {fromStores?.shopDetail?.average}
                    </span>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.875rem" }}
                    >
                      ({fromStores?.shopDetail?.ratings?.length})
                    </span>
                  </div>

                  <h6
                    className="fw-bold mb-2 text-dark text-truncate"
                    style={{ fontSize: "1rem" }}
                  >
                    {fromStores?.shopDetail?.basicinfo[0]?.name}
                  </h6>

                  <p
                    className="text-muted mb-2 small"
                    style={{ fontSize: "0.8rem", lineHeight: "1.4" }}
                  >
                    📍 {fromStores?.shopDetail?.address?.addressLine1}
                    {fromStores?.shopDetail?.address?.addressLine2
                      ? `, ${fromStores.shopDetail.address.addressLine2}`
                      : ""}
                  </p>

                  <div className="d-flex align-items-center">
                    <span
                      className="fw-semibold text-dark me-2"
                      style={{ fontSize: "0.875rem" }}
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
        )}

        <div className="d-grid gap-3 w-100">
          <button
            type="button"
            className="btn btn-dark btn-lg fw-semibold"
            onClick={() => navigate("/checkout")}
            style={{
              borderRadius: "12px",
              padding: "12px 24px",
            }}
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
}
