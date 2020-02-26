import Rebase from "re-base";
import firebase from "firebase";

// Initialize default app
// Retrieve your own options values by adding a web app on
// https://console.firebase.google.com

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQsXN1zNgsfin0muZbKSWDH0CEprSAAQk",                  // Auth / General Use
  authDomain: "catch-of-the-day-jeremy-1.firebaseapp.com",            // Auth with popup/redirect
  databaseURL: "https://catch-of-the-day-jeremy-1.firebaseio.com",    // Realtime Database
  projectId: "catch-of-the-day-jeremy-1"
};

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB9gLOnr7OKUOhORIKOuoSczXN3ThXwkxc",                      // Auth / General Use
//   authDomain: "catch-of-the-day-jeremy-1fcdf.firebaseapp.com",            // Auth with popup/redirect
//   databaseURL: "https://catch-of-the-day-jeremy-1fcdf.firebaseio.com",    // Realtime Database
//   projectId: "catch-of-the-day-jeremy-1fcdf"
// };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
