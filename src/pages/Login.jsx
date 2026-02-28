import React, { useState } from 'react';
import LoginForm from '../componets/login/LoginForm';
import OTPModal from '../componets/login/OTPModal';

const Login = () => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  const handleLoginSubmit = (number) => {
    setMobileNumber(number);
    setShowOTPModal(true);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-3 md:px-4 overflow-y-auto">
      <LoginForm onLoginSubmit={handleLoginSubmit} />
      <OTPModal 
        isOpen={showOTPModal} 
        onClose={() => setShowOTPModal(false)} 
        mobileNumber={mobileNumber}
      />
    </div>
  );
};

export default Login;