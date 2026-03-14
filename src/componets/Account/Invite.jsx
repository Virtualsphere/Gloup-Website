import React from 'react';
import { ChevronLeft, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Invite = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5F5F5] md:bg-white min-h-screen md:min-h-full flex flex-col relative pb-[90px] md:pb-0 md:rounded-3xl md:overflow-hidden md:shadow-sm">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-[#F5F5F5] md:bg-white md:border-b border-b border-gray-200 md:px-6 md:py-5">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft className="w-6 h-6 text-black" strokeWidth={2.5} />
        </button>
        <h1 className="text-[19px] md:text-xl font-semibold text-black">Invite & Earn</h1>
      </div>

      <div className="flex-1 overflow-y-auto w-full max-w-md sm:max-w-full md:max-w-4xl lg:max-w-5xl mx-auto md:px-8">
        <div className="px-5 sm:px-10 py-6 md:py-10 lg:py-12 flex flex-col md:flex-row md:items-center md:gap-10 lg:gap-16">
          
          {/* Left Column: Artwork & Description */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            {/* Illustration */}
            <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[340px] lg:max-w-[400px] aspect-[4/3] flex items-center justify-center md:justify-start mb-6 md:mb-8">
              <img 
                src="/invite_illustration.png" 
                alt="Invite Friends Illustration" 
                className="w-full h-full object-contain mix-blend-multiply md:object-left" 
              />
            </div>

            {/* Description Text */}
            <p className="text-center md:text-left text-[16px] md:text-[17px] leading-relaxed text-[#1a1a1a] mb-8 md:mb-0 font-serif px-1 sm:px-0 md:px-0 sm:max-w-full md:max-w-md">
              Invite your friends and both of you get exclusive salon discounts up to <span className="font-bold">₹ 199!</span> Because good hair days are better together.
            </p>
          </div>

          {/* Right Column: Code & Form */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-stretch">
            <div className="w-full max-w-md sm:max-w-full md:max-w-md">
              {/* Share Code Section */}
              <div className="w-full mb-8">
                <h2 className="text-[16px] font-bold text-gray-900 mb-3">Share your code</h2>
                <div className="w-full flex items-center justify-between px-4 py-3.5 border border-dashed border-gray-400 rounded-[12px] bg-[#F5F5F5]">
                  <span className="font-semibold text-gray-900 tracking-wide text-[16px]">GLOUPFIRST</span>
                  <button className="text-gray-700 hover:text-black transition-colors focus:outline-none">
                    <Copy className="w-[22px] h-[22px]" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Referral Form Card */}
              <div className="w-full bg-white rounded-2xl p-5 mb-6 md:border md:border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] md:shadow-sm">
                <h2 className="text-[16px] font-bold text-gray-900 mb-4">Enter your friend's referral code below</h2>
                <input 
                  type="text" 
                  placeholder="e.g. SALON123" 
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-[12px] mb-4 xl:focus:outline-none focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors placeholder:text-gray-300 text-[15px]"
                />
                <button className="w-full py-3.5 bg-white border border-black text-black font-medium text-[15px] rounded-[12px] hover:bg-gray-50 transition-colors active:scale-[0.98]">
                  Apply & Claim
                </button>
              </div>

              {/* Desktop Button moves inside Right Column */}
              <div className="hidden md:block w-full mt-4">
                <button className="w-full bg-black text-white font-semibold text-[16px] py-4 rounded-[12px] hover:bg-gray-900 transition-colors active:scale-[0.98]">
                  Invite Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Button Panel (Hidden on Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F5F5F5] px-5 py-4 border-t border-transparent md:hidden z-50">
        <button className="w-full max-w-md sm:max-w-full mx-auto block bg-black text-white font-semibold text-[16px] py-4 rounded-[12px] hover:bg-gray-900 transition-colors active:scale-[0.98]">
          Invite Friends
        </button>
      </div>
    </div>
  );
};

export default Invite;
