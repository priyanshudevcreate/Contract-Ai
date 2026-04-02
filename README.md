# ContractGPT - Smart AI for Contracts

ContractGPT is an AI-powered contract analysis platform that simplifies legal jargon and empowers people with intelligent contract insights.

## 🚀 Features

- **Smart Contract Analysis**: Upload PDF/DOCX contracts for AI-powered analysis
- **Risk Scoring System**: 1-100 risk scoring with detailed breakdowns
- **Plain-English Explanations**: Complex legal terms translated to simple language
- **Interactive Q&A**: Ask questions about contract clauses
- **Subscription Plans**: Multiple tiers with Indian pricing (₹)
- **Secure Authentication**: JWT-based user authentication
- **MongoDB Integration**: Full database functionality

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB Atlas
- **Authentication**: JWT tokens
- **File Upload**: Multer for contract uploads
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- Modern web browser

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd contractgpt-main
npm install
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string
npm run dev
```

### 3. Setup Frontend
```bash
# In the root directory
npm run dev
```

### 4. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🗄️ MongoDB Atlas Setup

1. Create free MongoDB Atlas account
2. Create cluster and database user
3. Whitelist IP address (0.0.0.0/0 for development)
4. Get connection string and update .env file

See `MONGODB_SETUP.md` for detailed instructions.

## 📊 Risk Scoring System

- **Low Risk**: 1-30 (Green) - Minimal concerns
- **Medium Risk**: 31-60 (Yellow) - Moderate review needed
- **High Risk**: 61-100 (Red) - Significant attention required

## 💳 Subscription Plans

- **Free**: 3 contracts/month - ₹0
- **Professional**: 50 contracts/month - ₹2,499/month
- **Business**: 200 contracts/month - ₹6,499/month
- **Enterprise**: Unlimited - ₹16,499/month

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Contracts
- `POST /api/contracts/upload` - Upload contract
- `GET /api/contracts` - Get user contracts
- `GET /api/contracts/:id` - Get contract details

### Subscription
- `GET /api/subscription/plans` - Get available plans
- `POST /api/subscription/upgrade` - Upgrade subscription

## 🎯 Key Components

- **Home Page**: Landing page with feature previews
- **Dashboard**: Contract management and analytics
- **Risk Analysis Modal**: Detailed risk breakdowns
- **Subscription Modal**: Plan selection and payment
- **Payment Modal**: UPI and card payment options

## 🔒 Security Features

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- File upload validation
- Secure API endpoints

## 📱 Payment Integration

- **UPI Payment**: Direct UPI app integration
- **Card Payment**: Credit/Debit card support
- **Indian Pricing**: All prices in ₹ (Indian Rupees)
- **Payment Contact**: pk9134wadsar@okhdfcbank

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Check connection string and IP whitelist
2. **File Upload**: Verify file size (max 10MB) and type (PDF/DOCX)
3. **Authentication**: Ensure JWT_SECRET is set in backend .env

### Support
- Email: 23eg107d54@anurag.edu.in
- Check server logs for detailed error messages

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

**ContractGPT** - Making legal documents understandable for everyone! 🎉