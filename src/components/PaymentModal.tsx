import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Copy, Check, Shield, Clock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
}

export default function PaymentModal({ isOpen, onClose, planName, amount, billingCycle }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const upiId = 'pk9134wadsar@okhdfcbank';
  const payeeName = 'PRIYANSHU KUMAR';
  const supportEmail = '23eg107d54@anurag.edu.in';

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUPIPayment = () => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=Contract AI ${planName} Plan - ${billingCycle}`;
    window.location.href = upiUrl;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Complete Payment</h2>
            <p className="text-gray-600 text-xs mt-1">
              {planName} - {billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount */}
        <div className="p-4 bg-blue-50 border-b border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              ₹{amount.toLocaleString('en-IN')}
            </div>
            <div className="text-gray-600 text-xs">
              {billingCycle === 'monthly' ? 'per month' : 'per year'}
            </div>
            {billingCycle === 'yearly' && (
              <div className="text-green-600 text-xs font-medium mt-1">
                Save 17% yearly
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h3>
            
            <div className="space-y-2">
              {/* UPI Option */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                  paymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 text-blue-600 mr-2" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900">UPI Payment</div>
                    <div className="text-xs text-gray-500">Any UPI app</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full border ${
                    paymentMethod === 'upi'
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'upi' && (
                      <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Option */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 text-blue-600 mr-2" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900">Credit/Debit Card</div>
                    <div className="text-xs text-gray-500">Visa, Mastercard, RuPay</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full border ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'card' && (
                      <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UPI Payment Details */}
          {paymentMethod === 'upi' && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-xs font-medium text-gray-900 mb-2">Payment Details</h4>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 w-16">To:</span>
                  <span className="text-xs font-medium text-gray-900">{payeeName}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 w-16">UPI ID:</span>
                  <input
                    type="text"
                    value={upiId}
                    readOnly
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs bg-white"
                  />
                  <button
                    onClick={handleCopyUPI}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600 w-16">Amount:</span>
                  <span className="text-xs font-medium text-gray-900">₹{amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">Quick Pay:</p>
                  <p>1. Click "Pay with UPI" below</p>
                  <p>2. Or copy UPI ID for manual transfer</p>
                  <p>3. Contact support after payment</p>
                </div>
              </div>
            </div>
          )}

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-xs font-medium text-gray-900 mb-2">Card Details</h4>
              
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            {paymentMethod === 'upi' ? (
              <button
                onClick={handleUPIPayment}
                className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <Smartphone className="w-4 h-4 mr-1" />
                Pay with UPI
              </button>
            ) : (
              <button
                onClick={() => alert('Card payment integration would be implemented here')}
                className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4 mr-1" />
                Pay ₹{amount.toLocaleString('en-IN')}
              </button>
            )}
            
            {paymentMethod === 'upi' && (
              <a
                href={`mailto:${supportEmail}?subject=QR Code Request&body=Hi, I need the QR code for ₹${amount.toLocaleString('en-IN')} payment for ${planName} plan.`}
                className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              >
                Request QR Code
              </a>
            )}
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>

          {/* Footer */}
          <div className="mt-3 text-center">
            <div className="flex items-center justify-center space-x-3 text-xs text-gray-500 mb-1">
              <div className="flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                <span>Secure</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>Instant</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Help: <a href={`mailto:${supportEmail}`} className="text-blue-600">{supportEmail}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}