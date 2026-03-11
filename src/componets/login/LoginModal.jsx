import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSendOtp } from '../../hooks/services/auth/useSendOtp';
import { useVerifyOtp } from '../../hooks/services/auth/useVerifyOtp';
import { useUiStore } from '../../store/uiStore';
import toast from 'react-hot-toast';

/* ─────────────────────────────────────────────
   STEP 1 — Phone number / Send OTP form
───────────────────────────────────────────── */
const PhoneStep = ({ onOtpSent }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const { mutate, isPending } = useSendOtp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }
    mutate(mobileNumber, {
      onSuccess: (response) => {
        toast.success(response?.message || 'OTP sent successfully!');
        onOtpSent(mobileNumber);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.message || 'Failed to send OTP. Please try again.'
        );
      },
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Welcome Back!
        </h2>
        <p className="text-gray-500 text-sm">
          Enter your mobile number to receive an OTP
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Mobile Number Input */}
        <div className="flex gap-2">
          {/* Country Code */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-xl px-3 py-3.5 min-w-[80px]">
            <div className="w-5 h-3.5 rounded-sm overflow-hidden flex-shrink-0">
              <svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="5.33" fill="#FF9933" />
                <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
                <rect y="10.67" width="24" height="5.33" fill="#138808" />
                <circle cx="12" cy="8" r="1.5" fill="#000080" />
              </svg>
            </div>
            <span className="text-gray-900 font-medium text-sm">+91</span>
          </div>

          {/* Input */}
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) =>
              setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
            }
            className="flex-1 border border-gray-300 rounded-xl px-3 py-3.5 text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent min-w-0"
            maxLength="10"
            autoFocus
          />
        </div>

        {/* Send OTP Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
        >
          {isPending ? 'Sending…' : 'Send OTP'}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
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
            <path d="M19.8055 10.2292C19.8055 9.55058 19.7502 8.86716 19.6306 8.19824H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0879V17.5866H16.8251C18.712 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4" />
            <path d="M10.2002 20.0006C12.9516 20.0006 15.2727 19.1151 16.8297 17.5865L13.6071 15.0879C12.7073 15.6979 11.5498 16.043 10.2048 16.043C7.54234 16.043 5.28639 14.2833 4.48327 11.9169H1.16406V14.4927C2.76302 17.6787 6.34098 20.0006 10.2002 20.0006Z" fill="#34A853" />
            <path d="M4.47883 11.9169C4.06102 10.675 4.06102 9.33009 4.47883 8.08817V5.51233H1.16428C-0.378517 8.57989 -0.378517 12.4252 1.16428 15.4927L4.47883 11.9169Z" fill="#FBBC04" />
            <path d="M10.2002 3.95805C11.6235 3.936 13.0006 4.47247 14.0366 5.45722L16.8941 2.60218C15.1858 0.990848 12.9378 0.0983505 10.2002 0.125301C6.34098 0.125301 2.76302 2.44721 1.16406 5.51234L4.47861 8.08818C5.27708 5.71712 7.53768 3.95805 10.2002 3.95805Z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>
      </form>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STEP 2 — OTP verification form
───────────────────────────────────────────── */
const OtpStep = ({ mobileNumber, onBack, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(56);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const { mutate: verifyOtpMutate, isPending } = useVerifyOtp();
  const { mutate: sendOtpMutate, isPending: isResending } = useSendOtp();

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs[index + 1].current?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) return;
    verifyOtpMutate(
      { phone: mobileNumber, otp: otpValue },
      {
        onSuccess: (response) => {
          toast.success(response?.message || 'Login successful!');
          onSuccess();
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || 'Invalid OTP. Please try again.'
          );
          setOtp(['', '', '', '']);
          inputRefs[0].current?.focus();
        },
      }
    );
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
        toast.error(
          err?.response?.data?.message || 'Failed to resend OTP. Please try again.'
        );
      },
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Verify OTP
        </h2>
        <p className="text-gray-500 text-sm">
          Enter the 4-digit code sent to{' '}
          <span className="font-medium text-gray-700">+91 {mobileNumber}</span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-between gap-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="tel"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-16 h-14 md:w-20 md:h-16 text-center text-xl md:text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          />
        ))}
      </div>

      {/* Timer */}
      <div className="text-right mb-5">
        <span className="text-sm text-gray-500">{timer} sec remaining</span>
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={isPending || otp.join('').length !== 4}
        className={`w-full font-semibold py-4 rounded-xl transition-colors mb-4 ${
          otp.join('').length === 4
            ? 'bg-black text-white hover:bg-gray-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isPending ? 'Verifying…' : 'Verify OTP'}
      </button>

      {/* Resend + Back */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Change number
        </button>

        <button
          onClick={handleResend}
          disabled={timer > 0 || isResending}
          className={`text-sm font-medium transition-colors ${
            timer > 0 || isResending
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-black hover:underline'
          }`}
        >
          {isResending ? 'Sending…' : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main LoginModal — orchestrates both steps
───────────────────────────────────────────── */
const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useUiStore();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [mobileNumber, setMobileNumber] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginModalOpen]);

  // Reset to phone step each time modal opens
  useEffect(() => {
    if (isLoginModalOpen) {
      setStep('phone');
      setMobileNumber('');
    }
  }, [isLoginModalOpen]);

  const handleOtpSent = (number) => {
    setMobileNumber(number);
    setStep('otp');
  };

  const handleSuccess = () => {
    closeLoginModal();
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeLoginModal}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-md animate-[fadeIn_0.2s_ease]">
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
          aria-label="Close login modal"
        >
          <X size={22} strokeWidth={2} />
        </button>

        {step === 'phone' ? (
          <PhoneStep onOtpSent={handleOtpSent} />
        ) : (
          <OtpStep
            mobileNumber={mobileNumber}
            onBack={() => setStep('phone')}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
