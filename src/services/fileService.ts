// File service to handle PDF uploads and analysis
export interface UploadedFile {
  id: string;
  name: string;
  originalName: string;
  size: number;
  uploadDate: string;
  status: 'uploaded' | 'analyzing' | 'analyzed' | 'error';
  analysisData?: any;
}

class FileService {
  private baseUrl = '/api';
  private uploadEndpoint = `${this.baseUrl}/upload-contract`;
  private contractsEndpoint = `${this.baseUrl}/contracts`;
  private analysisEndpoint = `${this.baseUrl}/analysis-data`;

  // Upload file to backend API
  async uploadFile(file: File): Promise<{ success: boolean; message: string; fileId?: string }> {
    try {
      console.log(`Uploading file: ${file.name}`);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('contract', file);
      
      // Get auth token from localStorage (if available)
      const token = localStorage.getItem('contractgpt_token');
      
      // Upload to backend API
      const response = await fetch(this.uploadEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Create uploaded file record for local tracking
        const uploadedFile: UploadedFile = {
          id: result.data?.contractId || `file_${Date.now()}`,
          name: result.data?.filename || file.name,
          originalName: file.name,
          size: file.size,
          uploadDate: new Date().toISOString(),
          status: 'analyzed',
          analysisData: result.data?.analysis
        };
        
        // Update local tracking
        await this.updateDataJson(uploadedFile);
        
        console.log(`File uploaded successfully: ${file.name}`);
        return {
          success: true,
          message: result.message,
          fileId: uploadedFile.id
        };
      } else {
        throw new Error(result.message || 'Upload failed');
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        message: 'Failed to upload file'
      };
    }
  }
  
  // Update data.json to track uploaded files
  private async updateDataJson(uploadedFile: UploadedFile): Promise<void> {
    try {
      // For demo purposes, we'll store in localStorage
      // In real implementation, this would write to the actual data.json file
      const existingData = localStorage.getItem('contractgpt_uploaded_files');
      let files: UploadedFile[] = existingData ? JSON.parse(existingData) : [];
      
      files.push(uploadedFile);
      localStorage.setItem('contractgpt_uploaded_files', JSON.stringify(files));
      
      console.log('Updated data.json with new file:', uploadedFile);
    } catch (error) {
      console.error('Error updating data.json:', error);
    }
  }
  
  // Get uploaded files from data.json (fallback to localStorage)
  getUploadedFiles(): UploadedFile[] {
    try {
      const data = localStorage.getItem('contractgpt_uploaded_files');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading uploaded files:', error);
      return [];
    }
  }

