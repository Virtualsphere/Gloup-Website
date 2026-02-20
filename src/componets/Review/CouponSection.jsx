import React, { useState } from 'react';
import { Tag, ChevronRight } from 'lucide-react';
import CouponsModal from './CouponsModal';
import CouponSuccessModal from './CouponSuccessModal';

const CouponSection = ({ appliedCoupon, onApplyCoupon }) => {
    const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleApplyCoupon = (coupon) => {
        if (appliedCoupon?.code === coupon.code) {
            onApplyCoupon(null);
        } else {
            onApplyCoupon(coupon);
            setIsCouponsModalOpen(false);
            setIsSuccessModalOpen(true);
        }
    };

    return (
        <div className="mt-8 px-1">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Coupons & Offers</h2>
            
            {/* Coupon Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                        <Tag className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 text-sm">
                            Save ₹50 with
                        </div>
                        <div className="text-green-500 font-bold text-xs mt-0.5">
                            "GLOUP2026"
                        </div>
                    </div>
                </div>
                
                <button
                    onClick={() => handleApplyCoupon({ code: 'GLOUP2026', savings: 50 })}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                        appliedCoupon?.code === 'GLOUP2026'
                        ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                    {appliedCoupon?.code === 'GLOUP2026' ? 'Applied' : 'Apply'}
                </button>
            </div>

            {/* View All Details */}
            <button 
                onClick={() => setIsCouponsModalOpen(true)}
                className="flex items-center justify-between w-full py-2"
            >
                <span className="font-bold text-gray-900 text-sm">View all coupons</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            {/* Modals */}
            <CouponsModal 
                isOpen={isCouponsModalOpen}
                onClose={() => setIsCouponsModalOpen(false)}
                onApply={handleApplyCoupon}
                appliedCoupon={appliedCoupon}
            />

            <CouponSuccessModal 
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                savings={appliedCoupon?.savings || 0}
                couponCode={appliedCoupon?.code || ''}
            />
        </div>
    );
};

export default CouponSection;
