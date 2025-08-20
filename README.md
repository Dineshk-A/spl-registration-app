# 🏏 SPL Cricket Auction Registration App

A progressive web application for cricket player registration and auction management, built from simple HTML/CSS/JS to a full-stack React application.

## 🚀 Project Phases

### Phase 1: Cricket Player Registration ✅
- Cricket-specific registration form
- Player position selection (Batsman, Bowler, Wicket Keeper, All Rounder)
- Unique phone number validation (one registration per number)
- Experience level tracking
- Professional cricket-themed UI
- Local storage with duplicate prevention

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
├── index.html          # Cricket player registration form
├── styles.css          # Cricket-themed responsive styling
├── script.js           # Player validation & duplicate checking
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

- **Cricket-Specific Registration**: Tailored for cricket player auction
- **Position Selection**: Batsman, Bowler, Wicket Keeper, All Rounder
- **Unique Player Validation**: One registration per phone number
- **Experience Tracking**: Beginner to Professional levels
- **Age Validation**: 16-50 years (cricket auction appropriate)
- **Indian Phone Format**: Auto-formats Indian mobile numbers (+91)
- **Duplicate Prevention**: Shows existing player details if phone already registered
- **Registration ID**: Unique cricket player ID generation
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Cricket-themed UI**: Green gradient design with cricket emojis

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

## 📝 Cricket Registration Fields

- **Player Name** (required, letters only, minimum 2 characters)
- **Phone Number** (required, Indian mobile format, unique identifier)
- **Playing Position** (required, dropdown: Batsman/Bowler/Wicket Keeper/All Rounder)
- **Cricket Experience** (required, dropdown: Beginner to Professional)
- **Age** (required, 16-50 years for auction eligibility)
- **Location/City** (required, player's base location)
- **Previous Teams** (optional, textarea for cricket history)
- **Auction Terms** (required checkbox)
- **Tournament Availability** (required checkbox)

## 🎯 Cricket-Specific Validation Rules

- **Player Name**: Minimum 2 characters, letters and dots only
- **Phone**: Valid Indian mobile number (10 digits, starts with 6-9)
- **Position**: Must select one primary playing position
- **Age**: Must be between 16-50 years (auction eligibility)
- **Location**: Valid city/location name
- **Uniqueness**: One registration per phone number only

## 🏏 Testing Features

Open browser console and use these commands:
- `viewAllPlayers()` - See all registered players
- `clearAllPlayers()` - Clear all registrations (for testing)

## 🤝 Contributing

This is a learning project progressing from simple to complex. Each phase builds upon the previous one.

## 📄 License

MIT License - Feel free to use this for learning purposes.

---

**Current Status**: Phase 1 Complete ✅  
**Next**: Phase 2 - React Conversion 🚀
