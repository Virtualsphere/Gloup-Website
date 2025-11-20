import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  logo,
  GPayLogo,
  PhonePayLogo,
  VisaLogo,
  razorpaylogo,
} from "../assets/images";
import { createOrder, paymentSuccess } from "../redux/slice/paymentSlice";
import { useNavigate } from "react-router-dom";
import { getWalletAmount } from "../redux/slice/walletSlice";
import toast from "react-hot-toast";
import { getCoupon, verifyCoupon } from "../redux/slice/couponSlice";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedPayment, setSelectedPayment] = useState("wallet");
  const [coupon, setCoupon] = useState({ id: "", code: "", value: "" });
  const fromStores = useSelector((state) => state.setBookNow.selectedItem);

  const isWallet = selectedPayment === "wallet";
  const services = fromStores?.service || [];
  const combos =
    Array.isArray(fromStores?.combos) && fromStores.combos.length > 0
      ? fromStores.combos
      : [];

  // const totalAmount = [...services, ...combos].reduce((total, item) => {
  //   const numeric = Number(item.amount || item.discount_price);
  //   return total + (isNaN(numeric) ? 0 : numeric);
  // }, 0);
  const totalAmount = [...services, ...combos].reduce((total, item) => {
    const numeric = Number(
      item.amount ?? item.actual_amount ?? item.discount_price
    );
    return total + (isNaN(numeric) ? 0 : numeric);
  }, 0);
  const totalDuration = [...services, ...combos].reduce((total, item) => {
    const duration = moment.duration(item.duration); // assuming "HH:mm:ss"
    return total + duration.asMinutes();
  }, 0);

  const durationObj = moment.duration(totalDuration, "minutes");

  const durationText = totalDuration
    ? `${
        durationObj.hours() > 0
          ? `${durationObj.hours()} hr${durationObj.hours() > 1 ? "s" : ""}`
          : ""
      }${durationObj.hours() > 0 && durationObj.minutes() > 0 ? " " : ""}${
        durationObj.minutes() > 0
          ? `${durationObj.minutes()} min${
              durationObj.minutes() > 1 ? "s" : ""
            }`
          : ""
      }`
    : "";

  let walletAmount = useSelector(
    (state) => state.addWallet?.walletAmount?.wallet
  );
  console.log(walletAmount, "walletAmount");

  useEffect(() => {
    if (walletAmount == 0) setSelectedPayment("online");
  }, [walletAmount]);

  let couponList = useSelector((state) => state.coupon.couponList);
  let couponData = useSelector((state) => state.coupon.couponData);

  useEffect(() => {
    dispatch(getWalletAmount());
    dispatch(getCoupon());
  }, [dispatch]);

  const formatINR = (amt) => `${amt.toFixed(2).toLocaleString("en-IN")}`;

  const handlePaymentMethod = (method) => {
    setSelectedPayment(method);
  };
  //coupon_id

  const handleWalletBooking = () => {
    const { combos, shopDetail, ...rest } = fromStores;
    if (coupon.id) {
      rest.coupon_id = coupon.id;
      rest.is_discounted = true;
    } else {
      rest.is_discounted = false;
    }
    if (combos && combos.length > 0) {
      rest.combos = combos;
      rest.is_combo = true;
    } else {
      rest.is_combo = false;
    }

    const isWalletPayment = selectedPayment === "wallet";
    const toastId = "wallet-check";
    // Check if wallet payment is selected and if wallet amount is insufficient
    if (isWalletPayment && Number(walletAmount) < totalAmount) {
      toast.dismiss(toastId); // optional: clear previous warning toast
      toast("You can use another payment option like UPI or Card.", {
        id: toastId,
        icon: "⚠️",
        style: {
          // background: "#fffbe6",
          color: "#000000",
        },
      });
      return; // Stop further execution
    }

    rest.is_wallet = selectedPayment === "online" ? false : true;

    dispatch(createOrder(rest))
      .unwrap()
      .then((data) => {
        const toastId = "wallet";
        if (data?.message == "Payment Successfull") {
          toast.dismiss(toastId);
          toast.success("Booking successfully!", { id: toastId });
          navigate("/paymentsuccess", {
            state: {
              value: coupon?.value || 0,
            },
          });
        }

        if (data?.order_id && selectedPayment === "online") {
          displayRazorpay(data?.order_id);
        }

        // Navigate or show toast on success
      })
      .catch((error) => {
        console.error("Booking failed:", error);
      });
  };

  async function displayRazorpay(id) {
    try {
      // Dummy static values for testing
      // const amount = 340 * 100; // Amount in paise (Razorpay uses smallest currency unit)
      // const orderId = "order_QcK4f5MNpAEzqP"; // Dummy test order ID

      const options = {
        key: import.meta.env.VITE_RAZOR_KEY, // Use Razorpay test key here
        // amount: totalAmount, // in paise
        currency: "INR",
        name: "Gloup",
        description: "Test Transaction",
        image: razorpaylogo, // Optional logo URL
        order_id: id, // Use a dummy or test order_id format
        theme: {
          color: "#000000",
        },
        handler: function (response) {
          dispatch(paymentSuccess(response))
            .then((res) => {
              if (res?.payload == "payment sucssessfull") {
                navigate("/paymentsuccess", {
                  state: {
                    value: coupon?.value || 0,
                  },
                });
              } else if (res?.payload == "Payment Failed") {
                navigate("/paymentfailed", {
                  state: {
                    value: coupon?.value || 0,
                  },
                });
              }
              // Navigate only after successful API call
            })
            .catch((error) => {
              console.error("Payment Success API failed", error);
              // Optionally show an error toast or message here
            });
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response) {
        alert("Payment Failed!");
      });

      paymentObject.open();
    } catch (error) {
      console.log("Error initializing Razorpay", error);
    }
  }

  const handleVerifyCoupon = async (code) => {
    try {
      toast.dismiss("coupon-status"); // Clear any previous coupon toasts

      const result = await dispatch(verifyCoupon({ code })).unwrap();

      if (result?.discount_value && result?.status === "active") {
        // Save coupon code in state
        setCoupon({
          id: result.id,
          code: result.code,
          value: result?.discount_value,
        });

        // Show success toast
        toast.success("Coupon successfully verified!", {
          id: "coupon-status",
        });

        // Optionally, update discount state
        // setCouponData(result); // if needed
      } else {
        toast.error("Invalid or expired coupon.", {
          id: "coupon-status",
        });
      }
    } catch (error) {
      toast.dismiss("coupon-status");
      toast.error(error?.message || "Failed to apply coupon.", {
        id: "coupon-status",
      });
    }
  };
  function formatDuration(duration) {
    if (!duration) return "20 mins";

    // Split "HH:MM:SS"
    const [hours, minutes] = duration.split(":").map(Number);

    let result = "";
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m`;

    return result.trim();
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const totalFormatINR = (amt) =>
    Number(amt).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div
      className="container-fluid px-3 py-4"
      style={{
        maxWidth: "1024px",
        margin: "50px auto",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Header */}
      <div className="bg-white p-3 shadow-sm">
        <div className="d-flex align-items-center mb-2">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/images/${
              fromStores?.shopDetail?.basicinfo[0]?.images[0]
            }`}
            alt="Salon"
            className="rounded me-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <h5 className="mb-1 fw-bold text-capitalize">
              {fromStores?.shopDetail?.basicinfo[0]?.name}
            </h5>
            <div className="d-flex align-items-center text-muted small">
              <span className="text-warning me-1">★</span>
              <span className="me-2">
                {fromStores?.shopDetail?.average} (
                {fromStores?.shopDetail?.ratings?.length})
              </span>
              <span className="text-capitalize">
                📍 {fromStores?.shopDetail?.address?.addressLine1}
                {fromStores?.shopDetail?.address?.addressLine2
                  ? `, ${fromStores.shopDetail.address.addressLine2}`
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="border rounded p-2 mb-2 text-muted small">
          <div className="d-flex align-items-center">
            <span className="me-2">🕘</span>
            <span>
              {(() => {
                const info = fromStores?.shopDetail?.basicinfo?.[0];
                const fromTime = moment(info?.from, "HH:mm");
                const toTime = moment(info?.to, "HH:mm");
                if (!fromTime.isValid() || !toTime.isValid()) return null;
                return `${fromTime.format("h:mm A")} - ${toTime.format(
                  "h:mm A"
                )}`;
              })()}
            </span>
          </div>
        </div>
      </div>

      {/* Services */}
      {
        // <div className="bg-white mt-2 p-3">
        //   {(() => {
        //     const services = fromStores?.service || [];
        //     const combos =
        //       Array.isArray(fromStores?.combos) && fromStores.combos.length > 0
        //         ? fromStores.combos
        //         : [];
        //     const combinedList = [...services, ...combos];
        //     return combinedList.map((item, index) => (
        //       <div className="border-bottom pb-3 mb-3" key={item.id || index}>
        //         <div className="d-flex justify-content-between align-items-center mb-2">
        //           <div>
        //             <h6 className="mb-1 fw-bold">{item.name || item.title}</h6>
        //             <small className="text-muted">
        //               {formatDuration(item.duration) || ""}
        //             </small>
        //           </div>
        //           {item.amount ? (
        //             <div
        //               style={{
        //                 display: "flex",
        //                 flexDirection: "column",
        //                 alignItems: "flex-end",
        //               }}
        //             >
        //               <span className="fw-bold">
        //                 {item.amount && (
        //                   <>₹{Number(item.amount).toLocaleString("en-IN")}</>
        //                 )}
        //                 {/* ₹{item.amount || item.discount_price} */}
        //               </span>
        //               {item.actual_amount !== item.amount && (
        //                 <>
        //                   {item.actual_amount && (
        //                     <>
        //                       <del className="fw-light text-muted">
        //                         {/* ₹{item.actual_amount} */}₹{" "}
        //                         {Number(item.actual_amount).toLocaleString(
        //                           "en-IN"
        //                         )}
        //                       </del>
        //                       <small className="text-success fw-semibold">
        //                         {/* You save ₹{item.actual_amount - item.amount} */}
        //                         You save ₹{" "}
        //                         {Number(
        //                           item.actual_amount - item.amount
        //                         ).toLocaleString("en-IN")}
        //                       </small>
        //                     </>
        //                   )}
        //                 </>
        //               )}
        //             </div>
        //           ) : (
        //             <>
        //               {item.actual_amount && (
        //                 // <span className="fw-bold">₹{item.actual_amount}</span>
        //                 <span className="fw-bold">
        //                   ₹{Number(item.actual_amount).toLocaleString("en-IN")}
        //                 </span>
        //               )}
        //             </>
        //           )}
        //         </div>
        //       </div>
        //     ));
        //   })()}
        //   {/* Total */}
        //   <div className="d-flex justify-content-between align-items-center mb-3">
        //     <h5 className="mb-0 fw-bold">Total</h5>
        //     {/* <h5 className="mb-0 fw-bold">₹{totalAmount}/-</h5> */}
        //     <h5 className="mb-0 fw-bold">
        //       ₹{Number(totalAmount).toLocaleString("en-IN")}/-
        //     </h5>
        //   </div>
        //   {/* Pay Now */}
        //   {/* <div className="d-flex justify-content-between align-items-center mb-2">
        //     <span className="text-success fw-bold">Pay Now</span>
        //     <span className="text-success fw-bold">₹0/-</span>
        //   </div> */}
        //   {/* <div className="d-flex justify-content-between align-items-center text-muted small">
        //     <span>Pay at venue</span>
        //     <span>₹{totalAmount}/-</span>
        //   </div> */}
        // </div>
      }
      <div className="bg-white mt-2 p-3">
        {(() => {
          const services = fromStores?.service || [];
          const combos =
            Array.isArray(fromStores?.combos) && fromStores.combos.length > 0
              ? fromStores.combos
              : [];

          const combinedList = [...services, ...combos];

          const totalSaved = combinedList.reduce((acc, item) => {
            const actual = Number(item.actual_amount || 0);
            const discounted = Number(item.amount || 0);
            if (actual > discounted) acc += actual - discounted;
            return acc;
          }, 0);

          return (
            <>
              {combinedList.map((item, index) => (
                <div className="border-bottom pb-3 mb-3" key={item.id || index}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h6 className="mb-1 fw-bold">
                        {item.name || item.title}
                      </h6>
                      <small className="text-muted">
                        {formatDuration(item.duration) || ""}
                      </small>
                    </div>

                    {item.amount ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <span className="fw-bold">
                          ₹{Number(item.amount).toLocaleString("en-IN")}
                        </span>

                        {item.actual_amount !== item.amount &&
                          item.actual_amount && (
                            <del className="fw-light text-muted">
                              ₹
                              {Number(item.actual_amount).toLocaleString(
                                "en-IN"
                              )}
                            </del>
                          )}
                      </div>
                    ) : (
                      item.actual_amount && (
                        <span className="fw-bold">
                          ₹{Number(item.actual_amount).toLocaleString("en-IN")}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
              {totalSaved > 0 && (
                <div className="d-flex justify-content-between align-items-center text-success fw-semibold mb-2">
                  <span>You Saved</span>
                  <span>₹{totalSaved.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-semibold">Sub Total</h6>
                <h6 className="mb-0 fw-semibold">
                  ₹{Number(totalAmount).toLocaleString("en-IN")}
                </h6>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-semibold">GST (5%)</h6>
                <h6 className="mb-0 fw-semibold">
                  + ₹{Number(totalAmount * 0.05).toLocaleString("en-IN")}
                </h6>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0 fw-semibold">Total</h6>
                <h6 className="mb-0 fw-semibold">
                  ₹{Number(totalAmount * 1.05).toLocaleString("en-IN")}
                </h6>
              </div>
            </>
          );
        })()}
      </div>

      {/* Payment Method */}
      <div className="bg-white mt-2 p-3">
        <h6 className="mb-3 fw-bold">Payment Method</h6>

        <div className="mb-3">
          <div
            className={`border rounded p-3 ${
              selectedPayment === "wallet" ? "border-warning bg-light" : ""
            }`}
            onClick={() => handlePaymentMethod("wallet")}
            style={{ cursor: "pointer" }}
          >
            {/* <div className="d-flex align-items-center">
              <span className="me-3">💳</span>
              <span className="fw-medium">Wallet</span>
              <div className="ms-auto">
                {isWallet && (
                  <div
                    className="bg-warning rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "24px", height: "24px" }}
                  >
                    <span style={{ fontSize: "12px" }}>
                      ₹{formatINR(Number(walletAmount))}
                    </span>
                  </div>
                )}
              </div>
            </div> */}
            <div className="d-flex align-items-center flex-wrap">
              <span className="me-2 fs-5">💳</span>
              <span className="fw-medium">Wallet</span>
              <div className="ms-auto">
                {/* {isWallet && ( */}
                <div
                  className="bg-warning rounded px-3 py-1 text-dark fw-semibold text-nowrap"
                  style={{ fontSize: "0.875rem", minWidth: "fit-content" }}
                >
                  {walletAmount ? (
                    <>₹{formatINR(Number(walletAmount))}</>
                  ) : (
                    "₹0.00"
                  )}
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div
            className={`border rounded p-3 ${
              selectedPayment === "online" ? "border-warning bg-light" : ""
            }`}
            onClick={() => handlePaymentMethod("online")}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center">
              <div
                className="me-3 d-flex align-items-center"
                style={{ columnGap: "5px" }}
              >
                <span
                  // className="badge bg-danger me-1"
                  style={{ fontSize: "8px" }}
                >
                  <img src={GPayLogo} alt="" width={20} height={20} />
                </span>
                <span
                  // className="badge bg-primary me-1"
                  style={{ fontSize: "8px" }}
                >
                  <img src={PhonePayLogo} alt="" width={20} height={20} />
                </span>
                <span
                  // className="badge bg-warning"
                  style={{ fontSize: "8px", marginLeft: "-2.5px" }}
                >
                  <img src={VisaLogo} alt="" width={30} height={30} />
                </span>
              </div>
              <span className="fw-medium">Online Payment</span>
              <span className="ms-auto">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon */}
      <div className="bg-white mt-2 p-3">
        <h6 className="mb-3 fw-bold">Apply Coupon</h6>
        <input
          type="text"
          className="form-control border-0 bg-light"
          placeholder="Enter your coupon code..."
          value={coupon.code}
          readOnly
        />
      </div>
      {/* Coupon List */}
      <div className="mt-3">
        <h6 className="fw-semibold mb-2">Available Coupons</h6>

        {Array.isArray(couponList) ? (
          (() => {
            const now = new Date();
            const validCoupons = couponList.filter(
              (c) =>
                c.status === "active" &&
                new Date(c.start_date) <= now &&
                new Date(c.end_date) >= now
            );

            return validCoupons.length > 0 ? (
              validCoupons.map((c) => (
                <div
                  key={c.id}
                  className="border rounded px-3 py-2 mb-2 bg-light d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div className="fw-bold text-uppercase">{c.code}</div>
                    <div className="text-muted small">{c.description}</div>
                    <div className="small text-success fw-semibold">
                      {c.discount_type === "percentage"
                        ? `${c.discount_value}% OFF`
                        : `Flat ₹${c.discount_value} OFF`}
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      handleVerifyCoupon(c.code);
                    }}
                  >
                    Apply
                  </button>
                </div>
              ))
            ) : (
              <div className="text-muted fst-italic">
                No coupons are currently available.
              </div>
            );
          })()
        ) : (
          <div className="text-muted fst-italic">No coupons found.</div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white mt-2 p-3 d-flex justify-content-between align-items-center">
        <div>
          {/* <div className="fw-bold">
            From ₹{" "}
            {couponData?.discount_value
              ? (totalAmount - couponData.discount_value).toFixed(2)
              : totalAmount.toFixed(2)}
          </div> */}
          <div className="fw-bold">
            ₹
            {couponData?.discount_value
              ? totalFormatINR(totalAmount - couponData.discount_value * 1.05)
              : totalFormatINR(totalAmount * 1.05)}
          </div>

          <small className="text-muted">
            {(() => {
              const serviceCount = fromStores?.service?.length || 0;
              const comboCount = Array.isArray(fromStores?.combos)
                ? fromStores.combos.length
                : 0;
              const totalCount = serviceCount + comboCount;

              return `${totalCount} service${
                totalCount !== 1 ? "s" : ""
              } • ${durationText}`;
            })()}
          </small>
          <p className="m-0" style={{ color: "#f9c10a" }}>
            *These rates are applicable only for Gloup users
          </p>
        </div>
        <button
          className="btn btn-danger px-4 py-2 rounded-pill"
          onClick={() => {
            // if (selectedPayment === "wallet") {
            handleWalletBooking();
            // } else if (selectedPayment === "online") {
            // displayRazorpay();
            // }
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