  // Fetch contracts from backend API
  async fetchContracts(): Promise<UploadedFile[]> {
    try {
      const token = localStorage.getItem('contractgpt_token');
      const response = await fetch(this.contractsEndpoint, {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      const result = await response.json();
      if (result.success) {
        // Convert backend format to UploadedFile format
        return result.contracts.map((contract: any) => ({
          id: contract.id.toString(),
          name: contract.stored_filename || contract.original_filename,
          originalName: contract.original_filename,
          size: contract.file_size || 0,
          uploadDate: contract.upload_date,
          status: contract.status === 'analyzed' ? 'analyzed' : 'uploaded',
          analysisData: contract.overall_risk_assessment ? {
            Overall_Risk_Assessment: contract.overall_risk_assessment,
            Risk_Category: contract.risk_category,
            Financial_Terms: contract.financial_terms,
            Legal_Compliance: contract.legal_compliance,
            Operational_Risk: contract.operational_risk,
            Termination_Terms: contract.termination_terms,
            Key_Risk_Factors_Identified: contract.key_risk_factors || [],
            Recommendations: contract.recommendations || []
          } : undefined
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching contracts:', error);
      return this.getUploadedFiles(); // Fallback to localStorage
    }
  }

  // Fetch analysis data from backend API
  async fetchAnalysisData(): Promise<any> {
    try {
      const response = await fetch(this.analysisEndpoint);
      const result = await response.json();
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error fetching analysis data:', error);
      return null;
    }
  }
  
  // Trigger analysis.py execution
  async runAnalysis(fileId: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log(`Starting analysis for file: ${fileId}`);
      
      // Update file status to analyzing
      await this.updateFileStatus(fileId, 'analyzing');
      
      // Simulate analysis.py execution
      // In real implementation, this would execute the Python script
      console.log('Executing analysis.py...');
      
      // Simulate analysis delay (2-5 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate demo analysis results (simulating what analysis.py would create)
      const analysisResults = {
        Overall_Risk_Assessment: Math.floor(Math.random() * 100),
        Risk_Category: ['Low Risk', 'Medium Risk', 'High Risk'][Math.floor(Math.random() * 3)],
        Financial_Terms: Math.floor(Math.random() * 100),
        Legal_Compliance: Math.floor(Math.random() * 100),
        Operational_Risk: Math.floor(Math.random() * 100),
        Termination_Terms: Math.floor(Math.random() * 100),
        Key_Risk_Factors_Identified: [
          'Contract termination clauses',
          'Payment terms and conditions',
          'Liability limitations',
          'Compliance requirements'
        ],
        Recommendations: [
          'Review termination notice period',
          'Clarify payment deadlines',
          'Add force majeure clause',
          'Update compliance standards'
        ],
        Legal_Verifications: [
          'Jurisdiction compliance verified',
          'Standard legal clauses present',
          'No conflicting terms found'
        ],
        Sophisticated_Analysis: {
          contract_type: 'Service Agreement',
          key_parties: ['Company A', 'Service Provider B'],
          contract_duration: '12 months',
          renewal_terms: 'Automatic renewal with 30-day notice'
        }
      };
      
      // Save results to jsonweb.json (simulated)
      await this.saveAnalysisResults(fileId, analysisResults);
      
      // Update file status to analyzed
      await this.updateFileStatus(fileId, 'analyzed', analysisResults);
      
      console.log('Analysis completed successfully');
      return {
        success: true,
        message: 'Analysis completed successfully'
      };
      
    } catch (error) {
      console.error('Analysis error:', error);
      await this.updateFileStatus(fileId, 'error');
      return {
        success: false,
        message: 'Analysis failed'
      };
    }
  }
  
  // Update file status in data.json
  private async updateFileStatus(fileId: string, status: UploadedFile['status'], analysisData?: any): Promise<void> {
    try {
      const files = this.getUploadedFiles();
      const fileIndex = files.findIndex(f => f.id === fileId);
      
      if (fileIndex !== -1) {
        files[fileIndex].status = status;
        if (analysisData) {
          files[fileIndex].analysisData = analysisData;
        }
        
        localStorage.setItem('contractgpt_uploaded_files', JSON.stringify(files));
        console.log(`Updated file status: ${fileId} -> ${status}`);
      }
    } catch (error) {
      console.error('Error updating file status:', error);
    }
  }
  
  // Save analysis results to jsonweb.json (simulated)
  private async saveAnalysisResults(fileId: string, results: any): Promise<void> {
    try {
      // In real implementation, this would write to the actual jsonweb.json file
      localStorage.setItem(`contractgpt_analysis_${fileId}`, JSON.stringify(results));
      console.log('Analysis results saved to jsonweb.json (simulated)');
    } catch (error) {
      console.error('Error saving analysis results:', error);
    }
  }
  
  // Read analysis results from jsonweb.json
  getAnalysisResults(fileId?: string): any {
    try {
      if (fileId) {
        const data = localStorage.getItem(`contractgpt_analysis_${fileId}`);
        return data ? JSON.parse(data) : null;
      } else {
        // Get latest analysis results
        const files = this.getUploadedFiles();
        const analyzedFiles = files.filter(f => f.status === 'analyzed' && f.analysisData);
        return analyzedFiles.length > 0 ? analyzedFiles[analyzedFiles.length - 1].analysisData : null;
      }
    } catch (error) {
      console.error('Error reading analysis results:', error);
      return null;
    }
  }
  
  // Get all analyzed contracts for dashboard
  getAnalyzedContracts(): UploadedFile[] {
    return this.getUploadedFiles().filter(f => f.status === 'analyzed');
  }
  
  // Note: Bot.py UI is now integrated directly in the frontend
  // The LegalBotModal component handles the chat interface
  // analysis.py is still used for backend PDF processing
  
  // Get contract by ID (for bot.py integration)
  getContractById(contractId: string | number): UploadedFile | null {
    const files = this.getUploadedFiles();
    return files.find(f => f.id === contractId.toString()) || null;
  }
}

// Export singleton instance
export const fileService = new FileService();
