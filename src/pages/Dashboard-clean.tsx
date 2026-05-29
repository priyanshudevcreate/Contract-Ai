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
  CheckCircle, 
  Clock, 
  MoreHorizontal, 
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
import SubscriptionModal from '../components/SubscriptionModal';
import RiskAnalysisModal from '../components/RiskAnalysisModal';

interface DashboardProps {
  onSignOut: () => void;
  onUploadClick: () => void;
}

export default function Dashboard({ onSignOut, onUploadClick }: DashboardProps) {
  const { user } = useAuth();
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

  // Get user data
  const userAvatar = user ? user.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2) : 'U';
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@example.com';
  
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

  // Mock data with real-time timestamps
  const now = new Date();
  const contracts = [
    {
      id: 1,
      name: 'Freelance Agreement - Design Project',
      date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastViewed: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      riskLevel: 'low',
      riskScore: 25,
      riskFactors: ['Standard payment terms', 'Clear deliverables', 'Minor liability concerns']
    },
    {
      id: 2,
      name: 'Non-Disclosure Agreement - XYZ Corp',
      date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastViewed: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      riskLevel: 'medium',
      riskScore: 58,
      riskFactors: ['Broad confidentiality scope', 'Indefinite duration', 'Vague termination clause']
    },
    {
      id: 3,
      name: 'Service Agreement - Web Development',
      date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastViewed: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      riskLevel: 'high',
      riskScore: 78,
      riskFactors: ['Unlimited liability', 'No force majeure clause', 'Aggressive penalty terms']
    },
    {
      id: 4,
      name: 'Employment Contract - Junior Developer',
      date: new Date().toISOString().split('T')[0],
      lastViewed: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
      riskLevel: 'low',
      riskScore: 28,
      riskFactors: ['Standard employment terms', 'Fair compensation', 'Reasonable notice period']
    },
    {
      id: 5,
      name: 'Software License Agreement',
      date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastViewed: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      riskLevel: 'medium',
      riskScore: 45,
      riskFactors: ['Limited warranty', 'Usage restrictions', 'Auto-renewal clause']
    },
  ];

  const templates = [
    { id: 1, name: 'Non-Disclosure Agreement', category: 'Legal' },
    { id: 2, name: 'Freelance Contract', category: 'Business' },
    { id: 3, name: 'Employment Agreement', category: 'HR' },
    { id: 4, name: 'Service Level Agreement', category: 'IT' },
  ];

  const userGeneratedContracts = [
    {
      id: 1,
      name: 'AI-Generated NDA - Tech Startup',
      type: 'Non-Disclosure Agreement',
      createdDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'Draft',
      generatedBy: 'Contract AI AI'
    },
    {
      id: 2,
      name: 'Custom Freelance Agreement - Web Dev',
      type: 'Freelance Contract',
      createdDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
    return new Date(dateString).toLocaleDateString();
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

  // Handler functions
  const handleLegalReview = (contract: any) => {
    alert(`Legal Review Request for: ${contract.name}\n\nRisk Score: ${contract.riskScore}/100\nRisk Level: ${getRiskLevelFromScore(contract.riskScore).toUpperCase()}\n\nThis feature will connect you with qualified legal professionals.`);
  };

  const handleViewContract = (contract: any) => {
    const updatedContract = { ...contract, lastViewed: new Date().toISOString() };
    setSelectedContract(updatedContract);
    setShowRiskAnalysisModal(true);
  };

  const getTemplatePdfPath = (templateName: string) => {
    const pdfMap: { [key: string]: string } = {
      'Non-Disclosure Agreement': '/Non-Disclosure Agreement .pdf',
      'Freelance Contract': '/Freelance Contract.pdf',
      'Employment Agreement': '/Employment Agreement.pdf',
      'Service Level Agreement': '/Service Level Agreement.pdf'
    };
    return pdfMap[templateName] || null;
  };

  const handleTemplatePreview = (template: any) => {
    const pdfPath = getTemplatePdfPath(template.name);
    if (pdfPath) {
      setSelectedTemplate({ ...template, pdfPath });
      setShowPdfPreview(true);
    } else {
      alert(`PDF preview not available for ${template.name}`);
    }
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

  // Filter data
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
          <div 
            className={`flex items-center px-6 py-3 cursor-pointer ${activeSidebarItem === 'contracts' ? 'bg-blue-50 border-r-4 border-blue-500' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveSidebarItem('contracts')}
          >
            <FileText className={`w-5 h-5 ${activeSidebarItem === 'contracts' ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className={`ml-3 ${activeSidebarItem === 'contracts' ? 'font-medium text-blue-600' : 'text-gray-700'}`}>Contracts</span>
          </div>
          
          <div 
            className={`flex items-center px-6 py-3 cursor-pointer ${activeSidebarItem === 'templates' ? 'bg-blue-50 border-r-4 border-blue-500' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveSidebarItem('templates')}
          >
            <FileCode className={`w-5 h-5 ${activeSidebarItem === 'templates' ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className={`ml-3 ${activeSidebarItem === 'templates' ? 'font-medium text-blue-600' : 'text-gray-700'}`}>Templates</span>
          </div>
          
          <div 
            className={`flex items-center px-6 py-3 cursor-pointer ${activeSidebarItem === 'profile' ? 'bg-blue-50 border-r-4 border-blue-500' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveSidebarItem('profile')}
          >
            <User className={`w-5 h-5 ${activeSidebarItem === 'profile' ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className={`ml-3 ${activeSidebarItem === 'profile' ? 'font-medium text-blue-600' : 'text-gray-700'}`}>Profile</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeSidebarItem === 'contracts' && 'My Contracts'}
                {activeSidebarItem === 'templates' && 'Templates'}
                {activeSidebarItem === 'profile' && 'Profile Settings'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700">{userName}</span>
                <button
                  onClick={onSignOut}
                  className="text-gray-600 hover:text-red-600 p-2 transition-colors duration-200"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Profile Tab */}
          {activeSidebarItem === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-8">
                <div className="relative mb-4 md:mb-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {profilePicture ? (
                      <img 
                        src={profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      userAvatar
                    )}
                  </div>
                  <button
                    onClick={() => document.getElementById('profile-picture-input')?.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
                    title="Change profile picture"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    id="profile-picture-input"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{editableUserName}</h2>
                  <p className="text-gray-600">{editableUserEmail}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Professional Plan
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editableUserName}
                      onChange={(e) => setEditableUserName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editableUserEmail}
                      onChange={(e) => setEditableUserEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Your job title"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={handleProfileUpdate}
                    disabled={isUpdatingProfile}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isUpdatingProfile ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
              
              <div className="border-t mt-8 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 8 characters)"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={handlePasswordUpdate}
                    disabled={isUpdatingPassword || !currentPassword || !newPassword || !confirmPassword}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isUpdatingPassword ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Updating Password...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Password must be at least 8 characters long
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}