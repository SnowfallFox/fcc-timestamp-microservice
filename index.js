// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get('/api/:date?', (req,res,next) => {
  d = req.params.date
  // if there is no date parameter in URL, get current date/time
  if (!d) {
    d = new Date()
  // if d in a valid number, convert to Date
  } else {
    d = new Date(Number(d))
    if (d.toString() === 'Invalid Date') {
      d = new Date(req.params.date.toString())
    }
  }
  next();
}, (req,res) => {
  // if d is not a valid date
  if (d.toString() === 'Invalid Date') {
    res.json({'error': d.toString()})
  // if d is a valid date
  } else {
    res.json(({'unix':Date.parse(d), 'utc':d.toUTCString()}))
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
