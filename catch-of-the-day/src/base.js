import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBQsXN1zNgsfin0muZbKSWDH0CEprSAAQk",
  authDomain: "catch-of-the-day-jeremy-1.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-jeremy-1.firebaseio.com",
  projectId: "catch-of-the-day-jeremy-1"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;