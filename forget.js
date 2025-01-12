import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth,sendPasswordResetEmail,signInWithEmailAndPassword,confirmPasswordReset} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjMwFpVC-_m7mxIyk9zJrNT-GfEh6PpVY",
    authDomain: "apmc-price-pulse-15635.firebaseapp.com",
    projectId: "apmc-price-pulse-15635",
    storageBucket: "apmc-price-pulse-15635.firebasestorage.app",
    messagingSenderId: "253862366127",
    appId: "1:253862366127:web:0200fdccccc790640e7d5a"
};
// Initialize Firebase and Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector('#resetPasswordForm').addEventListener('submit',async function(events) {
    events.preventDefault();
    const email=document.getElementById('email').value;
    const newPassword=document.getElementById('newPassword').value;
    const confirmPassword=document.getElementById('confirmPassword').value;
if(newPassword!=confirmPassword){
    alert("Password are not matched")
}

try{
    await sendPasswordResetEmail(auth,email);
    alert("A passowrd reset link is sent to your gmail.Please verify that");
    window.location.href = 'login.html';
}catch (error) {
    document.getElementById("error-message").textContent = error.message;
    console.error("Error sending password reset email:", error);
  }
});
