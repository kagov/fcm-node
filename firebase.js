// get the firebase admin sdk
var admin = require('firebase-admin');
var serviceAccount = require('./key.json');

module.exports.sendNotification = function(notificationData) {
    var payload = {
        data: {
          score: "850",
          time: "2:45"
        },
        notification: {
          title: notificationData.title,
          body: notificationData.body
        }
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'your_db_url'
      });

      /**
       * in case you do not have access to the key file as a whole then you can
       * admin.initializeApp({
            credential: admin.credential.cert({
            projectId: 'your_project_id',
            clientEmail: 'your_client_email',
            privateKey: 'your_private_key_from_the_json_file'
            }),
            databaseURL: 'your_db_url'
        });
        **/ 
      
        // the fcm token can also be a list of tokens 
      admin.messaging().sendToDevice(notificationData.fcmToken, payload).then(resolve =>{
        console.log('message sent successfully');
      }).catch(reject => {
        console.log('Error in push notification ', reject);
      });

}