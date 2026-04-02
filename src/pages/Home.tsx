import {
  Upload,
  FileText,
  Shield,
  Brain,
  Globe,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Play,
  Clock,
  DollarSign,
  Eye,
  MessageSquare,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

interface HomePageProps {
  isAuthenticated: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onUploadClick: () => void;
  onSignUp: () => void;
}

export default function Home({ isAuthenticated, onSignIn, onSignOut, onUploadClick, onSignUp }: HomePageProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showVideoModal) {
        setShowVideoModal(false);
      }
    };

    if (showVideoModal) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showVideoModal]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Store selected plan in localStorage for the sign-up process
    localStorage.setItem('selectedPlan', planId);
    // Redirect to sign-up page
    onSignIn();
  };

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Smart Upload",
      description: "Upload contracts in PDF or DOCX format with instant processing",
      color: "text-blue-600"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Plain-English Explanations",
      description: "Complex legal jargon translated into clear, understandable language",
      color: "text-green-600"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Risk Detection",
      description: "Color-coded risk flagging to highlight potential issues instantly",
      color: "text-amber-600"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Auto-Drafting",
      description: "Generate NDAs and freelancer agreements with AI assistance",
      color: "text-purple-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Interactive Q&A",
      description: "Ask questions about any clause and get instant, detailed answers",
      color: "text-indigo-600"
    }
  ];

  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Contract",
      description: "Simply drag and drop your contract document"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Analysis",
      description: "Our AI extracts and analyzes every clause"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Assessment",
      description: "GPT explains terms and flags potential risks"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Plain-English Results",
      description: "Get clear insights you can actually understand"
    }
  ];

  const impacts = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Save Time",
      description: "Reduce contract review time by 80%",
      benefit: "Hours → Minutes"
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Save Money",
      description: "Reduce legal consultation costs",
      benefit: "₹1000 → ₹0"
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Gain Clarity",
      description: "Understand exactly what you're signing",
      benefit: "100% Transparency"
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        onUploadClick={onUploadClick}
        onSignUp={onSignUp}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-background.jpg')",
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Subtle floating elements to complement the background */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-indigo-300 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center justify-center">
          <div className="text-center">

            <h1 className="font-display text-4xl sm:text-5xl lg:text-8xl font-bold mb-6 leading-none transform hover:scale-105 transition-all duration-500 cursor-default tracking-tighter">
              <span className="block hover:text-blue-100 transition-colors duration-300 font-bold text-white drop-shadow-2xl">ContractGPT</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent hover:from-purple-300 hover:via-pink-300 hover:to-cyan-300 transition-all duration-700 font-medium text-5xl sm:text-6xl lg:text-7xl mt-2">
                Smart AI for Contracts
              </span>
            </h1>

            <p className="font-heading text-xl lg:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed hover:text-white hover:scale-105 transition-all duration-300 cursor-default font-light tracking-wide drop-shadow-lg">
              <span className="font-medium text-cyan-200 drop-shadow-lg">Understand Every Clause.</span> <span className="font-light drop-shadow-lg">Sign with Confidence.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onUploadClick}
                className="group bg-gradient-to-r from-white to-gray-50 text-blue-900 px-10 py-5 rounded-2xl font-heading font-bold text-lg hover:from-cyan-50 hover:to-blue-50 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-xl flex items-center relative overflow-hidden tracking-wide border border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <Upload className="w-5 h-5 mr-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10" />
                <span className="relative z-10">{isAuthenticated ? 'Upload a Contract' : 'Sign In to Upload'}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300 relative z-10" />
              </button>

              <button
                onClick={() => setShowVideoModal(true)}
                className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-heading font-bold text-lg hover:bg-white hover:text-blue-900 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 flex items-center relative overflow-hidden tracking-wide"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Play className="w-5 h-5 mr-2 group-hover:scale-125 group-hover:text-blue-600 transition-all duration-300 relative z-10" />
                <span className="relative z-10">Try Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Meet ContractGPT – Your AI Legal Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform complex legal documents into clear, actionable insights in seconds
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${activeFeature === index
                    ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50'
                    }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${activeFeature === index ? 'bg-gradient-to-br from-blue-100 to-indigo-100' : 'bg-gray-100'
                      }`}>
                      <div className={feature.color}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-gradient-to-br from-blue-50 to-indigo-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Feature Preview
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{features[activeFeature].title}</h3>

                {/* Smart Upload Preview */}
                {activeFeature === 0 && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-inner border-2 border-dashed border-blue-300">
                      <div className="text-center py-8">
                        <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Drag & Drop Your Contract</p>
                        <p className="text-sm text-gray-500">PDF, DOCX supported • Max 10MB</p>
                        <div className="mt-4 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full text-xs inline-block">
                          Processing in 3 seconds...
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Plain-English Explanations Preview */}
                {activeFeature === 1 && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-inner">
                      <p className="text-gray-600 mb-2">Original Contract Text:</p>
                      <p className="text-gray-900 font-mono text-sm bg-gray-50 p-3 rounded border border-gray-200">
                        The party of the first part (hereinafter "Lessor") hereby agrees to transfer temporary usage rights...
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 shadow-inner">
                      <p className="text-gray-600 mb-2">ContractGPT Explanation:</p>
                      <p className="text-gray-900">
                        <strong>In simple terms:</strong> The owner is letting you use their property temporarily. You'll pay the agreed amount and follow the rules.
                      </p>
                    </div>
                  </div>
                )}

                {/* Risk Detection Preview */}
                {activeFeature === 2 && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-inner">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-gray-600">Risk Analysis Results:</p>
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl font-bold text-red-600">78/100</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-red-50 border-l-4 border-red-400 rounded">
                          <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-red-800">High Risk (Score: 78)</p>
                            <p className="text-xs text-red-600">Unlimited liability clause detected</p>
                          </div>
                          <div className="text-xs text-red-600 font-bold">-25 pts</div>
                        </div>
                        <div className="flex items-center p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-yellow-800">Medium Risk</p>
                            <p className="text-xs text-yellow-600">Vague termination conditions</p>
                          </div>
                          <div className="text-xs text-yellow-600 font-bold">-15 pts</div>
                        </div>
                        <div className="flex items-center p-3 bg-green-50 border-l-4 border-green-400 rounded">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-800">Low Risk</p>
                            <p className="text-xs text-green-600">Standard payment terms</p>
                          </div>
                          <div className="text-xs text-green-600 font-bold">+5 pts</div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-gray-100 rounded text-center">
                        <p className="text-xs text-gray-600">
                          <strong>Overall Assessment:</strong> High-risk contract requiring legal review
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Auto-Drafting Preview */}
                {activeFeature === 3 && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-inner">
                      <p className="text-gray-600 mb-2">AI Contract Generator:</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm font-medium">Contract Type:</span>
                          <span className="text-sm text-blue-600">Non-Disclosure Agreement</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm font-medium">Parties:</span>
                          <span className="text-sm text-blue-600">Company & Freelancer</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="text-sm font-medium">Duration:</span>
                          <span className="text-sm text-blue-600">2 Years</span>
                        </div>
                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded text-sm font-medium">
                          Generate Contract
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Q&A Preview */}
                {activeFeature === 4 && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-inner">
                      <p className="text-gray-600 mb-2">Ask ContractGPT:</p>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>You:</strong> "What happens if I terminate this contract early?"
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-800">
                            <strong>ContractGPT:</strong> "According to Section 8.2, early termination requires 30 days written notice and you'll forfeit your security deposit but won't face additional penalties."
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Ask another question..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded text-sm">
                            Ask
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From complex contract to clear understanding in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mx-auto shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent -z-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your contract analysis needs. All plans include our core AI features.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div
              className={`bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 ${selectedPlan === 'free'
                ? 'border-green-500 shadow-lg transform scale-105'
                : 'border-gray-200 hover:border-green-300'
                }`}
              onClick={() => setSelectedPlan('free')}
            >
              <div className="text-center">
                <h3 className="font-heading text-2xl font-black text-gray-900 mb-2 tracking-wide">Free</h3>
                <div className="font-display text-4xl font-black text-gray-900 mb-1">₹0</div>
                <div className="text-gray-600 mb-6">Forever</div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">3 contract analyses/month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Basic risk detection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Plain-English explanations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Email support</span>
                  </li>
                </ul>
                <button
                  className="w-full bg-gray-100 text-gray-600 py-3 px-6 rounded-lg font-heading font-bold cursor-default tracking-wide"
                  disabled
                >
                  Current Plan
                </button>
              </div>
            </div>

            {/* Professional Plan */}
            <div
              className={`bg-white border-2 rounded-2xl p-8 relative cursor-pointer transition-all duration-300 ${selectedPlan === 'professional'
                ? 'border-blue-500 shadow-xl transform scale-105'
                : 'border-blue-500 hover:shadow-lg transform scale-105'
                }`}
              onClick={() => setSelectedPlan('professional')}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-heading text-2xl font-black text-gray-900 mb-2 tracking-wide">Professional</h3>
                <div className="font-display text-4xl font-black text-gray-900 mb-1">₹2,499</div>
                <div className="text-gray-600 mb-6">per month</div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">50 contract analyses/month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Advanced risk detection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">AI contract drafting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Export to PDF/Word</span>
                  </li>
                </ul>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect('professional');
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Select Plan
                </button>
              </div>
            </div>

            {/* Business Plan */}
            <div
              className={`bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 ${selectedPlan === 'business'
                ? 'border-indigo-500 shadow-lg transform scale-105'
                : 'border-gray-200 hover:border-indigo-300'
                }`}
              onClick={() => setSelectedPlan('business')}
            >
              <div className="text-center">
                <h3 className="font-heading text-2xl font-black text-gray-900 mb-2 tracking-wide">Business</h3>
                <div className="font-display text-4xl font-black text-gray-900 mb-1">₹6,499</div>
                <div className="text-gray-600 mb-6">per month</div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">200 contract analyses/month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Custom integrations</span>
                  </li>
                </ul>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect('business');
                  }}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                >
                  Select Plan
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div
              className={`bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 ${selectedPlan === 'enterprise'
                ? 'border-purple-500 shadow-lg transform scale-105'
                : 'border-gray-200 hover:border-purple-300'
                }`}
              onClick={() => setSelectedPlan('enterprise')}
            >
              <div className="text-center">
                <h3 className="font-heading text-2xl font-black text-gray-900 mb-2 tracking-wide">Enterprise</h3>
                <div className="font-display text-4xl font-black text-gray-900 mb-1">₹16,499</div>
                <div className="text-gray-600 mb-6">per month</div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Unlimited analyses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Custom AI models</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">White-label solution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">24/7 priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                </ul>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect('enterprise');
                  }}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                >
                  Select Plan
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Features */}
          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 mr-3" />
                <span className="text-gray-700">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600 mr-3" />
                <span className="text-gray-700">All plans include core AI features</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Globe className="w-16 h-16 mx-auto mb-6 text-blue-300" />
            <h2 className="font-display text-4xl lg:text-5xl font-black mb-6 tracking-tight">
              Transforming How People Interact with Contracts
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Making legal clarity accessible to everyone, everywhere
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-blue-300 mb-6 flex justify-center">
                  {impact.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{impact.title}</h3>
                <p className="text-blue-100 mb-4 text-lg">{impact.description}</p>
                <div className="bg-green-500 text-green-50 px-4 py-2 rounded-lg text-sm font-medium">
                  {impact.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-heading text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Everything you need to know about ContractGPT and our AI-powered contract analysis
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  How accurate is ContractGPT's risk analysis?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  ContractGPT uses advanced AI models trained on thousands of legal documents to provide highly accurate risk assessments. Our 1-100 scoring system identifies potential issues with 95%+ accuracy, helping you make informed decisions about your contracts.
                </p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  What file formats does ContractGPT support?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  We support PDF and DOCX (Microsoft Word) files up to 10MB in size. Our AI can extract and analyze text from both formats, including scanned documents with OCR technology.
                </p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  How does the subscription billing work?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  All paid plans are billed monthly or yearly in Indian Rupees (₹). You can upgrade, downgrade, or cancel anytime. We offer a 30-day money-back guarantee on all paid plans. Payment is processed securely through UPI or card payments.
                </p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  Is my contract data secure and private?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  Absolutely. We use enterprise-grade security with end-to-end encryption. Your contracts are stored securely in MongoDB Atlas with bank-level security. We never share your data with third parties and you can delete your contracts anytime.
                </p>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  Can ContractGPT replace a lawyer?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  ContractGPT is designed to assist and educate, not replace legal professionals. While our AI provides valuable insights and risk analysis, we always recommend consulting with a qualified lawyer for complex legal matters or high-stakes contracts.
                </p>
              </div>
            </div>

            {/* FAQ Item 6 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  What types of contracts can ContractGPT analyze?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  We can analyze virtually any type of contract including employment agreements, NDAs, service contracts, freelance agreements, rental agreements, software licenses, and more. Our AI is trained on diverse legal documents across multiple industries.
                </p>
              </div>
            </div>

            {/* FAQ Item 7 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  How long does contract analysis take?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  Most contracts are analyzed within 30-60 seconds. Complex documents may take up to 2-3 minutes. You'll receive real-time updates on the analysis progress and can view results immediately once processing is complete.
                </p>
              </div>
            </div>

            {/* FAQ Item 8 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  Do you offer refunds if I'm not satisfied?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not completely satisfied with ContractGPT, contact our support team at 23eg107d54@anurag.edu.in for a full refund within 30 days of purchase.
                </p>
              </div>
            </div>

            {/* FAQ Item 9 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  Can I upgrade or downgrade my plan anytime?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  Yes, you can change your subscription plan anytime from your dashboard. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle. Your usage limits will adjust accordingly.
                </p>
              </div>
            </div>

            {/* FAQ Item 10 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  What makes ContractGPT different from other legal AI tools?
                </h3>
                <p className="font-body text-gray-600 leading-relaxed">
                  ContractGPT focuses specifically on contract analysis with our unique 1-100 risk scoring system. We provide plain-English explanations, interactive Q&A, and detailed category breakdowns. Plus, we're built by Team Ghost Ops with deep expertise in both AI and legal technology.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200 shadow-lg">
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="font-body text-gray-600 mb-6">
                Our support team is here to help you get the most out of ContractGPT
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=23eg107d54@anurag.edu.in&su=ContractGPT%20Support%20Inquiry" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-heading font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ContractGPT</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making legal documents understandable for everyone.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=23eg107d54@anurag.edu.in&su=ContractGPT%20Contact%20Inquiry" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ContractGPT. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">ContractGPT Demo</h3>
              <p className="text-blue-100">See how ContractGPT analyzes contracts in real-time</p>
            </div>

            {/* Video Container */}
            <div className="relative bg-black">
              <video
                className="w-full h-auto max-h-[60vh]"
                controls
                autoPlay
                preload="metadata"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Footer */}
            <div className="p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ready to try ContractGPT?</h4>
                  <p className="text-gray-600 text-sm">Upload your first contract and see the magic happen</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowVideoModal(false);
                      onUploadClick();
                    }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    {isAuthenticated ? 'Upload Contract' : 'Get Started'}
                  </button>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
