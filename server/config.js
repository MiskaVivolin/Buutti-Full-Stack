const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDm__bcqi2_OgjBZRChOTaRDO4tQXiMdFE",
  authDomain: "buutti-books.firebaseapp.com",
  projectId: "buutti-books",
  storageBucket: "buutti-books.appspot.com",
  messagingSenderId: "191677497649",
  appId: "1:191677497649:web:823401561988b6847df010"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const book = db.collection("books");

module.exports = book;