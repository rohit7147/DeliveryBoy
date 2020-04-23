import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBpuGigdN61FrhOduAPs5bB_trR7_1mdQ0",
  authDomain: "deliveryboy-8cd22.firebaseapp.com",
  databaseURL: "https://deliveryboy-8cd22.firebaseio.com",
  projectId: "deliveryboy1-8cd22",
  storageBucket: "deliveryboy-8cd22.appspot.com",
  messagingSenderId: "778407923162",
  appId: "1:778407923162:web:6a9b7d3017d602a4eac4e3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;