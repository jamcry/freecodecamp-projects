'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
var { isValidUrl } = require('./lib/isValidUrl');

var cors = require('cors');
var shortid = require('shortid');

var dotenv = require('dotenv');
dotenv.config();

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/shorturl/:short_url", function (req, res) {
  const {short_url} = req.params;
  LinkMap.findOne({short_url}, function (err, doc) {
    if(err) console.log(err.message);
    if(doc) {
      const {original_url} = doc;
      res.redirect(original_url);
    } else {
      res.send("No url found with this code!");
    }
  })
})



/** this project needs a db !! **/ 
mongoose.connect(
  process.env.MONGOLAB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log("Database connection successful!");
    }
  }
);

var linkMapSchema = new Schema({
  original_url: String,
  short_url: String,
  date: { type: Date, default: Date.now }
});

// NOTE: mongoose will automatically parse LinkMap to linkmaps as collection name 
var LinkMap = mongoose.model('LinkMap', linkMapSchema);

app.post("/api/shorturl/new", function (req, res) {
  const {url} = req.body;
  // First, check if the given url string is valid
  if(!isValidUrl(url)) {
    console.log("not valid")
    res.json({error: "invalid URL"});
    return;
  }
  
  // Check if the url already exists in database 
  LinkMap.findOne({original_url: url}, function (err, doc) {
    if(err) console.log(err.message);
    if(doc) {
      console.log("Found link in db. Returning existing data...");
      console.log({doc})
      res.json(doc);
    } else {
      console.log("Url not found in db. Creating new document...")
      var newLink = new LinkMap({
        original_url: url,
        short_url: shortid.generate()
      });
      newLink.save(err => { if(err) console.log(err.message) })
      res.json(newLink);    
    }
  })
})
  
app.listen(port, function () {
  console.log('Node.js listening on ' + port);
});