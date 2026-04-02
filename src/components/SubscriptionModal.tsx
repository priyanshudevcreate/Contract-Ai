import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  FileText, 
  Brain, 
  Clock, 
  Crown,
  Building,
  Sparkles
} from 'lucide-react';
import PaymentModal from './PaymentModal';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
}

export default function SubscriptionModal({ isOpen, onClose, currentPlan = 'free' }: SubscriptionModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<{name: string, amount: number} | null>(null);

  if (!isOpen) return null;

  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: <FileText className="w-6 h-6" />,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for trying out ContractGPT',
      features: [
        '3 contract analyses per month',
        'Basic risk detection',
        'Plain-English explanations',
        'Standard templates (5)',
        'Email support',
        'Basic Q&A functionality'
      ],
      limitations: [
        'Limited to 3 contracts/month',
        'No priority support',
        'Basic risk analysis only'
      ],
      buttonText: 'Current Plan',
      buttonStyle: 'bg-gray-100 text-gray-600 cursor-not-allowed',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: <Zap className="w-6 h-6" />,
      price: { monthly: 2499, yearly: 24990 },
      description: 'Ideal for freelancers and small businesses',
      features: [
        '50 contract analyses per month',
        'Advanced risk detection with severity levels',
        'AI-powered contract drafting',
        'Premium templates library (50+)',
        'Interactive Q&A with context',
        'Priority email support',
        'Export to PDF/Word',
        'Contract comparison tool',
        'Basic analytics dashboard'
      ],
      limitations: [],
      buttonText: 'Upgrade to Professional',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      popular: true,
      savings: billingCycle === 'yearly' ? '17%' : null
    },
    {
      id: 'business',
      name: 'Business',
      icon: <Building className="w-6 h-6" />,
      price: { monthly: 6499, yearly: 64990 },
      description: 'Perfect for growing teams and companies',
      features: [
        '200 contract analyses per month',
        'Advanced AI risk assessment',
        'Custom contract templates',
        'Team collaboration tools',
        'Advanced Q&A with legal precedents',
        'Priority phone & email support',
        'Advanced analytics & reporting',
        'API access (1000 calls/month)',
        'Bulk contract processing',
        'Custom integrations',
        'Compliance tracking'
      ],
      limitations: [],
      buttonText: 'Upgrade to Business',
      buttonStyle: 'bg-indigo-600 text-white hover:bg-indigo-700',
      popular: false,
      savings: billingCycle === 'yearly' ? '17%' : null
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: <Crown className="w-6 h-6" />,
      price: { monthly: 16499, yearly: 164990 },
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited contract analyses',
        'Enterprise-grade AI with custom models',
        'White-label solution available',
        'Dedicated account manager',
        'Advanced legal AI with case law',
        '24/7 priority support',
        'Custom analytics & reporting',
        'Unlimited API access',
        'Advanced security & compliance',
        'SSO integration',
        'Custom workflows',
        'Legal expert consultation (2 hours/month)',
        'On-premise deployment option'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700',
      popular: false,
      savings: billingCycle === 'yearly' ? '17%' : null
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleUpgrade = (planId: string) => {
    if (planId === 'enterprise') {
      // Handle contact sales
      window.open('mailto:23eg107d54@anurag.edu.in?subject=Enterprise Plan Inquiry - ContractGPT', '_blank');
    } else {
      // Handle subscription upgrade - show payment modal
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        setPaymentPlan({
          name: plan.name,
          amount: plan.price[billingCycle]
        });
        setShowPaymentModal(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
            <p className="text-gray-600 mt-1">Unlock the full power of AI-driven contract analysis</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Billing Toggle */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg p-1 flex items-center shadow-sm border">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                  billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl border-2 transition-all duration-200 ${
                  plan.popular
                    ? 'border-blue-500 shadow-lg scale-105'
                    : selectedPlan === plan.id
                    ? 'border-blue-300 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                } ${plan.id === currentPlan ? 'bg-blue-50' : 'bg-white'}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Current Plan Badge */}
                {plan.id === currentPlan && (
                  <div className="absolute -top-3 right-4">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Current
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Plan Header */}
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${
                      plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.icon}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{plan.price[billingCycle].toLocaleString('en-IN')}
                      </span>
                      <span className="text-gray-600 ml-1">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.savings && (
                      <div className="flex items-center mt-1">
                        <Sparkles className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600 font-medium">
                          Save {plan.savings} annually
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-2 mb-6 pb-4 border-t border-gray-200 pt-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Limitations
                      </p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={plan.id === currentPlan}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                      plan.id === currentPlan
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : plan.buttonStyle
                    }`}
                  >
                    {plan.id === currentPlan ? 'Current Plan' : plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Feature Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Feature</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Free</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Professional</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Business</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 text-gray-700">Monthly Analyses</td>
                  <td className="py-3 px-4 text-center text-gray-600">3</td>
                  <td className="py-3 px-4 text-center text-gray-600">50</td>
                  <td className="py-3 px-4 text-center text-gray-600">200</td>
                  <td className="py-3 px-4 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">AI Risk Detection</td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Contract Drafting</td>
                  <td className="py-3 px-4 text-center">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">API Access</td>
                  <td className="py-3 px-4 text-center">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Priority Support</td>
                  <td className="py-3 px-4 text-center">
                    <X className="w-4 h-4 text-red-500 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-4 h-4 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 rounded-b-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Need help? <a href="mailto:23eg107d54@anurag.edu.in" className="text-blue-600 hover:text-blue-700">Contact support</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {paymentPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setPaymentPlan(null);
          }}
          planName={paymentPlan.name}
          amount={paymentPlan.amount}
          billingCycle={billingCycle}
        />
      )}
    </div>
  );
}