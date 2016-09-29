# Notifications
Small node.js application to send notifications to attendees through OneSignal, Twilio, and a Web App

This works in conjunction with the HackMIT applications service, using its authentication to log in and get phone numbers to send texts to.

##Setup
###Create and fill in config.json
```
cp config.example.json config.json
```
Here you add credentials for OneSignal and Twilio as well as the port the app should run on
###Install Things
```
npm install
bower install
```
Make sure you have npm, bower, and gulp installed globally first
###Run it!
```
gulp server
```
