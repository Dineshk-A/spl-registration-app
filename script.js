// Cricket Auction Registration functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const duplicateMessage = document.getElementById('duplicateMessage');
    const errorText = document.getElementById('errorText');
    const submitBtn = form.querySelector('.submit-btn');

    // Form validation rules for cricket registration
    const validationRules = {
        playerName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s\.]+$/,
            message: 'Player name must be at least 2 characters and contain only letters'
        },
        phone: {
            required: true,
            pattern: /^(\+91|91)?[6-9]\d{9}$/,
            message: 'Please enter a valid Indian mobile number (10 digits starting with 6-9)'
        },
        position: {
            required: true,
            message: 'Please select your playing position'
        },
        experience: {
            required: true,
            message: 'Please select your cricket experience level'
        },
        age: {
            required: true,
            validate: function(value) {
                const age = parseInt(value);
                return age >= 16 && age <= 50;
            },
            message: 'Age must be between 16 and 50 years for cricket auction'
        },
        location: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s,.-]+$/,
            message: 'Please enter a valid city/location name'
        },
        terms: {
            required: true,
            message: 'You must agree to the auction terms and conditions'
        },
        availability: {
            required: true,
            message: 'You must confirm your availability for the tournament'
        }
    };

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => clearFieldError(fieldName));
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    function validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const rule = validationRules[fieldName];
        const value = field.value.trim();

        // Clear previous errors
        clearFieldError(fieldName);

        // Required validation
        if (rule.required && !value) {
            showFieldError(fieldName, `${getFieldLabel(fieldName)} is required`);
            return false;
        }

        if (!value) return true; // Skip other validations if field is empty and not required

        // Pattern validation
        if (rule.pattern && !rule.pattern.test(value)) {
            showFieldError(fieldName, rule.message);
            return false;
        }

        // Min length validation
        if (rule.minLength && value.length < rule.minLength) {
            showFieldError(fieldName, rule.message);
            return false;
        }

        // Match field validation (for confirm password)
        if (rule.matchField) {
            const matchField = document.getElementById(rule.matchField);
            if (value !== matchField.value) {
                showFieldError(fieldName, rule.message);
                return false;
            }
        }

        // Custom validation function
        if (rule.validate && !rule.validate(value)) {
            showFieldError(fieldName, rule.message);
            return false;
        }

        return true;
    }

    function validateForm() {
        let isValid = true;
        
        Object.keys(validationRules).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        formGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-text');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-text';
        errorSpan.textContent = message;
        formGroup.appendChild(errorSpan);
    }

    function clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const formGroup = field.closest('.form-group');
        
        formGroup.classList.remove('error');
        
        const errorText = formGroup.querySelector('.error-text');
        if (errorText) {
            errorText.remove();
        }
    }

    function getFieldLabel(fieldName) {
        const field = document.getElementById(fieldName);
        const label = field.closest('.form-group').querySelector('label');
        return label ? label.textContent : fieldName;
    }

    function submitForm() {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Registering Player...';

        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        duplicateMessage.style.display = 'none';

        // Collect form data
        const formData = new FormData(form);
        const playerData = Object.fromEntries(formData.entries());

        // Check for duplicate phone number
        const existingPlayers = JSON.parse(localStorage.getItem('cricketPlayers') || '[]');
        const duplicatePlayer = existingPlayers.find(player => player.phone === playerData.phone);

        // Simulate API call (replace with actual API call later)
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = '🏏 Register for Auction';

            if (duplicatePlayer) {
                // Show duplicate registration message
                document.getElementById('existingName').textContent = duplicatePlayer.playerName;
                document.getElementById('existingPosition').textContent = getPositionDisplayName(duplicatePlayer.position);
                document.getElementById('existingDate').textContent = new Date(duplicatePlayer.registrationDate).toLocaleDateString();
                duplicateMessage.style.display = 'block';
                return;
            }

            // Simulate success (95% success rate for demo)
            if (Math.random() > 0.05) {
                // Generate registration ID
                const registrationId = 'CKT' + Date.now().toString().slice(-6);
                playerData.registrationId = registrationId;
                playerData.registrationDate = new Date().toISOString();

                // Success - Add to registered players
                existingPlayers.push(playerData);
                localStorage.setItem('cricketPlayers', JSON.stringify(existingPlayers));

                console.log('Player registered:', playerData);

                // Show success message with player details
                document.getElementById('confirmedName').textContent = playerData.playerName;
                document.getElementById('confirmedPosition').textContent = getPositionDisplayName(playerData.position);
                document.getElementById('confirmedPhone').textContent = playerData.phone;
                document.getElementById('registrationId').textContent = registrationId;

                form.style.display = 'none';
                successMessage.style.display = 'block';
            } else {
                // Error
                errorText.textContent = 'Registration failed due to server error. Please try again.';
                errorMessage.style.display = 'block';
            }
        }, 2000);
    }

    function getPositionDisplayName(position) {
        const positions = {
            'batsman': 'Batsman',
            'bowler': 'Bowler',
            'wicket-keeper': 'Wicket Keeper',
            'all-rounder': 'All Rounder'
        };
        return positions[position] || position;
    }

    // Update link functionality
    document.getElementById('updateLink').addEventListener('click', function(e) {
        e.preventDefault();
        const phone = prompt('Enter your registered phone number to update details:');
        if (phone) {
            const existingPlayers = JSON.parse(localStorage.getItem('cricketPlayers') || '[]');
            const player = existingPlayers.find(p => p.phone === phone);
            if (player) {
                alert(`Found player: ${player.playerName} (${getPositionDisplayName(player.position)})\nUpdate functionality will be available in the next phase!`);
            } else {
                alert('No player found with this phone number. Please check and try again.');
            }
        }
    });

    // Add function to view all registered players (for testing)
    window.viewAllPlayers = function() {
        const players = JSON.parse(localStorage.getItem('cricketPlayers') || '[]');
        console.log('All registered players:', players);
        if (players.length === 0) {
            alert('No players registered yet!');
        } else {
            let playerList = 'Registered Players:\n\n';
            players.forEach((player, index) => {
                playerList += `${index + 1}. ${player.playerName} (${getPositionDisplayName(player.position)}) - ${player.phone}\n`;
            });
            alert(playerList);
        }
    };

    // Add function to clear all registrations (for testing)
    window.clearAllPlayers = function() {
        if (confirm('Are you sure you want to clear all player registrations? This cannot be undone.')) {
            localStorage.removeItem('cricketPlayers');
            alert('All player registrations cleared!');
        }
    };
});

