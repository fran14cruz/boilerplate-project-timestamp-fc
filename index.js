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

// request json object with unix key
app.get("/api/:date?", function(req, res) {
  // date is passed as string '2015-12-25' or '1451001600000'
  // if date is empty, return current date in unix and utc
  const date = req.params.date;
  let unix, utc;

  // check if falsy
  if (!date) {
    unix = new Date().getTime();
    utc = new Date().toUTCString();
  } else {
    // unix = date.includes('-') ? new Date(date).getTime() : Number(date);
    // utc = date.includes('-') ? new Date(date).toUTCString() : new Date(Number(date)).toUTCString();
    // try to parse to Number
    let dateFromNumber = new Date(Number(date)).toString();
    if (dateFromNumber !== 'Invalid Date') {
      unix = new Date(Number(dateFromNumber)).getTime();
      utc = new Date(Number(dateFromNumber)).toUTCString();

      // try to pase from String
      let parsedDate = new Date(date).toString();
    } else if (parsedDate === 'Invalid Date') {
      return res.json({ error: parsedDate });
    } else {
      unix = new Date(date).getTime();
      utc = new Date(date).toUTCString();
    }
  }
  res.json({ unix, utc });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
