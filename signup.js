// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { 
    getFirestore, 
    setDoc, 
    doc, 
    collection, 
    query, 
    where, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
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
const database = getFirestore(app);

// Handle form submission
document.querySelector('#signup-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validate input fields
    if (!username || !email || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        // Check if username or email already exists in Firestore
        const usersRef = collection(database, 'users');
        const usernameQuery = query(usersRef, where('username', '==', username));
        const emailQuery = query(usersRef, where('email', '==', email));

        const usernameSnapshot = await getDocs(usernameQuery);
        const emailSnapshot = await getDocs(emailQuery);

        if (!usernameSnapshot.empty) {
            alert('Username already exists. Please choose a different one.');
            return;
        }

        if (!emailSnapshot.empty) {
            alert('Email already exists. Please use a different email.');
            return;
        }

        // Create a new user using Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);
        alert('Registration successful! Please verify your email to activate your account.');

        // Save user data to Firestore
        await setDoc(doc(database, 'users', user.uid), {
            username: username,
            email: email,
            createdAt: new Date().toISOString(),
        });

        // Redirect to the login page
        window.location.href = 'login.html';
    } catch (error) {
        handleFirebaseError(error);
    }
});

// Function to handle Firebase errors
function handleFirebaseError(error) {
    console.error('Error during registration:', error);

    switch (error.code) {
        case 'auth/email-already-in-use':
            alert('This email is already in use. Please use a different email.');
            break;
        case 'auth/weak-password':
            alert('Password is too weak. Please use at least 6 characters.');
            break;
        case 'auth/network-request-failed':
            alert('Network error. Please check your connection and try again.');
            break;
        default:
            alert('An error occurred. Please try again later.');
    }
}
