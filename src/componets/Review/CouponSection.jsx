import React, { useState, useEffect } from 'react';
import { Tag, ChevronRight } from 'lucide-react';
import CouponsModal from './CouponsModal';
import CouponSuccessModal from './CouponSuccessModal';
import { useGetCoupon } from '../../hooks/services/useGetCoupon';

const CouponSection = ({ appliedCoupon, onApplyCoupon }) => {
    const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // Fetch dynamic coupons
    const { data: couponsData, isLoading, isError } = useGetCoupon();

    const activeCoupons = couponsData?.data || [];
    
    // Select the first active coupon as the prominent display, if available
    const featuredCoupon = activeCoupons.length > 0 ? activeCoupons[0] : null;

    const handleApplyCoupon = (coupon) => {
        if (appliedCoupon?.code === coupon.code) {
            onApplyCoupon(null);
        } else {
            // Assign a default savings of 50 for now since the API only returns the code
            onApplyCoupon({ code: coupon.code, savings: 50 });
            setIsCouponsModalOpen(false);
            setIsSuccessModalOpen(true);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="bg-gray-100 rounded-xl h-16 animate-pulse"></div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-sm text-red-500">Failed to load coupons.</div>;
    }

    if (activeCoupons.length === 0) {
        return <div className="text-sm text-gray-500">No coupons available right now.</div>;
    }

    return (
        <div className="w-full">
            {/* Prominent Coupon Card */}
            {featuredCoupon && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                            <Tag className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900 text-sm">
                                Save on this booking
                            </div>
                            <div className="text-green-500 font-bold text-xs mt-0.5 uppercase">
                                "{featuredCoupon.code}"
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => handleApplyCoupon(featuredCoupon)}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                            appliedCoupon?.code === featuredCoupon.code
                            ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                    >
                        {appliedCoupon?.code === featuredCoupon.code ? 'Applied' : 'Apply'}
                    </button>
                </div>
            )}

            {/* View All Details */}
            {activeCoupons.length > 1 && (
                <button 
                    onClick={() => setIsCouponsModalOpen(true)}
                    className="flex items-center justify-between w-full py-2 px-1"
                >
                    <span className="font-bold text-gray-900 text-sm">View all coupons</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
            )}

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
