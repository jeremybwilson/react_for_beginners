import Rebase from 're-base';
import firebase from "firebase";

// Initialize default app
// Retrieve your own options values by adding a web app on
// https://console.firebase.google.com

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQsXN1zNgsfin0muZbKSWDH0CEprSAAQk",
  authDomain: "catch-of-the-day-jeremy-1.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jeremy-1.firebaseio.com",
  projectId: "catch-of-the-day-jeremy-1",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
