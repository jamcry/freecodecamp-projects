'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer({ dest: __dirname + '/uploads' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// POST /api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if(!file) {
    res.json({
      error: "No file selected!"
    })
  }
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })  
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
