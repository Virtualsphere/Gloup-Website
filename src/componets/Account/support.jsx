import React from 'react';
import { ChevronLeft, ClipboardList, Handshake, Ban, PhoneCall, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();

  const supportItems = [
    { icon: <ClipboardList className="w-[22px] h-[22px] text-gray-700" strokeWidth={1.5} />, label: 'Privacy Policy', path: '/privacy-policy' },
    { icon: <Handshake className="w-[22px] h-[22px] text-gray-700" strokeWidth={1.5} />, label: 'Terms of Use', path: '/terms-conditions' },
    { icon: <Ban className="w-[22px] h-[22px] text-gray-700" strokeWidth={1.5} />, label: 'Cancellation', path: '/refund-policy' },
    { icon: <PhoneCall className="w-[22px] h-[22px] text-gray-700" strokeWidth={1.5} />, label: 'Contact', path: '' },
    { icon: <HelpCircle className="w-[22px] h-[22px] text-gray-700" strokeWidth={1.5} />, label: 'FAQs', path: '' },
  ];

  return (
    <div className="bg-[#F5F5F5] md:bg-white min-h-screen md:min-h-full flex flex-col relative pb-20 md:pb-0 md:rounded-3xl md:overflow-hidden md:shadow-sm font-sans">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-[#F5F5F5] md:bg-white md:border-b border-b border-gray-200 md:px-6 md:py-5">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft className="w-6 h-6 text-black" strokeWidth={2.5} />
        </button>
        <h1 className="text-[19px] md:text-xl font-semibold text-black">Support</h1>
      </div>

      <div className="flex-1 overflow-y-auto w-full">
        <div className="px-5 sm:px-10 py-6 md:py-8">
          
          {/* Support Options Card */}
          <div className="w-full bg-white rounded-2xl flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)] md:border md:border-gray-100 md:shadow-sm overflow-hidden py-2">
            {supportItems.map((item, index) => (
              <button 
                key={index}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-5 px-5 py-4 hover:bg-gray-50 transition-colors text-left ${
                  index !== supportItems.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <div className="flex items-center justify-center w-6">
                  {item.icon}
                </div>
                <span className="text-[16px] text-[#1a1a1a] tracking-wide font-medium">{item.label}</span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
