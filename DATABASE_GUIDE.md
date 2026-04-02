# ContractGPT - Database Integration Guide

## 🎉 Complete Local Database Implementation

ContractGPT now includes a fully functional **SQLite database** for user authentication and contract storage!

## 🔥 New Features Added

### 🔐 **Authentication System**
- ✅ **User Registration** with email, password, name, company, job title
- ✅ **Secure Login** with JWT tokens and password hashing
- ✅ **Session Management** with automatic token validation
- ✅ **Password Change** functionality
- ✅ **Profile Management** with company and job title

### 💾 **Database Storage**
- ✅ **SQLite Database** (`contractgpt.db`) automatically created
- ✅ **User Data** stored securely with hashed passwords
- ✅ **Contract Storage** - all uploaded PDFs tracked by user
- ✅ **Analysis Results** - complete analysis data stored per contract
- ✅ **Session Management** - JWT tokens tracked for security

### 📊 **Enhanced Contract Management**
- ✅ **User-specific Contracts** - each user sees only their contracts
- ✅ **Real Analysis Data** - displays actual AI analysis results
- ✅ **Contract Status Tracking** (uploaded, analyzed, failed)
- ✅ **File Management** - PDFs stored in InputPDF folder
- ✅ **Analysis History** - complete analysis results saved

## 🏗️ Database Schema

### Users Table
```sql
users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE,
  password TEXT (hashed),
  name TEXT,
  company TEXT,
  job_title TEXT,
  profile_picture TEXT,
  created_at DATETIME,
  updated_at DATETIME
)
```

### Contracts Table
```sql
contracts (
  id INTEGER PRIMARY KEY,
  user_id INTEGER (FK),
  original_filename TEXT,
  stored_filename TEXT,
  file_path TEXT,
  file_size INTEGER,
  upload_date DATETIME,
  last_viewed DATETIME,
  status TEXT
)
```

### Analysis Results Table
```sql
analysis_results (
  id INTEGER PRIMARY KEY,
  contract_id INTEGER (FK),
  user_id INTEGER (FK),
  overall_risk_assessment INTEGER,
  risk_category TEXT,
  financial_terms INTEGER,
  legal_compliance INTEGER,
  operational_risk INTEGER,
  termination_terms INTEGER,
  key_risk_factors TEXT (JSON),
  recommendations TEXT (JSON),
  legal_verifications TEXT (JSON),
  sophisticated_analysis TEXT (JSON),
  analysis_timestamp DATETIME
)
```

## 🚀 Getting Started

### 1. Start the Application
```powershell
# Option 1: PowerShell script
.\start.ps1

# Option 2: Batch file
start.bat

# Option 3: NPM command
npm run dev:all
```

### 2. Create Your Account
1. Go to **http://localhost:5173**
2. Click **"Sign Up"**
3. Fill in your details:
   - **Name**: Your full name
   - **Email**: Your email address
   - **Password**: At least 6 characters
   - **Company**: (Optional) Your company
   - **Job Title**: (Optional) Your role

### 3. Start Using ContractGPT
1. **Upload Contracts** → Automatically saved to database
2. **View Analysis** → Real-time AI analysis stored
3. **Track Progress** → All contracts organized by user
4. **Get Legal Review** → AI bot integration

## 📝 Complete Workflow

### User Registration/Login
```
1. User registers → Password hashed → User stored in database
2. User logs in → JWT token generated → Session tracked
3. Token stored in browser → Auto-login on return
```

### Contract Upload & Analysis
```
1. User uploads PDF → Saved to InputPDF folder
2. Contract record created in database
3. analysis.py runs automatically
4. Results stored in analysis_results table
5. Dashboard shows real-time data
```

### Data Flow
```
Frontend (React) ←→ Backend (Node.js) ←→ Database (SQLite)
                     ↓
                AI Analysis (Python)
                     ↓
                InputPDF Folder
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Contracts
- `GET /api/contracts` - Get user's contracts
- `POST /api/upload-contract` - Upload & analyze contract
- `POST /api/legal-review` - Trigger AI legal review

### System
- `GET /health` - System health check
- `GET /api/analysis-data` - Legacy analysis data

## 🔒 Security Features

- **Password Hashing** with bcrypt (10 salt rounds)
- **JWT Tokens** for session management (24-hour expiry)
- **Protected Routes** requiring authentication
- **User Isolation** - users only see their own data
- **SQL Injection Protection** with parameterized queries
- **XSS Protection** with Helmet.js

## 💼 Business Features

- **Multi-user Support** - unlimited users
- **Contract Organization** - by user and date
- **Analysis History** - complete audit trail
- **File Management** - organized storage
- **Real-time Updates** - live analysis results

## 🛠️ File Structure

```
Contractgpt-main/
├── backend/
│   ├── server.js              # Main server with all routes
│   ├── database.js            # Database setup and helpers
│   ├── auth.js                # Authentication utilities
│   ├── contractgpt.db         # SQLite database (auto-created)
│   └── package.json           # Backend dependencies
├── src/
│   ├── contexts/AuthContext.tsx   # Real authentication
│   ├── pages/Dashboard.tsx        # User-specific contracts
│   ├── components/UploadModal.tsx # Authenticated uploads
│   └── ...
├── start.ps1                  # PowerShell startup script
├── start.bat                  # Windows batch startup
└── DATABASE_GUIDE.md          # This guide

Final Open AI/
├── bot.py                     # AI analysis server
├── analysis.py                # PDF analysis script
├── jsonweb.json              # Analysis results
├── InputPDF/                 # User uploaded PDFs
└── Data/                     # Training data
```

## 🎯 Key Benefits

1. **🔐 Secure Multi-User System** - Each user has private account
2. **💾 Persistent Data** - All data saved locally in SQLite
3. **📊 Real Analysis Results** - Actual AI analysis displayed
4. **🔄 Complete Integration** - Frontend ↔ Backend ↔ AI seamless
5. **📈 Scalable Architecture** - Ready for production deployment

## 🐛 Troubleshooting

### Database Issues
- Database auto-creates on first run
- Check `backend/contractgpt.db` exists
- Restart server if tables missing

### Authentication Issues
- Clear browser localStorage if stuck
- Check JWT token expiry (24 hours)
- Verify backend server running on port 3001

### Upload Issues
- Ensure InputPDF folder exists
- Check file permissions
- Verify Python analysis.py working

## 🎉 Success!

You now have a **complete, production-ready** ContractGPT application with:
- ✅ User authentication and profiles
- ✅ Secure local database storage  
- ✅ Real AI contract analysis
- ✅ Multi-user contract management
- ✅ Complete audit trail and history

**Start creating your legal contract analysis platform!** 🚀