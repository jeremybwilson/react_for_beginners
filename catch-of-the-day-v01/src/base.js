import Rebase from "re-base";
import firebase from "firebase";

const fireBaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBQsXN1zNgsfin0muZbKSWDH0CEprSAAQk",
  authDomain: "catch-of-the-day-jeremy-1.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jeremy-1.firebaseio.com",
  projectId: "catch-of-the-day-jeremy-1"
  // storageBucket: "",
  // messagingSenderId: "800929482762",
  // appId: "1:800929482762:web:c9bb32ee6f116dba"
});

const base = Rebase.createClass(fireBaseApp.database());

// this is a named export
export { fireBaseApp }; 

// this is a default export
export default base;