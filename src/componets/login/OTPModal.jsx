import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

import { useVerifyOtp } from '../../hooks/services/auth/useVerifyOtp';
import { useSendOtp } from '../../hooks/services/auth/useSendOtp';
import toast from 'react-hot-toast';

const OTPModal = ({ isOpen, onClose, mobileNumber }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(56);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const { mutate: verifyOtpMutate, isPending } = useVerifyOtp();
  const { mutate: sendOtpMutate, isPending: isResending } = useSendOtp();


  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      // Focus first input
      inputRefs[0].current?.focus();
      
      // Start timer
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(interval);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      verifyOtpMutate({ phone: mobileNumber, otp: otpValue }, {
        onSuccess: (response) => {
          toast.success(response?.message || 'OTP verified successfully!');
          onClose();
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || 'Invalid OTP. Please try again.');
          // Clear inputs on error
          setOtp(['', '', '', '']);
          inputRefs[0].current?.focus();
        }
      });
    }
  };

  const handleResend = () => {
    sendOtpMutate(mobileNumber, {
      onSuccess: (response) => {
        toast.success(response?.message || 'OTP resent successfully!');
        setOtp(['', '', '', '']);
        setTimer(56);
        inputRefs[0].current?.focus();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || 'Failed to resend OTP. Please try again.');
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} strokeWidth={2} />
        </button>

        <div className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Verify OTP
          </h2>
          <p className="text-gray-500 text-sm">
            Enter the 4-digit code sent to +91{mobileNumber}
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 md:gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="tel"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-14 md:w-20 md:h-16 text-center text-xl md:text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-right mb-6">
          <span className="text-sm text-gray-500">{timer} Sec Remaining</span>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isPending}
          className={`w-full font-semibold py-4 rounded-xl transition-colors mb-6 ${
            otp.join('').length === 4 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend OTP */}
        <button
          onClick={handleResend}
          disabled={timer > 0 || isResending}
          className={`w-full font-medium transition-colors ${
            timer > 0 || isResending 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isResending ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
