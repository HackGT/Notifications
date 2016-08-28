// Notication Configs
var notificationID = 0;

var notificationOptions = []

// Notification Functions
chrome.notifications.create(
    'NotifyGT',{   
    type: 'basic', 
    iconUrl: "res/favicon.png", 
    title: "This is a notification", 
    message: "hello there!" 
    }, function() {} 
);

function initNotification() {

}

function initNotificationCallback() {

}

// Notification Handlers
function notificationClosed() {}
function notificationClicked() {}


// Browser Action Related
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: "https://hackgt.com/" });
});