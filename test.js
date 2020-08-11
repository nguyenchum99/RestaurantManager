// const firebase = require('firebase');

// const firebaseConfig = {
//   apiKey: 'AIzaSyAnP2KTy7qPP3UIPs0kt4dunzL1PhGKsmg',
//   authDomain: 'restaurantmanager-1264b.firebaseapp.com',
//   databaseURL: 'https://restaurantmanager-1264b.firebaseio.com',
//   projectId: 'restaurantmanager-1264b',
//   storageBucket: 'restaurantmanager-1264b.appspot.com',
//   messagingSenderId: '509484123254',
//   appId: '1:509484123254:web:6fcdea809ea9ab3c730b57',
//   measurementId: 'G-ZK83LH5KD6',
// };

// firebase.initializeApp(firebaseConfig);
// firebase
//   .database()
//   .ref('Foods')
//   .on('value', (snapshot) => {
//     const data = snapshot.val();
//     const result = Object.keys(data).map((key) => {
//       return {
//         ...data[key],
//         id: key,
//       };
//     });
//     console.log(result);
//   });

// const orders = {
//   listOrder: ['item1', 'item2'],
//   table: 'xyz',
//   timeOrder: new Date().toString(),
// };

// firebase.database().ref('Orders').push(orders);

// var a;
// /**
//  * Recommend
//  * Reassigned: let,
//  * No reassigned: const
//  */

for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log('dcm javascript');
    console.log(i);
  }, 1000);
}


callback