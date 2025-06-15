function handleSubmit(event) {
            event.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const phone = document.getElementById('phone').value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value;
            const dob = document.getElementById('dob').value;
            const course = document.getElementById('course').value;
            const terms = document.getElementById('terms').checked;

            // Validate form
            let isValid = true;
            const errors = {
                fullName: '',
                email: '',
                password: '',
                phone: '',
                dob: '',
                course: '',
                terms: ''
            };

            // Validation rules
            if (fullName.length < 3) {
                errors.fullName = 'Name must be at least 3 characters long';
                isValid = false;
            }

            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                errors.email = 'Please enter a valid email address';
                isValid = false;
            }

            if (password.length < 6) {
                errors.password = 'Password must be at least 6 characters long';
                isValid = false;
            }

            if (phone.length < 10) {
                errors.phone = 'Please enter a valid phone number';
                isValid = false;
            }

            if (!dob) {
                errors.dob = 'Please select your date of birth';
                isValid = false;
            }

            if (!course) {
                errors.course = 'Please select a course';
                isValid = false;
            }

            if (!terms) {
                errors.terms = 'You must accept the terms and conditions';
                isValid = false;
            }

            // Display errors
            Object.keys(errors).forEach(key => {
                const errorElement = document.getElementById(`${key}Error`);
                if (errorElement) {
                    errorElement.textContent = errors[key];
                    errorElement.style.display = errors[key] ? 'block' : 'none';
                }
            });

            if (isValid) {
                // Create URL parameters with form data
                const params = new URLSearchParams({
                    fullName,
                    email,
                    phone,
                    gender,
                    dob,
                    course
                });

                // Redirect to details page with the data
                window.location.href = `details.html?${params.toString()}`;
            }

            return false;
        }