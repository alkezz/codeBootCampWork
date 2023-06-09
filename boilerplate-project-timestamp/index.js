// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  const inputDate = req.params.date;
  let checkDate;

  if (!inputDate) {
    checkDate = new Date();
  } else if (/^\d+$/.test(inputDate)) {
    const timestamp = parseInt(inputDate, 10);
    checkDate = new Date(timestamp);
  } else {
    checkDate = new Date(inputDate);
  }

  if (checkDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({ unix: checkDate.getTime(), utc: checkDate.toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
