import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

import UploadModal from './components/UploadModal';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, signOut, isLoading } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Show loading spinner while initializing (shouldn't happen in demo mode)
  if (isLoading) {
    return <LoadingSpinner message="Loading Contract AI..." />;
  }
  
  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, location]);

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleAuthenticate = () => {
    // Navigate to dashboard after authentication
    navigate('/dashboard');
  };

  const handleUploadClick = () => {
    if (isAuthenticated) {
      setShowUploadModal(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {location.pathname !== '/dashboard' && (
        <Navbar 
          isAuthenticated={isAuthenticated}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onUploadClick={handleUploadClick}
          onSignUp={handleSignUp}
        />
      )}
      

      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />

      <Routes>
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <Dashboard 
              onSignOut={handleSignOut} 
              onUploadClick={() => setShowUploadModal(true)} 
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />
        <Route path="/login" element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Auth 
              onAuthenticate={handleAuthenticate} 
            />
          )
        } />
        <Route path="/signup" element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Auth 
              onAuthenticate={handleAuthenticate}
              initialMode="signup"
            />
          )
        } />
        <Route path="/" element={
          <Home 
            isAuthenticated={isAuthenticated}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            onUploadClick={handleUploadClick}
            onSignUp={handleSignUp}
          />
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
