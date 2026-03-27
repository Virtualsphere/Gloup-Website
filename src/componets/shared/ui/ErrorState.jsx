// components/ui/ErrorState.jsx

import { RefreshCcw } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  message = "Our team is working on it. Please try again later.",
  onRetry,
  fullScreen = false,
}) => {
  return (
    <div
      className={`${
        fullScreen ? "min-h-screen" : "w-full"
      } flex items-center justify-center`}
    >
      <div className="flex flex-col bg-white items-center justify-center text-center px-6 py-14 border border-gray-200 rounded-2xl shadow-sm max-w-md w-full">
        
        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 mb-4">
          <RefreshCcw className="w-6 h-6 text-black" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-black">
          {title}
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-500 mt-2">
          {message}
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 px-4 py-2 border border-black text-black text-sm font-medium rounded-lg hover:bg-black hover:text-white transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;