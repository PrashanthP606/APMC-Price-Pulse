// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword } from "firebase/auth" ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-Wc_0sRkrxS1xsHk7jSWZAmFC4sWgUjk",
  authDomain: "apmc-price-pulse.firebaseapp.com",
  projectId: "apmc-price-pulse",
  storageBucket: "apmc-price-pulse.firebasestorage.app",
  messagingSenderId: "324321496279",
  appId: "1:324321496279:web:ff84205b4be8d6aedab492"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//inputs
const email=document.getElementById('email').value;
const password=document.getElementById('password').value;

//submitbutton
const submit=document.getElementById('submit');
submit.addEventListener("click",function(event){
  event.preventDefault();
  alert(5);
})