// SPL Registration functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const duplicateMessage = document.getElementById('duplicateMessage');
    const errorText = document.getElementById('errorText');
    const submitBtn = form.querySelector('.submit-btn');

    // Photo upload elements
    const photoInput = document.getElementById('playerPhoto');
    const photoPreview = document.getElementById('photoPreview');
    const previewImage = document.getElementById('previewImage');
    const removePhotoBtn = document.getElementById('removePhoto');

    // Form validation rules for SPL registration
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
        playerPhoto: {
            required: true,
            validate: function(value, field) {
                if (!field.files || field.files.length === 0) {
                    return false;
                }
                const file = field.files[0];
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                const maxSize = 5 * 1024 * 1024; // 5MB

                if (!validTypes.includes(file.type)) {
                    return false;
                }
                if (file.size > maxSize) {
                    return false;
                }
                return true;
            },
            message: 'Please upload a valid image file (JPG, PNG, GIF) under 5MB'
        },
        terms: {
            required: true,
            message: 'You must agree to the SPL terms and conditions'
        },
        availability: {
            required: true,
            message: 'You must confirm your availability for the SPL tournament'
        }
    };

    // Photo upload handling
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image file (JPG, PNG, GIF)');
                photoInput.value = '';
                return;
            }

            if (file.size > maxSize) {
                alert('File size must be under 5MB');
                photoInput.value = '';
                return;
            }

            // Show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                photoPreview.style.display = 'block';
                clearFieldError('playerPhoto');
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove photo functionality
    removePhotoBtn.addEventListener('click', function() {
        photoInput.value = '';
        photoPreview.style.display = 'none';
        previewImage.src = '';
    });

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            if (fieldName !== 'playerPhoto') {
                field.addEventListener('input', () => clearFieldError(fieldName));
            }
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
        if (rule.validate && !rule.validate(value, field)) {
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

        // Handle photo file
        const photoFile = photoInput.files[0];
        let photoFileName = '';
        if (photoFile) {
            // Generate filename based on player name (for future backend implementation)
            const cleanName = playerData.playerName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
            const fileExtension = photoFile.name.split('.').pop();
            photoFileName = `${cleanName}_${Date.now()}.${fileExtension}`;

            // For now, store as base64 in localStorage (in real backend, save file with new name)
            const reader = new FileReader();
            reader.onload = function(e) {
                playerData.photoData = e.target.result;
                playerData.photoFileName = photoFileName;
                processRegistration(playerData);
            };
            reader.readAsDataURL(photoFile);
        } else {
            processRegistration(playerData);
        }
    }

    function processRegistration(playerData) {
        // Check for duplicate phone number
        const existingPlayers = JSON.parse(localStorage.getItem('splPlayers') || '[]');
        const duplicatePlayer = existingPlayers.find(player => player.phone === playerData.phone);

        // Simulate API call (replace with actual API call later)
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = '🏏 Register for SPL';

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
                const registrationId = 'SPL' + Date.now().toString().slice(-6);
                playerData.registrationId = registrationId;
                playerData.registrationDate = new Date().toISOString();

                // Success - Add to registered players
                existingPlayers.push(playerData);
                localStorage.setItem('splPlayers', JSON.stringify(existingPlayers));

                console.log('SPL Player registered:', playerData);

                // Show success message with player details
                document.getElementById('confirmedName').textContent = playerData.playerName;
                document.getElementById('confirmedPosition').textContent = getPositionDisplayName(playerData.position);
                document.getElementById('confirmedPhone').textContent = playerData.phone;
                document.getElementById('registrationId').textContent = registrationId;
                document.getElementById('confirmedPhoto').textContent = playerData.photoFileName || 'Photo uploaded';

                form.style.display = 'none';
                successMessage.style.display = 'block';
            } else {
                // Error
                errorText.textContent = 'SPL Registration failed due to server error. Please try again.';
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
            const existingPlayers = JSON.parse(localStorage.getItem('splPlayers') || '[]');
            const player = existingPlayers.find(p => p.phone === phone);
            if (player) {
                alert(`Found SPL player: ${player.playerName} (${getPositionDisplayName(player.position)})\nUpdate functionality will be available in the next phase!`);
            } else {
                alert('No SPL player found with this phone number. Please check and try again.');
            }
        }
    });

    // Add function to view all registered players (for testing)
    window.viewAllPlayers = function() {
        const players = JSON.parse(localStorage.getItem('splPlayers') || '[]');
        console.log('All registered SPL players:', players);
        if (players.length === 0) {
            alert('No SPL players registered yet!');
        } else {
            let playerList = 'Registered SPL Players:\n\n';
            players.forEach((player, index) => {
                playerList += `${index + 1}. ${player.playerName} (${getPositionDisplayName(player.position)}) - ${player.phone}\n`;
            });
            alert(playerList);
        }
    };

    // Add function to clear all registrations (for testing)
    window.clearAllPlayers = function() {
        if (confirm('Are you sure you want to clear all SPL player registrations? This cannot be undone.')) {
            localStorage.removeItem('splPlayers');
            alert('All SPL player registrations cleared!');
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
