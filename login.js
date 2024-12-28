// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase configuration (use your own Firebase project config here)
const firebaseConfig = {
    apiKey: "AIzaSyAjMwFpVC-_m7mxIyk9zJrNT-GfEh6PpVY",
    authDomain: "apmc-price-pulse-15635.firebaseapp.com",
    projectId: "apmc-price-pulse-15635",
    storageBucket: "apmc-price-pulse-15635.firebasestorage.app",
    messagingSenderId: "253862366127",
    appId: "1:253862366127:web:0200fdccccc790640e7d5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Get the form element
    const loginForm = document.querySelector('.login-form');
    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }

    // Add event listener to the form submit
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Get the form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate form fields
        if (!email || !password) {
            alert('Both email and password are required.');
            return;
        }

        try {
            // Attempt to sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if the user's email is verified
            if (!user.emailVerified) {
                alert('Please verify your email before logging in.');
                return;
            }

            // Successful login
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to the dashboard or home page

        } catch (error) {
            handleLoginError(error);
        }
    });
});

// Function to handle login errors
function handleLoginError(error) {
    console.error('Error during login:', error);

    switch (error.code) {
        case 'auth/invalid-email':
            alert('Invalid email format.');
            break;
        case 'auth/user-not-found':
            alert('No user found with this email. Please check your email or sign up.');
            break;
        case 'auth/wrong-password':
            alert('Incorrect password. Please try again.');
            break;
        case 'auth/network-request-failed':
            alert('Network error. Please check your connection and try again.');
            break;
        default:
            alert('An error occurred. Please try again later.');
    }
}
