// Registration form functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const submitBtn = form.querySelector('.submit-btn');

    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must be at least 2 characters and contain only letters'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must be at least 2 characters and contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
        },
        confirmPassword: {
            required: true,
            matchField: 'password',
            message: 'Passwords do not match'
        },
        dateOfBirth: {
            required: true,
            validate: function(value) {
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                return age >= 13 && age <= 120;
            },
            message: 'You must be between 13 and 120 years old'
        },
        gender: {
            required: true,
            message: 'Please select your gender'
        },
        terms: {
            required: true,
            message: 'You must agree to the terms and conditions'
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
        submitBtn.textContent = 'Registering...';

        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        // Collect form data
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        
        // Remove confirm password from data
        delete userData.confirmPassword;

        // Simulate API call (replace with actual API call later)
        setTimeout(() => {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Register';

            // Simulate success (90% success rate for demo)
            if (Math.random() > 0.1) {
                // Success
                console.log('User registered:', userData);
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Store user data in localStorage for demo purposes
                localStorage.setItem('registeredUser', JSON.stringify(userData));
            } else {
                // Error
                errorText.textContent = 'Registration failed. Please try again.';
                errorMessage.style.display = 'block';
            }
        }, 2000);
    }

    // Login link functionality (placeholder)
    document.getElementById('loginLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Login functionality will be implemented in the next phase!');
    });
});

// Utility functions
function formatPhoneNumber(input) {
    // Simple phone number formatting
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    input.value = value;
}

// Add phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});
