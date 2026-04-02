import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { fileService } from '../services/fileService';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { token } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState('');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Only allow PDF files
    if (file.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed!');
      setUploadStatus('error');
      return;
    }

    setFileName(file.name);
    setUploadStatus('uploading');
    setErrorMessage('');
    
    try {
      console.log(`Starting upload process for: ${file.name}`);
      
      // Step 1: Upload file to InputPDF folder
      const uploadResult = await fileService.uploadFile(file);
      
      if (!uploadResult.success || !uploadResult.fileId) {
        setErrorMessage(uploadResult.message || 'Upload failed');
        setUploadStatus('error');
        return;
      }
      
      console.log(`File uploaded successfully, starting analysis...`);
      
      // Step 2: Run analysis.py on the uploaded file
      const analysisResult = await fileService.runAnalysis(uploadResult.fileId);
      
      if (!analysisResult.success) {
        setErrorMessage(analysisResult.message || 'Analysis failed');
        setUploadStatus('error');
        return;
      }
      
      // Step 3: Get analysis results from jsonweb.json
      const analysisData = fileService.getAnalysisResults(uploadResult.fileId);
      
      if (analysisData) {
        console.log('Analysis completed successfully:', analysisData);
        setAnalysisData(analysisData);
        setUploadStatus('success');
      } else {
        setErrorMessage('Analysis completed but no results found');
        setUploadStatus('error');
      }
      
    } catch (error) {
      console.error('Upload/Analysis error:', error);
      setErrorMessage('Failed to process file. Please try again.');
      setUploadStatus('error');
    }
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setFileName('');
    setAnalysisData(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upload Contract</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {uploadStatus === 'idle' && (
            <>
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Drop your contract here
                </h3>
                <p className="text-gray-600 mb-4">
                  or click to browse files
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Choose File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>

              {/* Supported Formats */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Supported formats:</strong> PDF only • Max file size: 10MB
                </p>
                <p className="text-xs text-gray-500 text-center mt-2">
                  📁 Files will be saved to InputPDF folder and analyzed automatically
                </p>
              </div>
            </>
          )}

          {uploadStatus === 'uploading' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Contract</h3>
              <p className="text-gray-600">Processing "{fileName}"...</p>
            </div>
          )}

          {uploadStatus === 'success' && analysisData && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analysis Complete!</h3>
              <p className="text-gray-600 mb-6">
                Your contract "{fileName}" has been analyzed. Here's what we found:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                {/* Overall Risk Assessment */}
                <div className="mb-4 p-3 rounded-lg bg-white border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Overall Risk Assessment</span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      analysisData.Overall_Risk_Assessment <= 33 ? 'bg-green-100 text-green-800' :
                      analysisData.Overall_Risk_Assessment <= 66 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {analysisData.Overall_Risk_Assessment}/100 - {analysisData.Risk_Category}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        analysisData.Overall_Risk_Assessment <= 33 ? 'bg-green-500' :
                        analysisData.Overall_Risk_Assessment <= 66 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${analysisData.Overall_Risk_Assessment}%` }}
                    ></div>
                  </div>
                </div>

                {/* Risk Categories */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Financial Terms:</span>
                    <span className="font-medium">{analysisData.Financial_Terms}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Legal Compliance:</span>
                    <span className="font-medium">{analysisData.Legal_Compliance}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operational Risk:</span>
                    <span className="font-medium">{analysisData.Operational_Risk}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Termination Terms:</span>
                    <span className="font-medium">{analysisData.Termination_Terms}/100</span>
                  </div>
                </div>

                {/* Key Risk Factors */}
                {analysisData.Key_Risk_Factors_Identified && analysisData.Key_Risk_Factors_Identified.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h5 className="font-medium text-gray-900 mb-2">Key Risk Factors:</h5>
                    <div className="text-xs text-gray-600 space-y-1">
                      {analysisData.Key_Risk_Factors_Identified.slice(0, 2).map((factor: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-2 flex-shrink-0"></div>
                          <span>{factor.length > 80 ? factor.substring(0, 80) + '...' : factor}</span>
                        </div>
                      ))}
                      {analysisData.Key_Risk_Factors_Identified.length > 2 && (
                        <div className="text-center mt-2">
                          <span className="text-gray-500">+ {analysisData.Key_Risk_Factors_Identified.length - 2} more factors</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  View Full Analysis
                </button>
                <button
                  onClick={resetUpload}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Upload Another
                </button>
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Failed</h3>
              <p className="text-gray-600 mb-6">
                {errorMessage || 'Please upload a valid PDF file.'}
              </p>
              <button
                onClick={resetUpload}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}