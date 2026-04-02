# ContractGPT File Upload & Analysis System

## Overview
This system handles PDF contract uploads, saves them to the correct location, and connects with the analysis.py script to provide real-time contract analysis results.

## File Structure
```
Final Open AI/
├── InputPDF/               # PDF files saved here
│   ├── data.json          # Tracks uploaded files
│   └── *.pdf              # Uploaded PDF files
├── analysis.py            # Python analysis script
└── jsonweb.json          # Analysis results output
```

## How It Works

### 1. File Upload Process
- **Location**: PDFs are saved to `C:\Users\aakas\Desktop\openai\Final Open AI\InputPDF\`
- **Tracking**: `data.json` file maintains a record of all uploaded files
- **Unique IDs**: Each file gets a unique identifier for tracking

### 2. Analysis Pipeline
```
Upload PDF → Save to InputPDF/ → Update data.json → Run analysis.py → Generate jsonweb.json → Display Results
```

### 3. Frontend Integration

#### UploadModal Component
- Handles file selection and validation
- Saves PDFs to correct directory
- Triggers analysis.py execution
- Shows real-time progress and results

#### Dashboard Component
- Displays analyzed contracts
- Refreshes automatically to show new uploads
- Shows risk assessments and recommendations
- Connects to real analysis data

#### FileService
- **uploadFile()**: Saves PDF to InputPDF folder
- **runAnalysis()**: Executes analysis.py script
- **getAnalysisResults()**: Reads from jsonweb.json
- **getAnalyzedContracts()**: Returns all analyzed files

## Key Features

### 📁 **File Management**
- Automatic PDF saving to InputPDF directory
- data.json tracking for file metadata
- Unique file naming to prevent conflicts

### 🔍 **Analysis Integration**
- Direct connection to analysis.py script
- Real-time analysis status updates
- Automatic result retrieval from jsonweb.json

### 📊 **Dashboard Display**
- Live contract analysis results
- Risk assessment visualization
- Recommendations and compliance checking
- Auto-refresh for new uploads

### 💾 **Data Persistence**
- LocalStorage for session management
- File tracking in data.json
- Analysis results in jsonweb.json

## Usage Instructions

### For Users:
1. **Login/Signup**: Create account or sign in
2. **Upload Contract**: Click "Upload Contract" button
3. **Select PDF**: Choose your PDF contract file
4. **Wait for Analysis**: System will process automatically
5. **View Results**: See analysis in dashboard

### For Developers:
1. **File Upload**: Uses `fileService.uploadFile(file)`
2. **Analysis**: Calls `fileService.runAnalysis(fileId)`
3. **Results**: Retrieved with `fileService.getAnalysisResults(fileId)`

## File Locations

### Input Files
- **PDFs**: `C:\Users\aakas\Desktop\openai\Final Open AI\InputPDF\*.pdf`
- **Tracking**: `C:\Users\aakas\Desktop\openai\Final Open AI\InputPDF\data.json`

### Analysis
- **Script**: `C:\Users\aakas\Desktop\openai\Final Open AI\analysis.py`
- **Results**: `C:\Users\aakas\Desktop\openai\Final Open AI\jsonweb.json`

### Frontend
- **Service**: `src/services/fileService.ts`
- **Upload**: `src/components/UploadModal.tsx`
- **Display**: `src/pages/Dashboard.tsx`

## Data Flow

1. **User uploads PDF** → UploadModal
2. **File saved** → InputPDF folder + data.json updated
3. **analysis.py triggered** → Processes PDF
4. **Results generated** → jsonweb.json created
5. **Dashboard updated** → Shows analysis results
6. **User sees results** → Risk assessment, recommendations

## Features Implemented

✅ **PDF Upload to InputPDF folder**
✅ **data.json file tracking**  
✅ **analysis.py integration**
✅ **jsonweb.json result reading**
✅ **Dashboard display of real data**
✅ **Real-time analysis status**
✅ **Auto-refresh dashboard**
✅ **Demo/fallback data when no uploads**

## Future Enhancements

- Direct file system integration (currently simulated)
- Real Python script execution
- File deletion and management
- Advanced analysis options
- Export functionality