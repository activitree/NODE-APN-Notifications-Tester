# NODE-APN-Notifications-Tester

<a href="https://www.repostatus.org/#active"><img src="https://www.repostatus.org/badges/latest/active.svg" alt="Project Status: Active – The project has reached a stable, usable state and is being actively developed." /></a>

Test APN and FCM (IOS) notifications and configurations.
For APN, the certificate will be provided at this code level. Just add the file and import it in app.js.
For FCM, the P8 Apple certificate stays with your Goole Project IOS App. With FCM if your token was generated with a development Provision profile, expect it to work on a development app with no issues.

Problem solved: test whether an IOS device token is "development" or "production" and understand if the token is an APN token or FCM generated.

In Cordova when a push plugin like https://github.com/phonegap/phonegap-plugin-push is used, it is sometimes unclear (for someone new in the business) whether the APN or the FCS is being used for generating a decive token. At the time of this writing, that Cordova plugin doesn't have an option to set which platform is to be used to genereate the token so most of the times, if a GoogleService-Info.plist is used in the project and the APN settings are also completed the tokens may come uncontrolably from either of the platforms.

**An IOS FCM token should look like:** "eyOzOo4cptE:APA91bGzs9xXuOkjJsaPp0W4Zp9LrVoP3BQVZJN4oUe84zHYzw84QpgUki23B01C0FgMFK5NkS5CTD_7-M7NDTWJd6Pse7EBM9sJP68med4AhU45olq4NLZJNpjvVQz0R6g0YUD2yBBF"

**An APN token should look like:** "229aeff9aef7d2f8b3a03cc2b1018b042beb494f5f2da3597fd1000cc10e760a" (Hexa)

```
var apnProvider = new apn.Provider({
  token: {
    key: 'apns.p8', // Path to the key p8 file
    keyId: 'xxxxxxxx', // The Key ID of the p8 file (available at https://developer.apple.com/account/ios/certificate/key)
    teamId: 'yyyyyyyy' // The Team ID of your Apple Developer Account (available at https://developer.apple.com/account/#/membership/)
  },
  production: false // Set to true to test production, false for development tokens. This affects the gateway used for sending.
```

Credits: https://eladnava.com/send-push-notifications-to-ios-devices-using-xcode-8-and-swift-3/
