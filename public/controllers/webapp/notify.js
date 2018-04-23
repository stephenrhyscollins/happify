var express = require('express');
var app = express();
const router = app;
var Subscription = require('../../models/subscription');

var webPush = require("web-push");
var atob = require('atob');
var bodyParser = require('body-parser');
var util = require('util');
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

if(!process.env.MODE){
  credentials = require('../../config/credentials.js');
}else{
  credentials = {
    MONGODB : {
      dbURI :"mongodb://webserver:" +  process.env.MONGODB_URI + ".mlab.com:29939/happify"
    },
    GOOGLE : {
      clientID: (process.env.GOOGLE_CLIENTID + ".apps.googleusercontent.com"),
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL : process.env.GOOGLE_CALLBACKURI || '/auth/google/redirect'
    }
  }
}

webPush.setVapidDetails(
  credentials.VAPID.subject,
  credentials.VAPID.public,
  credentials.VAPID.private
)

router.get('/', function(req, res) {
   if(false) {
       console.log("Missing or incorrect auth-secret header. Rejecting request.");
       return res.sendStatus(401);
   }

   let message = req.query.message || `Willy Wonka's chocolate is the best!`;
   let clickTarget = req.query.clickTarget || `http://www.favoritemedium.com`;
   let title = req.query.title || `Push notification received!`;

   Subscription.find({}).then(function(subscriptions) {
     subscriptions.forEach(function(subscription){
       console.log(subscription);
       //Can be anything you want. No specific structure necessary.
       let payload = JSON.stringify({message : message, clickTarget: clickTarget, title: title});

       webPush.sendNotification(subscription, payload, {}).then((response) =>{
           console.log("Status : "+util.inspect(response.statusCode));
           console.log("Headers : "+JSON.stringify(response.headers));
           console.log("Body : "+JSON.stringify(response.body));
       }).catch((error) =>{
           console.log("Status : "+util.inspect(error.statusCode));
           console.log("Headers : "+JSON.stringify(error.headers));
           console.log("Body : "+JSON.stringify(error.body));
       });
   });
 });

   res.send('Notification sent!');
});



app.post('/subscribe', function(req, res) {
  console.log(req.body.notificationEndPoint);
    new Subscription ({
        deviceId: req.body.notificationEndPoint,
        p256dh: req.body.publicKey,
        auth: req.body.auth
    }).save();
});

router.post('/unsubscribe', function (req, res) {
  /*  let endpoint = req.body['notificationEndPoint'];

    subscribers = subscribers.filter(subscriber => { endpoint == subscriber.endpoint });

    res.send('Subscription removed!');
    */
});


module.exports = router;
