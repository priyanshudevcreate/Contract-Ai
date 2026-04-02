import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  TrendingUp, 
  FileText,
  Clock,
  DollarSign,
  Users,
  Scale
} from 'lucide-react';
import LegalBotModal from './LegalBotModal';

interface RiskAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: {
    id: number;
    name: string;
    date: string;
    status: string;
    riskLevel: string;
    riskScore: number;
    riskFactors: string[];
  } | null;
}

export default function RiskAnalysisModal({ isOpen, onClose, contract }: RiskAnalysisModalProps) {
  const [showLegalBot, setShowLegalBot] = useState(false);
  
  if (!isOpen || !contract) return null;

  const handleLegalReview = () => {
    console.log(`Opening integrated legal bot for contract: ${contract.name} (ID: ${contract.id})`);
    setShowLegalBot(true);
  };

  // Risk Scoring System:
  // Low Risk: 1-30 (Green)
  // Medium Risk: 31-60 (Yellow) 
  // High Risk: 61-100 (Red)

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-600 bg-green-50 border-green-200';
    if (score <= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getRiskLevelFromScore = (score: number) => {
    if (score <= 30) return 'low';
    if (score <= 60) return 'medium';
    return 'high';
  };

  const getRiskDescription = (score: number) => {
    if (score <= 30) return 'This contract has minimal risk factors and follows standard industry practices.';
    if (score <= 60) return 'This contract has moderate risk factors that should be reviewed carefully.';
    return 'This contract has significant risk factors that require immediate attention.';
  };

  const getRiskRecommendations = (score: number) => {
    if (score <= 30) return [
      'Review standard terms and conditions',
      'Ensure all parties understand their obligations',
      'Keep records of all communications'
    ];
    if (score <= 60) return [
      'Negotiate problematic clauses before signing',
      'Consider legal consultation for complex terms',
      'Request clarification on ambiguous language',
      'Add protective clauses where possible'
    ];
    return [
      'Seek immediate legal counsel before proceeding',
      'Negotiate major risk factors or consider walking away',
      'Add comprehensive liability limitations',
      'Include force majeure and termination clauses',
      'Consider insurance coverage for potential risks'
    ];
  };

  // Mock detailed risk breakdown
  const riskBreakdown = [
    {
      category: 'Financial Terms',
      score: contract.riskScore <= 30 ? 15 : contract.riskScore <= 60 ? 35 : 65,
      icon: <DollarSign className="w-5 h-5" />,
      issues: contract.riskScore <= 30 ? 
        ['Standard payment terms', 'Clear pricing structure'] :
        contract.riskScore <= 60 ?
        ['Late payment penalties unclear', 'Currency fluctuation risk'] :
        ['Unlimited liability exposure', 'Aggressive penalty terms', 'No payment protection']
    },
    {
      category: 'Legal Compliance',
      score: contract.riskScore <= 30 ? 10 : contract.riskScore <= 60 ? 25 : 45,
      icon: <Scale className="w-5 h-5" />,
      issues: contract.riskScore <= 30 ? 
        ['Compliant with local laws', 'Standard jurisdiction clause'] :
        contract.riskScore <= 60 ?
        ['Jurisdiction clause unclear', 'Some regulatory gaps'] :
        ['Non-compliant clauses detected', 'Conflicting legal requirements', 'Missing regulatory provisions']
    },
    {
      category: 'Operational Risk',
      score: contract.riskScore <= 30 ? 20 : contract.riskScore <= 60 ? 40 : 70,
      icon: <Users className="w-5 h-5" />,
      issues: contract.riskScore <= 30 ? 
        ['Clear deliverables defined', 'Reasonable timelines'] :
        contract.riskScore <= 60 ?
        ['Vague performance metrics', 'Tight deadlines'] :
        ['Unrealistic expectations', 'No force majeure protection', 'Unclear scope boundaries']
    },
    {
      category: 'Termination Terms',
      score: contract.riskScore <= 30 ? 5 : contract.riskScore <= 60 ? 30 : 55,
      icon: <Clock className="w-5 h-5" />,
      issues: contract.riskScore <= 30 ? 
        ['Fair notice period', 'Clear termination process'] :
        contract.riskScore <= 60 ?
        ['Short notice period', 'Limited termination rights'] :
        ['No termination rights', 'Severe exit penalties', 'Indefinite commitment']
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Risk Analysis Report</h2>
            <p className="text-gray-600 mt-1">{contract.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Overall Risk Score */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Overall Risk Assessment</h3>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">Analyzed on {new Date(contract.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className={`border-2 rounded-xl p-6 ${getRiskScoreColor(contract.riskScore)}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {contract.riskScore <= 30 ? (
                    <Shield className="w-8 h-8 text-green-600 mr-3" />
                  ) : contract.riskScore <= 60 ? (
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                  )}
                  <div>
                    <div className="text-3xl font-bold">
                      {contract.riskScore}/100
                    </div>
                    <div className="text-sm font-medium">
                      {contract.riskScore <= 30 ? 'Low Risk' : contract.riskScore <= 60 ? 'Medium Risk' : 'High Risk'}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="w-32 bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className={`h-4 rounded-full ${
                        contract.riskScore <= 30 ? 'bg-green-500' : 
                        contract.riskScore <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${contract.riskScore}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">Risk Level</div>
                </div>
              </div>
              
              <p className="text-sm">
                {getRiskDescription(contract.riskScore)}
              </p>
            </div>
          </div>

          {/* Risk Breakdown */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk Breakdown by Category</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {riskBreakdown.map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        {category.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{category.category}</h4>
                        <div className="text-sm text-gray-500">{category.score}/100</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      category.score <= 30 ? 'bg-green-100 text-green-800' :
                      category.score <= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {category.score <= 30 ? 'Low' : category.score <= 60 ? 'Medium' : 'High'}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full ${
                        category.score <= 30 ? 'bg-green-500' : 
                        category.score <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  
                  <ul className="space-y-1">
                    {category.issues.map((issue, issueIndex) => (
                      <li key={issueIndex} className="flex items-start text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full mt-2 mr-2 flex-shrink-0 ${
                          category.score <= 30 ? 'bg-green-500' : 
                          category.score <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Risk Factors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Risk Factors Identified</h3>
            <div className="space-y-3">
              {contract.riskFactors.map((factor, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 mr-3 ${
                    contract.riskScore <= 30 ? 'text-green-600' : 
                    contract.riskScore <= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                  <span className="text-sm text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Action Items</h4>
                  <ul className="space-y-2">
                    {getRiskRecommendations(contract.riskScore).map((recommendation, index) => (
                      <li key={index} className="flex items-start text-sm text-blue-800">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Export Report
            </button>
            <button 
              onClick={handleLegalReview}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Get Legal Review
            </button>
          </div>
        </div>
      </div>
      
      {/* Integrated Legal Bot Modal */}
      <LegalBotModal 
        isOpen={showLegalBot}
        onClose={() => setShowLegalBot(false)}
        contract={contract ? {
          id: contract.id,
          name: contract.name,
          riskLevel: contract.riskLevel,
          riskScore: contract.riskScore
        } : null}
      />
    </div>
  );
}
