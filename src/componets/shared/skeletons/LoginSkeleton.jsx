import React from 'react'

/**
 * Matches LoginForm.jsx exactly:
 * Container: w-full max-w-md, rounded-3xl shadow-lg px-5 py-6 md:p-10
 * - Title + subtitle
 * - Country code box + mobile input (flex gap-2)
 * - Full-width black "Send OTP" button
 * - "or" divider (border-t + centered text)
 * - Full-width outlined "Continue with Google" button
 */
const LoginSkeleton = () => (
  <div className="h-screen flex items-center justify-center bg-white px-3 md:px-4">
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg px-5 py-6 md:p-10 animate-pulse">

      {/* Title + subtitle */}
      <div className="mb-6 md:mb-8">
        <div className="h-8 md:h-10 bg-gray-200 rounded w-48 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-72" />
      </div>

      <div className="space-y-5 md:space-y-6">
        {/* Country code + mobile input */}
        <div className="flex gap-2 md:gap-3">
          {/* +91 box */}
          <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-4 py-3.5 min-w-[80px] md:min-w-[90px] flex justify-center">
            <div className="h-5 bg-gray-200 rounded w-10" />
          </div>
          {/* Input */}
          <div className="flex-1 border border-gray-200 rounded-xl px-3 md:px-4 py-3.5 bg-gray-100" />
        </div>

        {/* Send OTP button */}
        <div className="w-full h-14 bg-gray-200 rounded-xl" />

        {/* "or" divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative bg-white px-4">
            <div className="h-4 w-5 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Google button */}
        <div className="w-full h-14 bg-gray-200 rounded-xl" />
      </div>
    </div>
  </div>
)

export default LoginSkeleton
