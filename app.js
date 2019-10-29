const runFCM = true

if (runFCM) {
  const admin = require('firebase-admin')
  const serviceAccountData = {
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "-----BEGIN PRIVATE KEY-----xxx-----END PRIVATE KEY-----\n",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": ""
  }

  const fcm = admin.initializeApp({
    credential: admin.credential.cert(serviceAccountData),
    databaseURL: 'https://name-12345.firebaseio.com'
  })

  const fcmConnections = fcm.messaging() // FCM with Firebase Admin

  fcmConnections.send({
    apns: {
      payload: {
        aps: {
          alert: {
            title: 'I am a title \u270C',
            body: 'I am the body of this notification. I am a little longer.',
          },
          badge: 2,
          sound: 'ping.aiff'
        }
      }
    },
    token: 'the FCM token looks like _____:_________________________'
  })
    .then(response => {
      console.log('Successfully sent message:', JSON.stringify(response, null, 6))
    })
    .catch(error => {
      console.log('FCM Error: result of sender: ', JSON.stringify(error, null, 6))
    })


} else {
  const apn = require('apn')
// Set up apn with the APNs Auth Key
  const apnProvider = new apn.Provider({
    token: {
      key: './apns.p8', // Path to the key p8 file
      keyId: 'xxxx', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
      teamId: 'xxxxxxx' // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
    },
    production: false // Set to true if sending a notification to a production iOS app
  })

// Enter the device token from the Xcode console
  const deviceToken = 'xxxxx'

// Prepare a new notification
  const notification = new apn.Notification()

// Specify your iOS app's Bundle ID (accessible within the project editor)
  notification.topic = 'com.___________'

// Set expiration to 1 hour from now (in case device is offline)
  notification.expiry = Math.floor(Date.now() / 1000) + 3600

// Set app badge indicator
  notification.badge = 2

// Play ping.aiff sound when the notification is received
  notification.sound = 'ping.aiff'

// Display the following message (the actual notification text, supports emoji)
  notification.title = 'I am a title \u270C'
  notification.body = 'I am the body of this notification. I am a little longer.'

// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
// notification.payload = { id: 12345 }

// Actually send the notification
  apnProvider.send(notification, deviceToken)
    .then(result => {
      console.log('response: ', JSON.stringify(result, null, 6))
    })
    .catch(err => {
      console.log('response: ', JSON.stringify(err, null, 6))
    })
}