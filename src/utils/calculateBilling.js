export const calculateBilling = ({
  allServices = [],
  appliedCoupon = null,
  useWallet = false,
  walletBalance = 0,
  platformFee = 7,
  isPlatformFree = true,
}) => {
  const baseAmount = allServices.reduce((total, s) => total + (s.price ?? 0), 0);
  const couponDiscount = appliedCoupon?.savings || 0;
  const subtotal = Math.max(0, baseAmount - couponDiscount);
  const gstAmount = Math.round(subtotal * 0.05);
  const totalBeforeWallet = subtotal + gstAmount + (isPlatformFree ? 0 : platformFee);
  const walletUsed = useWallet ? Math.min(walletBalance, totalBeforeWallet) : 0;
  const finalAmount = totalBeforeWallet - walletUsed;

  return {
    amount: baseAmount,
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
