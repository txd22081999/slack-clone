import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyATGuZP9vCa7oLPReYzASqP6ah8GKsOKXw',
  authDomain: 'slack-clone-56d3a.firebaseapp.com',
  databaseURL: 'https://slack-clone-56d3a.firebaseio.com',
  projectId: 'slack-clone-56d3a',
  storageBucket: 'slack-clone-56d3a.appspot.com',
  messagingSenderId: '19731988299',
  appId: '1:19731988299:web:a08abe97f3e3bada11f2ce',
  measurementId: 'G-CSEVK8MMF1'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
