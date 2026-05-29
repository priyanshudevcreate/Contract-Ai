import React, { useState, useEffect } from 'react';
import {
  FileText,
  Settings,
  User,
  LogOut,
  Search,
  Filter,
  Plus,
  ChevronDown,
  Clock,
  FileCode,
  Trash,
  Eye,
  Crown,
  Zap,
  Scale,
  Camera,
  Loader
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { fileService } from '../services/fileService';
import SubscriptionModal from '../components/SubscriptionModal';
import RiskAnalysisModal from '../components/RiskAnalysisModal';
import TemplateGeneratorModal from '../components/TemplateGeneratorModal';

interface DashboardProps {
  onSignOut: () => void;
  onUploadClick: () => void;
}

export default function Dashboard({ onSignOut, onUploadClick }: DashboardProps) {
  const { user, token } = useAuth();
  const [activeSidebarItem, setActiveSidebarItem] = useState('contracts');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showRiskAnalysisModal, setShowRiskAnalysisModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [currentPlan] = useState('free');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplateGenerator, setShowTemplateGenerator] = useState(false);

  // Get user data
  const userAvatar = user ? user.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2) : 'U';
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';

  // Get user's real contracts from fileService
  const [userContracts, setUserContracts] = useState<any[]>([]);
  
  useEffect(() => {
    const loadUserContracts = () => {
      // Get analyzed contracts from fileService
      const analyzedFiles = fileService.getAnalyzedContracts();
      
      // Convert to dashboard format
      const contracts = analyzedFiles.map(file => {
        const analysisData = file.analysisData || {};
        
        return {
          id: file.id,
          original_filename: file.originalName,
          upload_date: file.uploadDate,
          last_viewed: file.uploadDate,
          risk_category: analysisData.Risk_Category || 'Unknown Risk',
          overall_risk_assessment: analysisData.Overall_Risk_Assessment || 0,
          key_risk_factors: analysisData.Key_Risk_Factors_Identified || ['Analysis pending'],
          status: file.status,
          financial_terms: analysisData.Financial_Terms || 0,
          legal_compliance: analysisData.Legal_Compliance || 0,
          operational_risk: analysisData.Operational_Risk || 0,
          termination_terms: analysisData.Termination_Terms || 0,
          recommendations: analysisData.Recommendations || [],
          analysis_timestamp: file.uploadDate
        };
      });
      
      // Add demo contracts if no real contracts exist
      if (contracts.length === 0) {
        const demoContracts = [
          {
            id: 'demo1',
            original_filename: 'Service_Agreement_Demo.pdf',
            upload_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            last_viewed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            risk_category: 'Medium Risk',
            overall_risk_assessment: 42,
            key_risk_factors: ['Unclear termination clauses', 'Limited liability provisions'],
            status: 'analyzed',
            financial_terms: 35,
            legal_compliance: 85,
            operational_risk: 25,
            termination_terms: 60,
            recommendations: ['Review termination notice requirements'],
            analysis_timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'demo2',
            original_filename: 'Employment_Contract_Demo.pdf',
            upload_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            last_viewed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            risk_category: 'Low Risk',
            overall_risk_assessment: 18,
            key_risk_factors: ['Standard clauses', 'Well-defined terms'],
            status: 'analyzed',
            financial_terms: 95,
            legal_compliance: 92,
            operational_risk: 10,
            termination_terms: 88,
            recommendations: ['Consider additional benefits clause'],
            analysis_timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        setUserContracts(demoContracts);
      } else {
        setUserContracts(contracts);
      }
    };
    
    loadUserContracts();
    
    // Refresh every 5 seconds to catch new uploads
    const interval = setInterval(loadUserContracts, 5000);
    return () => clearInterval(interval);
  }, [user]);

  // Profile management states
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [editableUserName, setEditableUserName] = useState(userName);
  const [editableUserEmail, setEditableUserEmail] = useState(userEmail);
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle ESC key for PDF preview modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showPdfPreview) {
        setShowPdfPreview(false);
        setSelectedTemplate(null);
      }
    };

    if (showPdfPreview) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showPdfPreview]);

  // Convert user contracts to dashboard format
  const contracts = userContracts.map((contract: any) => ({
    id: contract.id,
    name: contract.original_filename,
    date: new Date(contract.upload_date).toISOString().split('T')[0],
    lastViewed: contract.last_viewed,
    riskLevel: contract.risk_category ? contract.risk_category.toLowerCase().replace(' risk', '') : 'unknown',
    riskScore: contract.overall_risk_assessment || 0,
    riskFactors: contract.key_risk_factors || ['Analysis pending'],
    status: contract.status,
    isRealData: true,
    financialTerms: contract.financial_terms,
    legalCompliance: contract.legal_compliance,
    operationalRisk: contract.operational_risk,
    terminationTerms: contract.termination_terms,
    recommendations: contract.recommendations,
    analysisTimestamp: contract.analysis_timestamp
  }));

  // Mock data for templates
  const templates = [
    {
      id: 1,
      name: 'Non-Disclosure Agreement',
      category: 'Legal',
      lastUsed: '2023-10-05',
      pdfPath: '/Non-Disclosure Agreement .pdf'
    },
    {
      id: 2,
      name: 'Freelance Contract',
      category: 'Business',
      lastUsed: '2023-09-18',
      pdfPath: '/Freelance Contract.pdf'
    },
    {
      id: 3,
      name: 'Employment Agreement',
      category: 'HR',
      lastUsed: '2023-08-30',
      pdfPath: '/Employment Agreement.pdf'
    },
    {
      id: 4,
      name: 'Service Level Agreement',
      category: 'IT',
      lastUsed: '2023-07-22',
      pdfPath: '/Service Level Agreement.pdf'
    }
  ];

  // Mock data for user-generated contracts
  const userGeneratedContracts = [
    {
      id: 1,
      name: 'AI-Generated NDA - Tech Startup',
      type: 'Non-Disclosure Agreement',
      createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'Draft',
      generatedBy: 'Contract AI AI'
    },
    {
      id: 2,
      name: 'Custom Freelance Agreement - Web Dev',
      type: 'Freelance Contract',
      createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Completed',
      generatedBy: 'Contract AI AI'
    }
  ];

  // Helper functions
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-600 bg-green-50';
    if (score <= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskLevelFromScore = (score: number) => {
    if (score <= 30) return 'low';
    if (score <= 60) return 'medium';
    return 'high';
  };

  const formatLastViewed = (dateString: string) => {
    const date = new Date(dateString);
    const now = currentTime;
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min${diffInMinutes === 1 ? '' : 's'} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;

    const weeks = Math.floor(diffInDays / 7);
    if (diffInDays < 30) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;

    const months = Math.floor(diffInDays / 30);
    if (diffInDays < 365) return `${months} month${months === 1 ? '' : 's'} ago`;

    const years = Math.floor(diffInDays / 365);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  };

  const formatUploadDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in review': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter data based on search query
  const filteredContracts = contracts.filter(contract =>
    contract.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUserContracts = userGeneratedContracts.filter(contract =>
    contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Event handlers
  const handleViewContract = (contract: any) => {
    const updatedContract = { ...contract, lastViewed: new Date().toISOString() };
    setSelectedContract(updatedContract);
    setShowRiskAnalysisModal(true);
  };

  const handleLegalReview = (contract: any) => {
    setSelectedContract(contract);
    alert(`Legal Review Request for: ${contract.name}\n\nRisk Score: ${contract.riskScore}/100\nRisk Level: ${getRiskLevelFromScore(contract.riskScore).toUpperCase()}\n\nThis feature will connect you with qualified legal professionals for expert contract review and consultation.`);
  };

  const handleTemplatePreview = (template: any) => {
    setSelectedTemplate(template);
    setShowPdfPreview(true);
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async () => {
    setIsUpdatingProfile(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert('Failed to update password. Please try again.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md z-10">
        <div className="p-4 border-b">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Contract AI</span>
          </div>
        </div>

        <nav className="mt-6">
          {[
            { id: 'contracts', icon: FileText, label: 'Contracts' },
            { id: 'templates', icon: FileCode, label: 'Templates' },
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'billing', icon: Crown, label: 'Billing & Plans' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(item => (
            <div
              key={item.id}
              className={`flex items-center px-6 py-3 cursor-pointer ${activeSidebarItem === item.id
                  ? 'bg-blue-50 border-r-4 border-blue-500'
                  : 'hover:bg-gray-50'
                }`}
              onClick={() => setActiveSidebarItem(item.id)}
            >
              <item.icon className={`w-5 h-5 ${activeSidebarItem === item.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
              <span className={`ml-3 ${activeSidebarItem === item.id
                  ? 'font-medium text-blue-600'
                  : 'text-gray-700'
                }`}>
                {item.label}
              </span>
              {item.id === 'billing' && currentPlan === 'free' && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 border-t p-4">
          <button
            onClick={onSignOut}
            className="flex items-center text-gray-700 hover:text-red-600 w-full transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {activeSidebarItem === 'contracts' && 'Contracts'}
                {activeSidebarItem === 'templates' && 'Templates'}
                {activeSidebarItem === 'profile' && 'Profile'}
                {activeSidebarItem === 'billing' && 'Billing & Plans'}
                {activeSidebarItem === 'settings' && 'Settings'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-4 transition-colors duration-200">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {userAvatar}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userName}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Contracts Tab */}
          {activeSidebarItem === 'contracts' && (
            <div className="space-y-6">
              {/* Search and Filter Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search contracts..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </button>
                    <button
                      onClick={onUploadClick}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Contract
                    </button>
                  </div>
                </div>
              </div>

              {/* Contracts Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Viewed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredContracts.map((contract) => (
                        <tr key={contract.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-gray-400 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{contract.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${formatUploadDate(contract.date) === 'Today' ? 'text-green-600 font-medium' : formatUploadDate(contract.date) === 'Yesterday' ? 'text-blue-600' : 'text-gray-500'}`}>
                              {formatUploadDate(contract.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Clock className={`w-4 h-4 mr-2 ${formatLastViewed(contract.lastViewed).includes('min') || formatLastViewed(contract.lastViewed) === 'Just now' ? 'text-green-500' : 'text-gray-400'}`} />
                              <span className={`text-sm ${formatLastViewed(contract.lastViewed).includes('min') || formatLastViewed(contract.lastViewed) === 'Just now' ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
                                {formatLastViewed(contract.lastViewed)}
                              </span>
                              {(formatLastViewed(contract.lastViewed).includes('min') || formatLastViewed(contract.lastViewed) === 'Just now') && (
                                <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(contract.riskLevel)}`}>
                              {contract.riskLevel.charAt(0).toUpperCase() + contract.riskLevel.slice(1)} Risk
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskScoreColor(contract.riskScore)}`}>
                              {contract.riskScore}/100
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewContract(contract)}
                                className="text-blue-600 hover:text-blue-900"
                                title="View Risk Analysis"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                className="text-purple-600 hover:text-purple-900"
                                title="Get Legal Review"
                                onClick={() => handleLegalReview(contract)}
                              >
                                <Scale className="w-5 h-5" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeSidebarItem === 'templates' && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileCode className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleTemplatePreview(template)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{template.category}</p>

                    <button 
                      type="button"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowTemplateGenerator(true);
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Use Template
                    </button>
                  </div>
                ))}
              </div>

              {/* Generated by You Section */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Generated by You</h3>
                    <p className="text-sm text-gray-600 mt-1">AI-generated contracts created using Contract AI</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {filteredUserContracts.length} contract{filteredUserContracts.length !== 1 ? 's' : ''}
                    {searchQuery && ` (filtered from ${userGeneratedContracts.length})`}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {filteredUserContracts.map((contract) => (
                      <div key={contract.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative">
                              <Zap className="w-5 h-5 text-white" />
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" title="AI Generated"></div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{contract.name}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-500">{contract.type}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">Created {formatLastViewed(contract.createdDate)}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">Modified {formatLastViewed(contract.lastModified)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                              {contract.status}
                            </span>
                            <div className="flex items-center space-x-1">
                              <button className="text-blue-600 hover:text-blue-800 p-1 rounded" title="View Contract">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-800 p-1 rounded" title="Download">
                                <FileText className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 p-1 rounded" title="Delete">
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {filteredUserContracts.length === 0 && !searchQuery && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No generated contracts yet</h4>
                    <p className="text-gray-600 mb-4">Start creating contracts using our AI-powered templates</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Generate Your First Contract
                    </button>
                  </div>
                )}

                {filteredUserContracts.length === 0 && searchQuery && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h4>
                    <p className="text-gray-600">Try a different search term or create a new contract</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeSidebarItem === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

                {/* Profile Picture Section */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="relative">
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-200">
                        {userAvatar}
                      </div>
                    )}
                    <label
                      htmlFor="profile-picture-upload"
                      className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors duration-200 shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </label>
                    <input
                      id="profile-picture-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{editableUserName}</h3>
                    <p className="text-gray-600">{editableUserEmail}</p>
                    <p className="text-sm text-gray-500 mt-1">Click the camera icon to upload a new profile picture</p>
                  </div>
                </div>

                {/* Personal Information Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editableUserName}
                      onChange={(e) => setEditableUserName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={editableUserEmail}
                      onChange={(e) => setEditableUserEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Your job title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleProfileUpdate}
                    disabled={isUpdatingProfile}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isUpdatingProfile && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                    {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </div>

              {/* Password Change Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handlePasswordUpdate}
                    disabled={isUpdatingPassword || !currentPassword || !newPassword || !confirmPassword}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isUpdatingPassword && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                    {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeSidebarItem === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Plan</h2>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Free Plan</h3>
                    <p className="text-sm text-gray-600">3 contract analyses per month</p>
                  </div>
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeSidebarItem === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        currentPlan={currentPlan}
      />

      {/* Risk Analysis Modal */}
      <RiskAnalysisModal
        isOpen={showRiskAnalysisModal}
        onClose={() => {
          setShowRiskAnalysisModal(false);
          setSelectedContract(null);
        }}
        contract={selectedContract}
      />

      {/* Template Generator Modal */}
      <TemplateGeneratorModal
        isOpen={showTemplateGenerator}
        onClose={() => {
          setShowTemplateGenerator(false);
          setSelectedTemplate(null);
        }}
        template={selectedTemplate}
      />

      {/* PDF Preview Modal */}
      {showPdfPreview && selectedTemplate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowPdfPreview(false);
            setSelectedTemplate(null);
          }}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{selectedTemplate.name}</h3>
                <p className="text-blue-100 mt-1">{selectedTemplate.category} Template Preview</p>
              </div>
              <button
                onClick={() => {
                  setShowPdfPreview(false);
                  setSelectedTemplate(null);
                }}
                className="bg-black bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="relative bg-gray-100 flex-1" style={{ height: 'calc(95vh - 200px)' }}>
              {/* Loading indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading PDF preview...</p>
                </div>
              </div>
              <iframe
                src={selectedTemplate.pdfPath}
                className="w-full h-full border-0 relative z-10"
                title={`${selectedTemplate.name} Preview`}
                onLoad={() => {
                  // Hide loading indicator when PDF loads
                  const loadingDiv = document.querySelector('.absolute.inset-0.flex.items-center.justify-center.bg-gray-100');
                  if (loadingDiv) {
                    (loadingDiv as HTMLElement).style.display = 'none';
                  }
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-gray-600">
                <p>This is a preview of the <strong>{selectedTemplate.name}</strong> template.</p>
                <p>Click "Use Template" to customize it for your needs.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPdfPreview(false);
                    setSelectedTemplate(null);
                  }}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Handle "Use Template" action
                    setShowPdfPreview(false);
                    setShowTemplateGenerator(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}