// Utility functions
function formatIndianPhoneNumber(input) {
    // Format Indian phone numbers
    let value = input.value.replace(/\D/g, '');

    // Remove country code if present
    if (value.startsWith('91') && value.length === 12) {
        value = value.substring(2);
    }

    // Format as +91 XXXXX XXXXX
    if (value.length === 10) {
        value = '+91 ' + value.substring(0, 5) + ' ' + value.substring(5);
    } else if (value.length > 5) {
        value = '+91 ' + value.substring(0, 5) + ' ' + value.substring(5, 10);
    } else if (value.length > 0) {
        value = '+91 ' + value;
    }

    input.value = value;
}

// Add phone number formatting and other enhancements
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatIndianPhoneNumber(this);
        });

        // Set placeholder
        phoneInput.placeholder = '+91 98765 43210';
    }

    // Add position-specific tips
    const positionSelect = document.getElementById('position');
    if (positionSelect) {
        positionSelect.addEventListener('change', function() {
            const tips = {
                'batsman': 'Focus on your batting average and strike rate during the auction!',
                'bowler': 'Highlight your bowling economy and wicket-taking ability!',
                'wicket-keeper': 'Showcase your keeping skills and batting contribution!',
                'all-rounder': 'Perfect! All-rounders are highly valued in auctions!'
            };

            if (tips[this.value]) {
                // You could show this as a tooltip or small message
                console.log('Tip:', tips[this.value]);
            }
        });
    }
});
