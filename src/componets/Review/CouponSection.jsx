import React, { useState, useEffect } from 'react';
import { Tag, ChevronRight } from 'lucide-react';
import CouponsModal from './CouponsModal';
import CouponSuccessModal from './CouponSuccessModal';
import { useGetCoupon } from '../../hooks/services/useGetCoupon';

const CouponSection = ({ amount = 0, appliedCoupon, onApplyCoupon }) => {
    const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // Fetch dynamic coupons
    const { data: couponsData, isLoading, isError } = useGetCoupon();

    console.log(couponsData, "couponsData")

    const activeCoupons = couponsData?.data || [];

    const getCouponDetails = (coupon) => {
        const match = coupon.code.match(/\d+/);
        const extractedAmount = match ? parseInt(match[0], 10) : 0;
        const requiredAmount = extractedAmount + 30;
        const isValid = amount >= requiredAmount;
        const pendingAmount = isValid ? 0 : requiredAmount - amount;
        return { extractedAmount, isValid, pendingAmount };
    };

    // Select the first active coupon as the prominent display, if available
    const featuredCoupon = activeCoupons.length > 0 ? activeCoupons[0] : null;

    const handleApplyCoupon = (coupon, extractedAmount = 50) => {
        if (appliedCoupon?.code === coupon.code) {
            onApplyCoupon(null);
        } else {
            // Assign a default savings of 50 for now since the API only returns the code
            onApplyCoupon({ code: coupon.code, savings: extractedAmount });
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
            {featuredCoupon && (() => {
                const { extractedAmount, isValid, pendingAmount } = getCouponDetails(featuredCoupon);
                return (
                    <div className={`bg-white rounded-xl shadow-sm border ${isValid ? 'border-stone-100' : 'border-gray-200 opacity-60 bg-gray-50'} mb-2 overflow-hidden`}>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isValid ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-400'}`}>
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className={`font-semibold text-sm ${isValid ? 'text-gray-900' : 'text-gray-400'}`}>
                                        Save on this booking
                                    </div>
                                    <div className={`font-bold text-xs mt-0.5 uppercase ${isValid ? 'text-green-500' : 'text-gray-400'}`}>
                                        "{featuredCoupon.code}"
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (isValid) handleApplyCoupon(featuredCoupon, extractedAmount);
                                }}
                                disabled={!isValid}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                                    !isValid
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : appliedCoupon?.code === featuredCoupon.code
                                        ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                }`}
                            >
                                {appliedCoupon?.code === featuredCoupon.code ? 'Applied' : 'Apply'}
                            </button>
                        </div>
                        {!isValid && (
                            <div className="bg-[#FFF8E7] px-4 py-2 flex items-center gap-2 text-[#EBBB6C] text-xs font-medium">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                Add services worth ₹{pendingAmount} more to avail this coupon
                            </div>
                        )}
                    </div>
                );
            })()}

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
                amount={amount}
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
