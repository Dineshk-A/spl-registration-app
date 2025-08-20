# 🏏 SPL Registration App

A progressive web application for SPL (Super Premier League) player registration, built from simple HTML/CSS/JS to a full-stack React application.

## 🚀 Project Phases

### Phase 1: SPL Player Registration ✅
- Simplified SPL registration form
- Player position selection (Batsman, Bowler, Wicket Keeper, All Rounder)
- Photo upload with preview and validation
- Unique phone number validation (one registration per number)
- Professional SPL-themed UI
- Local storage with duplicate prevention
- Photo file naming based on player name (ready for backend)

### Phase 2: React Frontend (Coming Next)
- Convert to React.js
- Component-based architecture
- State management
- Enhanced form handling

### Phase 3: Backend API (Planned)
- Node.js/Express server
- JWT authentication
- Password hashing
- Email verification

### Phase 4: Database Integration (Planned)
- PostgreSQL/MongoDB
- User data persistence
- Database migrations

### Phase 5: Deployment (Planned)
- Docker containerization
- EC2 deployment
- SSL certificates
- Environment configuration

### Phase 6: Advanced Features (Planned)
- Email notifications
- Password reset functionality
- User profiles
- Admin dashboard

## 📁 Current Structure

```
spl-registration-app/
├── index.html          # SPL player registration form
├── styles.css          # SPL-themed responsive styling with photo upload
├── script.js           # Player validation, photo handling & duplicate checking
└── README.md           # Project documentation
```

## 🛠️ How to Run (Phase 1)

1. Clone the repository:
   ```bash
   git clone https://github.com/Dineshk-A/spl-registration-app.git
   cd spl-registration-app
   ```

2. Open in browser:
   ```bash
   # Simple way - just open the file
   open index.html
   
   # Or serve with a simple HTTP server
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

## ✨ Features (Phase 1)

- **SPL Registration**: Simplified registration for Super Premier League
- **Position Selection**: Batsman, Bowler, Wicket Keeper, All Rounder
- **Photo Upload**: Upload player photo with preview and validation
- **Unique Player Validation**: One registration per phone number
- **Indian Phone Format**: Auto-formats Indian mobile numbers (+91)
- **Photo File Naming**: Automatically renames photos based on player name
- **Duplicate Prevention**: Shows existing player details if phone already registered
- **Registration ID**: Unique SPL player ID generation (SPL######)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **SPL-themed UI**: Green gradient design with cricket emojis
- **File Validation**: Image type and size validation (max 5MB)

## 🧪 Testing on EC2

### Ubuntu Setup:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Git (if not already installed)
sudo apt install git -y

# Clone the repository
git clone https://github.com/Dineshk-A/spl-registration-app.git
cd spl-registration-app

# Install a simple web server
sudo apt install python3 -y

# Serve the application
python3 -m http.server 8000

# Access via: http://your-ec2-public-ip:8000
```

### Security Group Settings:
- Allow inbound traffic on port 8000 (HTTP)
- Allow inbound traffic on port 22 (SSH)

## 🔄 Development Workflow

Each phase will be committed to a separate branch:
- `main` - Stable releases
- `phase-1` - HTML/CSS/JS version
- `phase-2` - React frontend
- `phase-3` - Backend API
- etc.

## 📝 SPL Registration Fields

- **Player Name** (required, letters only, minimum 2 characters)
- **Phone Number** (required, Indian mobile format, unique identifier)
- **Playing Position** (required, dropdown: Batsman/Bowler/Wicket Keeper/All Rounder)
- **Player Photo** (required, image upload with preview)
- **SPL Terms** (required checkbox)
- **Tournament Availability** (required checkbox)

## 🎯 SPL Validation Rules

- **Player Name**: Minimum 2 characters, letters and dots only
- **Phone**: Valid Indian mobile number (10 digits, starts with 6-9)
- **Position**: Must select one primary playing position
- **Photo**: Valid image file (JPG, PNG, GIF) under 5MB
- **Uniqueness**: One registration per phone number only

## 📸 Photo Upload Features

- **File Types**: JPG, PNG, GIF supported
- **Size Limit**: Maximum 5MB per image
- **Preview**: Instant photo preview after upload
- **Auto-naming**: Photos renamed as `playername_timestamp.ext`
- **Validation**: Real-time file type and size checking

## 🏏 Testing Features

Open browser console and use these commands:
- `viewAllPlayers()` - See all registered SPL players
- `clearAllPlayers()` - Clear all registrations (for testing)

## 🤝 Contributing

This is a learning project progressing from simple to complex. Each phase builds upon the previous one.

## 📄 License

MIT License - Feel free to use this for learning purposes.

---

**Current Status**: Phase 1 Complete ✅  
**Next**: Phase 2 - React Conversion 🚀
