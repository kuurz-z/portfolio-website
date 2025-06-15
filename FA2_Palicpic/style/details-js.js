// Get the registration details from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const details = {
            fullName: urlParams.get('fullName'),
            email: urlParams.get('email'),
            phone: urlParams.get('phone'),
            gender: urlParams.get('gender'),
            dob: urlParams.get('dob'),
            course: urlParams.get('course')
        };

        // Display the details
        const detailsContainer = document.getElementById('detailsContainer');
        const detailItems = [
            { label: 'Full Name', value: details.fullName },
            { label: 'Email', value: details.email },
            { label: 'Phone Number', value: details.phone },
            { label: 'Gender', value: details.gender },
            { label: 'Date of Birth', value: details.dob },
            { label: 'Course/Program', value: details.course }
        ];

        detailItems.forEach(item => {
            const detailDiv = document.createElement('div');
            detailDiv.className = 'detail-item';
            detailDiv.innerHTML = `
                <div class="detail-label">${item.label}</div>
                <div class="detail-value">${item.value}</div>
            `;
            detailsContainer.appendChild(detailDiv);
        });