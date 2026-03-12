export const calculateBilling = ({
  allServices = [],
  appliedCoupon = null,
  useWallet = false,
  walletBalance = 0,
  platformFee = 7,
  isPlatformFree = true,
}) => {
  const baseAmount = allServices.reduce((total, s) => {
    // Determine the "original" base price. Default to price if originalPrice is not present or lower
    const originalPrice = parseFloat(s.originalPrice);
    const price = parseFloat(s.price);
    const original = (originalPrice && originalPrice > price) ? originalPrice : (price || 0);
    return total + original;
  }, 0);

  const discountedAmount = allServices.reduce((total, s) => total + (parseFloat(s.price) || 0), 0);
  const serviceDiscount = Math.max(0, baseAmount - discountedAmount);

  const couponDiscount = parseFloat(appliedCoupon?.savings) || 0;
  const subtotal = Math.max(0, discountedAmount - couponDiscount);
  // Calculate GST from the subtotal securely after coupon is applied
  const gstAmount = Math.round((subtotal * 5) / 100);
  const totalBeforeWallet = subtotal + gstAmount + (isPlatformFree ? 0 : platformFee);
  const walletUsed = useWallet ? Math.min(walletBalance, totalBeforeWallet) : 0;
  const finalAmount = Math.max(0, totalBeforeWallet - walletUsed);

  return {
    amount: baseAmount,
    discountedAmount,     // pre-coupon service total — used for coupon eligibility check
    serviceDiscount,
    couponDiscount,
    couponCode: appliedCoupon?.code,
    subtotal,
    gstAmount,
    isPlatformFree,
    platformFee,
    walletUsed,
    finalAmount,
    totalBeforeWallet,
  };
};
