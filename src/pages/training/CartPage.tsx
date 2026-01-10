import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  Lock,
  Tag,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useTrainingStore } from '../../store/trainingStore';
import { courses, courseBundles } from '../../data/cnlopbData';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, removeFromCart, clearCart, checkout, isAuthenticated } =
    useTrainingStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleApplyPromo = () => {
    // Check for valid promo codes
    const validCodes: Record<string, number> = {
      EARLY2024: 20,
      SAFETY10: 10,
      OFFSHORE25: 25,
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setPromoDiscount(validCodes[promoCode.toUpperCase()]);
      setPromoApplied(true);
      setError('');
    } else {
      setError('Invalid promo code');
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/training/login?redirect=/training/cart');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const success = await checkout();

      if (success) {
        navigate('/training/checkout/success');
      } else {
        setError('Checkout failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during checkout.');
    } finally {
      setProcessing(false);
    }
  };

  const discountAmount = (cartTotal * promoDiscount) / 100;
  const finalTotal = cartTotal - discountAmount;

  const getItemDetails = (item: typeof cart[0]) => {
    if (item.type === 'course') {
      return courses.find((c) => c.id === item.id);
    } else if (item.type === 'bundle') {
      return courseBundles.find((b) => b.id === item.id);
    }
    return null;
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h1>
        <p className="text-slate-400 mb-8">
          Explore our courses and start your offshore training journey today.
        </p>
        <Link
          to="/training/courses"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center"
        >
          Browse Courses
          <ChevronRight className="w-5 h-5 ml-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const details = getItemDetails(item);
            const course = item.type === 'course' ? (details as typeof courses[0]) : null;
            const bundle = item.type === 'bundle' ? (details as typeof courseBundles[0]) : null;

            return (
              <div
                key={item.id}
                className="bg-slate-800 rounded-xl border border-slate-700 p-4 flex items-start space-x-4"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-3xl flex-shrink-0">
                  {item.type === 'bundle' ? '📦' : course?.category === 'safety-regulations' ? '🛡️' : course?.category === 'environmental-compliance' ? '🌊' : course?.category === 'drilling-operations' ? '🛢️' : '📚'}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-blue-400 uppercase font-medium">
                        {item.type === 'bundle' ? 'Course Bundle' : 'Course'}
                      </span>
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      {course && (
                        <p className="text-slate-400 text-sm mt-1">
                          {Math.round(course.totalDuration / 60)} hours • {course.totalLessons} lessons
                        </p>
                      )}
                      {bundle && (
                        <p className="text-slate-400 text-sm mt-1">
                          {bundle.courses.length} courses included
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <span className="text-xl font-bold text-white">
                    ${item.price}
                  </span>
                  <span className="text-slate-400 text-sm block">CAD</span>
                </div>
              </div>
            );
          })}

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Order Summary
            </h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-slate-400 text-sm mb-2">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="w-full pl-9 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    disabled={promoApplied}
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  disabled={!promoCode || promoApplied}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm hover:bg-slate-600 transition-colors disabled:opacity-50"
                >
                  {promoApplied ? <Check className="w-4 h-4" /> : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <p className="text-green-400 text-sm mt-2">
                  {promoDiscount}% discount applied!
                </p>
              )}
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t border-slate-700 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({promoDiscount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-semibold text-lg pt-3 border-t border-slate-700">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)} CAD</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {processing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </>
              )}
            </button>

            {/* Security Note */}
            <div className="flex items-center justify-center mt-4 text-slate-500 text-sm">
              <Lock className="w-4 h-4 mr-1" />
              Secure checkout
            </div>

            {/* Benefits */}
            <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
              <div className="flex items-center text-slate-300 text-sm">
                <Check className="w-4 h-4 text-green-400 mr-2" />
                Lifetime access to courses
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <Check className="w-4 h-4 text-green-400 mr-2" />
                Certificate upon completion
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <Check className="w-4 h-4 text-green-400 mr-2" />
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
