const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpush = require('web-push');

const port = 4000;
const publicVapidKey = 'BNK3SAHxzZeNn9UrGmMTj5hgEKN9Tltc2CVTyVWHf_bh-yAHHo3FUCeK_TJpS1z8u_FjLnqITYEvub-9h7fBgUc';
const privateVapidKey = '07DGmrcEFhL9oEY5iUfk3e9z-xt7g29RhCeHWYO4w-M';

var app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());


webpush.setVapidDetails('mailto:mithi.rocks123@gmail.com',publicVapidKey,privateVapidKey);

app.post('/notification',(req,res) => {

  const subs = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({title:'Push Mithilesh'});

  webpush.sendNotification(subs,payload).catch(err => console.error(err));
})

app.listen(port,() => {
  console.log(`Server listening on port ${port}`);
})
