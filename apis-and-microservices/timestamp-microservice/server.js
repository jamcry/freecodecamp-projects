// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  const { date_string } = req.params;
  let parsedDate = null;
  if(date_string) {
    // Parse date string to integer if it is not in date format
    const dateParams = !date_string.includes("-") ? parseInt(date_string) : date_string;
    parsedDate = new Date(dateParams);
  } else {
    parsedDate = new Date();
  }
  
  // Return error message if the input is invalid
  if(parsedDate.toUTCString() === "Invalid Date")
    res.json({error: "Invalid Date"});
  
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});