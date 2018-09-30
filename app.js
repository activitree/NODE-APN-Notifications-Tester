var apn = require('apn')

// Set up apn with the APNs Auth Key
var apnProvider = new apn.Provider({
  token: {
    key: 'apns.p8', // Path to the key p8 file
    keyId: 'xxxxxxxxx', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
    teamId: 'yyyyyyyy' // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
  },
  production: false // Set to true if sending a notification to a production iOS app
})

// Enter the device token from the Xcode console
const deviceToken = 'YOUR GENERATED DEVICE TOKEN. THIS REPO DOES NOT GENERATE TOKENS.'

// Prepare a new notification
const notification = new apn.Notification()

// Specify your iOS app's Bundle ID (accessible within the project editor)
notification.topic = 'com.bundle.name'

// Set expiration to 1 hour from now (in case device is offline)
notification.expiry = Math.floor(Date.now() / 1000) + 3600

// Set app badge indicator
notification.badge = 2

// Play ping.aiff sound when the notification is received
notification.sound = 'ping.aiff'

// Display the following message (the actual notification text, supports emoji)
notification.title = 'I am a title \u270C'
notification.body = 'I am the body of this notification. I am a little longer so that I can see how it looks.'

// Send any extra payload data with the notification which will be accessible to your app in didReceiveRemoteNotification
// notification.payload = { id: 12345 }

// Actually send the notification
apnProvider.send(notification, deviceToken).then(result => {
  // Check the result for any failed devices
  console.log('response: ', JSON.stringify(result, null, 4))
})
