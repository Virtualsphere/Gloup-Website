import React, { useEffect, useState } from 'react';
import SalonCard from '../BookSlot/SalonCard';
import BookingDetailCard from './BookingDetailCard';
import BookingForSection from './BookingForSection';
import CouponSection from './CouponSection';
import BillingSummary from './BillingSummary';
import WalletToggle from './WalletToggle';
import PayButtonBar from './PayButtonBar';
import YouMightLikeSection from './YouMightLikeSection';
import ToastNotification from './ToastNotification';
import { useLocation } from 'react-router-dom';

const initialServices = [
  { id: 's1', name: "Men's Haircut", duration: '30 min', price: 299, isPopular: true },
  { id: 's2', name: "Beard Trim", duration: '15 min', price: 150, isPopular: false }
];

const ReviewConfirmPage = () => {

      
  const location = useLocation();

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const { bookingDate, bookingTime } = location.state || { bookingDate: '27-02-2026', bookingTime: '10:00 AM - 11:00 AM' };

  // State
  const [services, setServices] = useState(initialServices);
  const [addedServiceIds, setAddedServiceIds] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [useWallet, setUseWallet] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Constants / Mock Data
  const platformFee = 7;
  const isPlatformFree = true;
  const walletBalance = 70;

  // Calculations
  const baseAmount = services.reduce((total, service) => total + service.price, 0);
  const couponDiscount = appliedCoupon?.savings || 0;
  const subtotal = Math.max(0, baseAmount - couponDiscount);
  const gstAmount = Math.round(subtotal * 0.05); // 5% GST
  
  const totalBeforeWallet = subtotal + gstAmount + (isPlatformFree ? 0 : platformFee);
  
  // Wallet logic: can't use more than total or balance
  const walletUsed = useWallet ? Math.min(walletBalance, totalBeforeWallet) : 0;
  
  const finalAmount = totalBeforeWallet - walletUsed;

  const handleAddService = (service) => {
    const isAlreadyAdded = addedServiceIds.includes(service.id);

    if (isAlreadyAdded) {
      // Remove from lists
      setServices((prev) => prev.filter(s => s.id !== service.id));
      setAddedServiceIds((prev) => prev.filter(id => id !== service.id));
      setToastMessage(`Removed "${service.name}"`);
    } else {
      // Add to lists
      setServices((prev) => [...prev, service]);
      setAddedServiceIds((prev) => [...prev, service.id]);
      setToastMessage(`Added "${service.name}"`);
    }
    
    // Show Toast
    setIsToastVisible(true);
  };

  const handlePay = () => {
    console.log('Processing payment for ₹', finalAmount, 'with services:', services);
    // Add payment logic here
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-40">
        <div className="">
            <div className="">
                <SalonCard 
                    showTime={true} 
                    bookingDate={bookingDate}
                    bookingTime={bookingTime}
                    rounded={false}
                />
                
                <div className='px-3'>
                    <BookingDetailCard services={services} />
                    <BookingForSection />
                    
                    

                    <CouponSection 
                        appliedCoupon={appliedCoupon}
                        onApplyCoupon={setAppliedCoupon}
                    />

                    <BillingSummary 
                        amount={baseAmount}
                        couponDiscount={couponDiscount}
                        couponCode={appliedCoupon?.code}
                        subtotal={subtotal}
                        gstAmount={gstAmount}
                        isPlatformFree={isPlatformFree}
                        platformFee={platformFee}
                        walletUsed={walletUsed}
                        finalAmount={finalAmount}
                        totalBeforeWallet={totalBeforeWallet}
                    />

                    <YouMightLikeSection 
                        onAddService={handleAddService}
                        addedServiceIds={addedServiceIds}
                    />
                </div>
            </div>
        </div>

        {/* Fixed Elements */}
        <ToastNotification 
            message={toastMessage}
            isVisible={isToastVisible}
            onClose={() => setIsToastVisible(false)}
        />

        <div className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto">

            <div className="bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] pt-4 pb-2 px-6">
                <WalletToggle 
                    balance={walletBalance}
                    useWallet={useWallet}
                    onToggle={() => setUseWallet(!useWallet)}
                />
            </div>
            <PayButtonBar 
                amount={finalAmount}
                onPay={handlePay}
            />
        </div>
    </div>
  );
};

export default ReviewConfirmPage;