// import { ChevronDown } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import api from "../utils/api";
// import toast from "react-hot-toast";
// import { setMobile } from "../redux/slice/authSlice";
// // import { useApiToast } from "../customHook/useApiToast";
// import { useApiToast } from "../customHook/useApiToast";
// import { FaApple } from "react-icons/fa";
// import { ImAppleinc } from "react-icons/im";
// import { GoogleLogin } from "@react-oauth/google";

// export default function LoginPage() {
//   const { showApiToast } = useApiToast();
//   const navigate = useNavigate();
//   const [selectedCountry, setSelectedCountry] = useState("+91");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const dispatch = useDispatch();

//   const onSubmit = async (data) => {
//     // const fullNumber = `${selectedCountry}${data.mobile}`;
//     const fullNumber = data.mobile;

//     try {
//       const response = await api.post(
//         "/user/auth/sendOTP",
//         {
//           phone: fullNumber,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: false,
//         }
//       );

//       dispatch(setMobile(fullNumber));

//       if (response.data.data == "Otp Sent Successfully") {
//         showApiToast(response, "Otp Sent Successfully", "login");
//         navigate("/otpverification");
//       }
//     } catch (err) {
//       const toastId = "teminated";
//       if (err.response.data.error.message == "Account Terminated") {
//         toast.dismiss(toastId);
//         toast.error("Account Terminated", { id: toastId });
//       }
//       console.error("Error sending OTP:", err?.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSuccess = async (credentialResponse) => {
//     const idToken = credentialResponse.credential;
//     console.log(credentialResponse, "jj");

//     // try {
//     //   const res = await api.post(
//     //     "/user/auth/googlelogin",
//     //     { token: idToken },
//     //     {
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //       },
//     //       withCredentials: false,
//     //     }
//     //   );
//     //   console.log(res, "res");

//     //   const token = res.data?.data?.token;

