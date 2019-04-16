var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

const users = require('./routes/users');

var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT ||3001;
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://shrinivas29:Shrinivas@123@cluster0-7qn3c.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
 
  // perform actions on the collection object
  client.close();
  console.log('database connection established')
});

// mongoose.connect('mongodb+srv://shrinivas29:<password>@cluster0-p8ebb.mongodb.net/test?retryWrites=true', function (err) {
//     if (err) {
//         console.error(err)
//         process.exit(1);
        
//     }

//     console.log('DB Connection Established');
// })

app.get('/ping', function (req, resp) {
    resp.status(200).send('pong').end()
})
app.use('/users', users)

app.listen(port, function () {
    console.log('listening to your port', port);
})
