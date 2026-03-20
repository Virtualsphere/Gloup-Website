import React, { useState } from 'react';
import { useSendOtp } from '../../hooks/services/auth/useSendOtp';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSubmit }) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const { mutate, isPending, isSuccess, isError, data, error } = useSendOtp();

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      mutate(mobileNumber, {
        onSuccess: (response) => {
          toast.success(response?.message || 'OTP sent successfully!');
          onLoginSubmit(mobileNumber);
          
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Failed to send OTP. Please try again.');
        }
      });
    } else {
      toast.error('Please enter a valid 10-digit mobile number.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg px-5 py-6 md:p-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Enter Mobile Number to Get OTP for Login
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        {/* Mobile Number Input */}
        <div className="flex gap-2 md:gap-3">
          {/* Country Code */}
          <div className="flex items-center gap-1.5 md:gap-2 bg-white border border-gray-300 rounded-xl px-3 md:px-4 py-3.5 min-w-[80px] md:min-w-[90px]">
            <div className="w-5 h-3.5 md:w-6 md:h-4 rounded-sm overflow-hidden flex-shrink-0">
              <svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="5.33" fill="#FF9933"/>
                <rect y="5.33" width="24" height="5.34" fill="#FFFFFF"/>
                <rect y="10.67" width="24" height="5.33" fill="#138808"/>
                <circle cx="12" cy="8" r="1.5" fill="#000080"/>
              </svg>
            </div>
            <span className="text-gray-900 font-medium text-sm md:text-base">+91</span>
          </div>

          {/* Mobile Input */}
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="flex-1 border border-gray-300 rounded-xl px-3 md:px-4 py-3.5 text-gray-900 text-base md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent min-w-0"
            maxLength="10"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-colors"
        >
          {isPending ? "Sending..." : "Send OTP"}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-4">
            <span className="text-gray-500 text-sm">or</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full border border-gray-300 text-gray-900 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.8055 10.2292C19.8055 9.55058 19.7502 8.86716 19.6306 8.19824H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.8251C18.712 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
            <path d="M10.2002 20.0006C12.9516 20.0006 15.2727 19.1151 16.8297 17.5865L13.6071 15.0879C12.7073 15.6979 11.5498 16.043 10.2048 16.043C7.54234 16.043 5.28639 14.2833 4.48327 11.9169H1.16406V14.4927C2.76302 17.6787 6.34098 20.0006 10.2002 20.0006Z" fill="#34A853"/>
            <path d="M4.47883 11.9169C4.06102 10.675 4.06102 9.33009 4.47883 8.08817V5.51233H1.16428C-0.378517 8.57989 -0.378517 12.4252 1.16428 15.4927L4.47883 11.9169Z" fill="#FBBC04"/>
            <path d="M10.2002 3.95805C11.6235 3.936 13.0006 4.47247 14.0366 5.45722L16.8941 2.60218C15.1858 0.990848 12.9378 0.0983505 10.2002 0.125301C6.34098 0.125301 2.76302 2.44721 1.16406 5.51234L4.47861 8.08818C5.27708 5.71712 7.53768 3.95805 10.2002 3.95805Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
