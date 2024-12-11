// signIn.js

// Assuming you have users array to simulate a database
let users = [];

// Mock data: You should ideally retrieve this from a secure storage or API
users.push({ email: 'user@example.com', password: 'password123' }); // Example user

// Function to handle form submission
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const emailOrPhone = document.getElementById('emailOrPhone').value;
    const password = document.getElementById('password').value;

    // Check if the user exists with the entered credentials
    const user = users.find(u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password);

    if (user) {
        alert('Sign in successful!'); // Proceed to the next step
        // You can redirect to the main page or user dashboard
        window.location.href = 'index.html'; // Redirect to home page or user dashboard
    } else {
        alert('Invalid email or password!'); // Show error message
    }
});
