import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApiToast } from "../customHook/useApiToast";
import { useForm, Controller } from "react-hook-form";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import { setMobile } from "../redux/slice/authSlice";

export default function OTPLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showApiToast } = useApiToast();
  const { control, handleSubmit, setValue, getValues } = useForm();
  const [timeLeft, setTimeLeft] = useState(35);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const mobNumber = useSelector((state) => state.auth.mobile);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Handle individual digit input
  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    setValue(`otp${index}`, value);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !getValues(`otp${index}`) && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 4).split("");
    pasted.forEach((char, i) => setValue(`otp${i}`, char));
    const focusIndex = pasted.findIndex((d) => d === "") || 3;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResendCode = async () => {
    setTimeLeft(35);
    setCanResend(false);
    for (let i = 0; i < 4; i++) setValue(`otp${i}`, "");
    inputRefs.current[0]?.focus();
    console.log("Resending OTP...");
    try {
      const response = await api.post(
        "/user/auth/sendOTP",
        { phone: mobNumber },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      dispatch(setMobile(mobNumber));

      if (response.data.data === "Otp Sent Successfully") {
        showApiToast(response, "Otp Sent Successfully", "login");
        navigate("/otpverification");
      }
    } catch (err) {
      const toastId = "terminated";
      if (err.response?.data?.error?.message === "Account Terminated") {
        toast.dismiss(toastId);
        toast.error("Account Terminated", { id: toastId });
      }
      console.error("Error sending OTP:", err?.response?.data || err.message);
    }
  };

  const onSubmit = async (data) => {
    const otpValue = `${data.otp0}${data.otp1}${data.otp2}${data.otp3}`;
    if (otpValue.length === 4) {
      try {
        const fullNumber = mobNumber; // Replace with your logic if different
        const response = await api.post(
          "/user/auth/verifyOTP",
          { phone: fullNumber },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: false,
          }
        );

        const toastId = "otp";
        if (response.data.data.token) {
          localStorage.setItem("token", response.data.data.token);
          toast.dismiss(toastId);
          toast.success("OTP verified succesfully!", { id: toastId });
          navigate("/");
        }
      } catch (err) {
        console.error("Error sending OTP:", err?.response?.data || err.message);
      }
    }
  };

  const otpValues = getValues();
  const isComplete = ["otp0", "otp1", "otp2", "otp3"].every(
    (key) => otpValues[key] && otpValues[key].trim() !== ""
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container d-flex align-items-center justify-content-center"
      style={{ maxHeight: "90vh", minHeight: "60vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-4 text-center">
          <h2 className="fw-bold">OTP Login</h2>
          <p className="text-muted">
            We've sent a 4 Digit OTP to your Mobile Number{" "}
            <span className="fw-bold text-dark">{mobNumber}</span>
          </p>
        </div>

        <div className="mb-3 d-flex justify-content-center gap-2">
          {[0, 1, 2, 3].map((index) => (
            <Controller
              key={index}
              name={`otp${index}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(index, e.target.value.trim())
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  autoComplete="off"
                  className={`form-control text-center fw-semibold ${
                    field.value ? "border-dark bg-light" : ""
                  }`}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    fontSize: "1.25rem",
                  }}
                />
              )}
            />
          ))}
        </div>

        <div className="text-end mb-3">
          {!canResend ? (
            <p className="text-muted mb-0">
              <strong>{timeLeft} Sec</strong> Remaining...
            </p>
          ) : (
            // <button
            //   type="button"
            //   onClick={handleResendCode}
            //   className="btn btn-link p-0 text-decoration-none"
            // >
            //   Send Code Again
            // </button>
            <></>
          )}
        </div>

        <div className="text-center mb-3">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={!canResend}
            className={`btn btn-sm ${
              canResend ? "btn-outline-dark" : "btn-outline-secondary disabled"
            }`}
          >
            Send Code Again
          </button>
        </div>

        <button
          type="submit"
          disabled={!isComplete}
          className={`btn w-100 ${
            isComplete ? "btn-dark" : "btn-secondary disabled"
          }`}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}
