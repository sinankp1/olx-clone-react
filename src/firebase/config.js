import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCygTGNvz5VYeYzTzwxbh3U9RMB8ftXqsM",
    authDomain: "olx-clone-80aeb.firebaseapp.com",
    projectId: "olx-clone-80aeb",
    storageBucket: "olx-clone-80aeb.appspot.com",
    messagingSenderId: "641686660353",
    appId: "1:641686660353:web:d84270688bcc107208a700",
    measurementId: "G-0BKEZGVP0K"
  };

export default firebase.initializeApp(firebaseConfig)