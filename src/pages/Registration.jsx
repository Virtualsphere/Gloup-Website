import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      countryCode: "+91",
      mobileNumber: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const countryCode = watch("countryCode");
  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = (data) => {

  };

  const countryCodes = [
    { code: "+91", country: "IN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+86", country: "CN" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-white p-4"
      style={{ maxHeight: "90vh", minHeight: "70vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-4 text-center">
          <h1 className="h4 fw-bold text-dark">Register</h1>
          <p className="text-muted small">
            Enter your name and mobile number to get OTP and registered
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              onFocus={(e) => {
                e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
              }}
              placeholder="First Name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              onFocus={(e) => {
                e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
              }}
              placeholder="Last Name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>

          {/* Mobile Number and Country Code */}
          <div className="d-flex gap-2 position-relative">
            <div
              className="position-relative"
              style={{ zIndex: 1000 }}
              ref={countryDropdownRef}
            >
              <button
                type="button"
                className="btn btn-outline-secondary dropdown-toggle"
                onFocus={(e) => {
                  e.target.style.boxShadow =
                    "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
                }}
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              >
                {countryCode}
              </button>
              {showCountryDropdown && (
                <div
                  className="position-absolute mt-1 bg-white border rounded shadow p-2"
                  style={{ width: "120px", zIndex: 2000 }}
                >
                  {countryCodes.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setValue("countryCode", item.code);
                        setShowCountryDropdown(false);
                      }}
                      className="dropdown-item small"
                    >
                      {item.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="tel"
              className={`form-control flex-grow-1 ${
                errors.mobileNumber ? "is-invalid" : ""
              }`}
              onFocus={(e) => {
                e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
              }}
              placeholder="Mobile Number"
              {...register("mobileNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{7,15}$/,
                  message: "Enter a valid mobile number",
                },
              })}
            />
          </div>
          {errors.mobileNumber && (
            <div className="invalid-feedback d-block mb-3">
              {errors.mobileNumber.message}
            </div>
          )}
          {/* Hidden Country Code Field */}
          <input type="hidden" {...register("countryCode")} />

          {/* Password */}
          <div className="mb-3 position-relative mt-3">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control pe-5 ${
                errors.password ? "is-invalid" : ""
              }`}
              onFocus={(e) => {
                e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
              }}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
            {errors.password && (
              <div className="invalid-feedback d-block">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              {...register("agreeToTerms", {
                required: "You must agree to terms",
              })}
            />
            <label
              className="form-check-label text-muted small"
              htmlFor="terms"
            >
              By clicking I agree to the{" "}
              <a href="#" className="text-decoration-none text-primary">
                terms and conditions
              </a>{" "}
              &{" "}
              <a href="#" className="text-decoration-none text-primary">
                Privacy Policy
              </a>
            </label>
            {errors.agreeToTerms && (
              <div className="text-danger small">
                {errors.agreeToTerms.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agreeToTerms}
            className={`btn w-100 ${
              agreeToTerms ? "btn-dark" : "btn-secondary disabled text-muted"
            }`}
          >
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="small text-muted">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary fw-medium text-decoration-none"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
