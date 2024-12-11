document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signUpForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            const emailOrPhone = document.getElementById('email_or_phone').value;
            const password = document.getElementById('password').value;

            if (!emailOrPhone || !password) {
                alert('Please fill out all fields.');
                return;
            }

            // Optionally send data via AJAX or handle the form submission
            alert(`Email/Phone: ${emailOrPhone}\nPassword: ${password}`);
            form.submit(); // Submit the form if needed
        });
    } else {
        console.error('Sign-up form not found.');
    }
});
