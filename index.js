const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpush = require('web-push');
const PORT = process.env.PORT || 3000;
var subscription = null;

const app = express();

const webPushPublicKey = "BP2QcLHZ6Enm6rYIIOS0ljex2106s8Zy822duCMVYz_3aV8iE2z0fYrIG5Y6zaE7DHH67Ti11bfFFq3AAoDWkUY";
const webPushPrivateKey = "uA5YbSoYW8xb974mqgHeV12laZj9belCkfiJtWxBLnQ";
webpush.setVapidDetails("http://localhost:3000/contact", webPushPublicKey, webPushPrivateKey);

// app.use(bodyParser.urlencoded({
//     extended: false
// }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "client")))

app.post("/subscribe", (req, res, err) => {
    // if (err) throw (err);
    subscription = req.body;
    var payload = JSON.stringify({
        title: "Push notification with Service Worker",
        body: "Notification body",
        icon: "./static/notification_bell.png"
    })
    res.status(201).json({})

    webpush.sendNotification(subscription, payload)
        .then((result) => {
            console.log('Notification sent', result)
        }).catch((e) => {
            console.log('Err on sendNotification', e)
        })

})

app.listen(PORT, () => {
    console.log(`APP listen to ${PORT}`)
})