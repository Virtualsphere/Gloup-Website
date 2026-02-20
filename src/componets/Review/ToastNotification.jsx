import React, { useEffect } from 'react';

const ToastNotification = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-36 left-0 right-0 z-[60] flex justify-center pointer-events-none animate-slide-up-fade">
      <div className="bg-[#1a1a1a] text-white text-xs font-semibold py-3 px-4  w-full shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default ToastNotification;
