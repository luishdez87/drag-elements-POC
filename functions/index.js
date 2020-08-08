const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendNotification = functions.https.onRequest((request, response) => {
  const tokens = request.body.tokens;
  
  const payload = {
    notification: {
      title: 'New file added',
      body: 'A new JSON file was added',
      icon: 'default'
    },
    data: {
      url: request.body.url
    },
    tokens
  }
  admin.messaging().sendMulticast(payload)
    .then((res) => {
      response.send(res);
      return res;
    })
    .catch((e) => {console.log(e)});
});