//     //   if (token) {
//     //     localStorage.setItem("token", token);
//     //     navigate("/");
//     //   } else {
//     //     console.error("Token not received in response");
//     //   }
//     // } catch (error) {
//     //   console.error("Login error:", error.response?.data || error.message);
//     // }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center bg-white p-3 p-sm-4"
//       style={{ maxHeight: "90vh", minHeight: "60vh" }}
//     >
//       <div className="w-100" style={{ maxWidth: "400px" }}>
//         {/* Header */}
//         <div className="text-center mb-4">
//           <h1 className="h4 fw-bold text-dark">Welcome Back!</h1>
//           <p className="text-muted small">
//             Enter Mobile Number To Get OTP for Login
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Phone Input */}
//           <div className="d-flex align-items-center gap-2 mb-2">
//             {/* Country Code Dropdown */}
//             {/* <div className="position-relative" ref={dropdownRef}>
//                 <button
//                   type="button"
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   onFocus={(e) => {
//                     e.target.style.boxShadow =
//                       "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
//                   }}
//                   className="btn btn-outline-secondary d-flex justify-content-between align-items-center"
//                   style={{ width: "80px", height: "40px" }}
//                 >
//                   <span className="small">{selectedCountry}</span>
//                   <ChevronDown size={16} className="text-secondary" />
//                 </button>

//                 {isDropdownOpen && (
//                   <div
//                     className="position-absolute mt-1 bg-white border rounded shadow z-10 p-2"
//                     style={{ width: "120px" }}
//                   >
//                     {countries.map((country) => (
//                       <button
//                         key={country.code}
//                         type="button"
//                         onClick={() => {
//                           setSelectedCountry(country.code);
//                           setIsDropdownOpen(false);
//                         }}
//                         className="dropdown-item text-start small"
//                       >
//                         {country.code}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div> */}
//             <div className="position-relative">
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary d-flex justify-content-between align-items-center"
//                 style={{ width: "80px", height: "40px", cursor: "default" }}
//                 disabled
//               >
//                 <span className="small">+91</span>
//               </button>
//             </div>

//             {/* Mobile Number Input */}
//             <div className="flex-grow-1 position-relative">
//               <input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 onFocus={(e) => {
//                   e.target.style.boxShadow =
//                     "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
//                 }}
//                 className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Enter a valid 10-digit number",
//                   },
//                 })}
//               />
//             </div>
//           </div>

//           {/* Error Message */}
//           <div style={{ minHeight: "24px" }} className="mb-2">
//             {errors.mobile && (
//               <div className="invalid-feedback d-block">
//                 {errors.mobile.message}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="btn btn-dark w-100 mb-3"
//             onFocus={(e) => {
//               e.target.style.boxShadow =
//                 "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
//             }}
//           >
//             Login
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="position-relative my-3 text-center">
//           <hr className="m-0" />
//           <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
//             Or
//           </span>
//         </div>

//         {/* Social Logins */}
//         <div className="d-grid gap-2">
//           <GoogleLogin
//             onSuccess={handleSuccess}
//             onError={() => console.error("Login Failed")}
//             useOneTap
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// import { ChevronDown } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import api from "../utils/api";
// import toast from "react-hot-toast";
// import { setMobile } from "../redux/slice/authSlice";
// import { useApiToast } from "../customHook/useApiToast";
// import { useGoogleLogin } from "@react-oauth/google";
// import { FaGoogle } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";

// export default function LoginPage() {
//   const { showApiToast } = useApiToast();
//   const navigate = useNavigate();
//   const [selectedCountry, setSelectedCountry] = useState("+91");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // ✅ Trigger Google OAuth manually
//   // const googleLogin = useGoogleLogin({
//   //   onSuccess: async (tokenResponse) => {
//   //     console.log(tokenResponse,"tokenResponse");

//   //     const idToken = tokenResponse.credential || tokenResponse.access_token;
//   //     // try {
//   //     //   const res = await api.post(
//   //     //     "/user/auth/googlelogin",
//   //     //     { token: idToken },
//   //     //     {
//   //     //       headers: { "Content-Type": "application/json" },
//   //     //       withCredentials: false,
//   //     //     }
//   //     //   );

//   //     //   const token = res.data?.data?.token;
//   //     //   if (token) {
//   //     //     localStorage.setItem("token", token);
//   //     //     navigate("/");
//   //     //   } else {
//   //     //     console.error("Token not received in response");
//   //     //   }
//   //     // } catch (error) {
//   //     //   console.error("Login error:", error.response?.data || error.message);
//   //     // }
//   //   },
//   //   onError: (error) => {
//   //     console.error("Google Login Failed:", error);
//   //     toast.error("Google login failed. Please try again.");
//   //   },
//   // });
//   const googleLogin = useGoogleLogin({
//   flow: "implicit", // 👈 this enables getting ID token instead of access token
//   onSuccess: async (tokenResponse) => {
//     console.log(tokenResponse, "tokenResponse");

//     // ✅ Now you'll get tokenResponse.id_token (Google ID token / credential)
//     const idToken = tokenResponse.id_token;
//     console.log("Google ID Token:", idToken);

//     // try {
//     //   const res = await api.post(
//     //     "/user/auth/googlelogin",
//     //     { token: idToken },
//     //     {
//     //       headers: { "Content-Type": "application/json" },
//     //       withCredentials: false,
//     //     }
//     //   );

//     //   const token = res.data?.data?.token;
//     //   if (token) {
//     //     localStorage.setItem("token", token);
//     //     navigate("/");
//     //   } else {
//     //     console.error("Token not received in response");
//     //   }
//     // } catch (error) {
//     //   console.error("Login error:", error.response?.data || error.message);
//     // }
//   },
//   onError: (error) => {
//     console.error("Google Login Failed:", error);
//     toast.error("Google login failed. Please try again.");
//   },
// });

//   const onSubmit = async (data) => {
//     const fullNumber = data.mobile;
//     try {
//       const response = await api.post(
//         "/user/auth/sendOTP",
//         { phone: fullNumber },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: false,
//         }
//       );

//       dispatch(setMobile(fullNumber));

//       if (response.data.data === "Otp Sent Successfully") {
//         showApiToast(response, "Otp Sent Successfully", "login");
//         navigate("/otpverification");
//       }
//     } catch (err) {
//       const toastId = "terminated";
//       if (err.response?.data?.error?.message === "Account Terminated") {
//         toast.dismiss(toastId);
//         toast.error("Account Terminated", { id: toastId });
//       }
//       console.error("Error sending OTP:", err?.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center bg-white p-3 p-sm-4"
//       style={{ maxHeight: "90vh", minHeight: "60vh" }}
//     >
//       <div className="w-100" style={{ maxWidth: "400px" }}>
//         {/* Header */}
//         <div className="text-center mb-4">
//           <h1 className="h4 fw-bold text-dark">Welcome Back!</h1>
//           <p className="text-muted small">
//             Enter Mobile Number To Get OTP for Login
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="d-flex align-items-center gap-2 mb-2">
//             {/* Country Code (disabled) */}
//             <div className="position-relative">
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary d-flex justify-content-between align-items-center"
//                 style={{ width: "80px", height: "40px", cursor: "default" }}
//                 disabled
//               >
//                 <span className="small">{selectedCountry}</span>
//               </button>
//             </div>

//             {/* Mobile Input */}
//             <div className="flex-grow-1 position-relative">
//               <input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 onFocus={(e) => {
//                   e.target.style.boxShadow =
//                     "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
//                 }}
//                 className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Enter a valid 10-digit number",
//                   },
//                 })}
//               />
//             </div>
//           </div>

//           {/* Error Message */}
//           <div style={{ minHeight: "24px" }} className="mb-2">
//             {errors.mobile && (
//               <div className="invalid-feedback d-block">
//                 {errors.mobile.message}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="btn btn-dark w-100 mb-3"
//             onFocus={(e) => {
//               e.target.style.boxShadow =
//                 "0 0 0 0.2rem rgba(255, 255, 255, 0.1)";
//             }}
//           >
//             Login
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="position-relative my-3 text-center">
//           <hr className="m-0" />
//           <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
//             Or
//           </span>
//         </div>

//         {/* ✅ Custom Google Login Button */}
//         <div className="d-grid gap-2">
//           <button
//             type="button"
//             className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2"
//             style={{
//               borderRadius: "8px",
//               padding: "10px 20px",
//               fontWeight: "500",
//               fontSize: "16px",
//             }}
//             onClick={() => googleLogin()}
//           >
//             <FcGoogle size={20} />
//             Continue with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { ChevronDown } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import api from "../utils/api";
// import toast from "react-hot-toast";
// import { setMobile } from "../redux/slice/authSlice";
// import { useApiToast } from "../customHook/useApiToast";
// import { FaGoogle } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";

// export default function LoginPage() {
//   const { showApiToast } = useApiToast();
//   const navigate = useNavigate();
//   const [selectedCountry] = useState("+91");
//   const dropdownRef = useRef(null);
//   const googleButtonRef = useRef(null);
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // --- Send OTP login handler ---
//   const onSubmit = async (data) => {
//     const fullNumber = data.mobile;

//     try {
//       const response = await api.post(
//         "/user/auth/sendOTP",
//         { phone: fullNumber },
//         { headers: { "Content-Type": "application/json" }, withCredentials: false }
//       );

//       dispatch(setMobile(fullNumber));

//       if (response.data.data === "Otp Sent Successfully") {
//         showApiToast(response, "Otp Sent Successfully", "login");
//         navigate("/otpverification");
//       }
//     } catch (err) {
//       const toastId = "terminated";
//       if (err.response?.data?.error?.message === "Account Terminated") {
//         toast.dismiss(toastId);
//         toast.error("Account Terminated", { id: toastId });
//       }
//       console.error("Error sending OTP:", err?.response?.data || err.message);
//     }
//   };

//   // --- Click outside dropdown (if re-enabled later) ---
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         // setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- Handle Google Login Success ---
//   const handleSuccess = async (credentialResponse) => {
//     const idToken = credentialResponse.credential;
//     console.log("Google Login Success:", credentialResponse);

//     try {
//       const res = await api.post(
//         "/user/auth/googlelogin",
//         { token: idToken },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: false,
//         }
//       );

//       const token = res.data?.data?.token;
//       if (token) {
//         localStorage.setItem("token", token);
//         navigate("/");
//       } else {
//         console.error("Token not received in response");
//       }
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center bg-white p-3 p-sm-4"
//       style={{ maxHeight: "90vh", minHeight: "60vh" }}
//     >
//       <div className="w-100" style={{ maxWidth: "400px" }}>
//         {/* Header */}
//         <div className="text-center mb-4">
//           <h1 className="h4 fw-bold text-dark">Welcome Back!</h1>
//           <p className="text-muted small">
//             Enter Mobile Number To Get OTP for Login
//           </p>
//         </div>

//         {/* OTP Form */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="d-flex align-items-center gap-2 mb-2">
//             <div className="position-relative">
//               <button
//                 type="button"
//                 className="btn btn-outline-secondary d-flex justify-content-between align-items-center"
//                 style={{ width: "80px", height: "40px", cursor: "default" }}
//                 disabled
//               >
//                 <span className="small">{selectedCountry}</span>
//               </button>
//             </div>

//             <div className="flex-grow-1 position-relative">
//               <input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Enter a valid 10-digit number",
//                   },
//                 })}
//               />
//             </div>
//           </div>

//           {errors.mobile && (
//             <div className="invalid-feedback d-block mb-2">
//               {errors.mobile.message}
//             </div>
//           )}

//           <button type="submit" className="btn btn-dark w-100 mb-3">
//             Login
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="position-relative my-3 text-center">
//           <hr className="m-0" />
//           <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
//             Or
//           </span>
//         </div>

//         {/* Hidden Google Login */}
//         <div style={{ display: "none" }}>
//           <GoogleLogin
//             onSuccess={handleSuccess}
//             onError={() => console.error("Login Failed")}
//             useOneTap
//             ref={googleButtonRef}
//           />
//         </div>

//         {/* Custom Google Button */}
//         <button
//           type="button"
//           className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
//           onClick={() => {
//             if (googleButtonRef.current) {
//               const googleDiv = googleButtonRef.current.querySelector("div[role='button']");
//               if (googleDiv) googleDiv.click(); // trigger the hidden Google login
//             }
//           }}
//         >
//           <FaGoogle size={18} />
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// }


import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../utils/api";
import toast from "react-hot-toast";
import { setMobile } from "../redux/slice/authSlice";
import { useApiToast } from "../customHook/useApiToast";

import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { showApiToast } = useApiToast();
  const navigate = useNavigate();
  const [selectedCountry] = useState("+91");
  const dropdownRef = useRef(null);
  const googleDivRef = useRef(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // --- Send OTP login handler ---
  const onSubmit = async (data) => {
    const fullNumber = data.mobile;

    try {
      const response = await api.post(
        "/user/auth/sendOTP",
        { phone: fullNumber },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      dispatch(setMobile(fullNumber));

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

  // --- Google One Tap & Button Initialization ---
  useEffect(() => {
    if (window.google && googleDivRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // must exist in your .env
        callback: handleGoogleResponse,
      });

      // Render the hidden Google button
      window.google.accounts.id.renderButton(googleDivRef.current, {
        theme: "outline",
        size: "large",
      });
    } else {
      console.warn("Google script not loaded yet.");
    }
  }, []);

  // --- Handle Google Login Success ---
  const handleGoogleResponse = async (response) => {
    const idToken = response.credential;
    console.log("Google Login Success:", response);

    try {
      const res = await api.post(
        "/user/auth/googlelogin",
        { token: idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );

      const token = res.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login Successful!");
        navigate("/");
      } else {
        toast.error("Token not received in response");
      }
    } catch (error) {
      console.error("Google login error:", error.response?.data || error.message);
      toast.error("Google Login Failed");
    }
  };

  // --- Custom Google Button Click Handler ---
  const handleCustomGoogleClick = () => {
    const googleBtn = googleDivRef.current?.querySelector("div[role='button']");
    if (googleBtn) {
      googleBtn.click();
    } else {
      toast.error("Google login is not ready yet. Please wait a moment.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-white p-3 p-sm-4"
      style={{ maxHeight: "90vh", minHeight: "60vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="h4 fw-bold text-dark">Welcome Back!</h1>
          <p className="text-muted small">
            Enter Mobile Number To Get OTP for Login
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="position-relative">
              <button
                type="button"
                className="btn btn-outline-secondary d-flex justify-content-between align-items-center"
                style={{ width: "80px", height: "40px", cursor: "default" }}
                disabled
              >
                <span className="small">{selectedCountry}</span>
              </button>
            </div>

            <div className="flex-grow-1 position-relative">
              <input
                type="tel"
                placeholder="Mobile Number"
                className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
              />
            </div>
          </div>

          {errors.mobile && (
            <div className="invalid-feedback d-block mb-2">
              {errors.mobile.message}
            </div>
          )}

          <button type="submit" className="btn btn-dark w-100 mb-3">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="position-relative my-3 text-center">
          <hr className="m-0" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
            Or
          </span>
        </div>

        {/* Hidden Google Login Button */}
        <div ref={googleDivRef} style={{ display: "none" }}></div>

        {/* Custom Google Button */}
        <button
          type="button"
          onClick={handleCustomGoogleClick}
          className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <FcGoogle size={18} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}


