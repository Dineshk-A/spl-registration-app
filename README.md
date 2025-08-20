# SPL Registration App

A progressive web application for user registration, built from simple HTML/CSS/JS to a full-stack React application.

## 🚀 Project Phases

### Phase 1: Simple HTML/CSS/JS ✅
- Responsive registration form
- Client-side validation
- Professional UI/UX
- Local storage demo

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
├── index.html          # Main registration form
├── styles.css          # Responsive CSS styling
├── script.js           # Form validation & interactions
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

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Validation**: Instant feedback on form fields
- **Password Strength**: Enforces strong password requirements
- **Phone Formatting**: Auto-formats phone numbers
- **Professional UI**: Modern gradient design with animations
- **Accessibility**: Proper labels and keyboard navigation

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

## 📝 Form Fields

- First Name (required, letters only)
- Last Name (required, letters only)
- Email (required, valid email format)
- Phone Number (required, auto-formatted)
- Password (required, strong password policy)
- Confirm Password (required, must match)
- Date of Birth (required, age 13-120)
- Gender (required, dropdown selection)
- Terms & Conditions (required checkbox)
- Newsletter Subscription (optional checkbox)

## 🎯 Validation Rules

- **Names**: Minimum 2 characters, letters only
- **Email**: Valid email format
- **Phone**: Valid phone number format
- **Password**: Minimum 8 characters with uppercase, lowercase, number, and special character
- **Age**: Must be between 13 and 120 years old

## 🤝 Contributing

This is a learning project progressing from simple to complex. Each phase builds upon the previous one.

## 📄 License

MIT License - Feel free to use this for learning purposes.

---

**Current Status**: Phase 1 Complete ✅  
**Next**: Phase 2 - React Conversion 🚀
