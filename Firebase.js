import firebase from '@react-native-firebase/app';

let config = {
  apiKey: 'AIzaSyArhtdJzEGatn2Je2fIhoxKJyt-5xb983U',
  authDomain: 'gymple-1233c.firebaseapp.com',
  databaseURL: 'https://gymple-1233c.firebaseio.com',
  projectId: 'gymple-1233c',
  storageBucket: 'gymple-1233c.appspot.com',
  messagingSenderId: '181848220214',
  appId: '1:181848220214:web:0cb125b3e59eaee152ae97',
  measurementId: 'G-WPTHYM5732',
};
firebase.initializeApp(config);

export default firebase;
