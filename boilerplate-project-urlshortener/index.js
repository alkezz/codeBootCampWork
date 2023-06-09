require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { dns } = require("dns")
// Basic Configuration
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let postData = []

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});
let number = 0
app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;
  postData.push({ original_url: url, short_url: number })
  res.send({ original_url: url, short_url: number })
  number = number + 1
})

app.get("/api/shorturl/:url", (req, res) => {
  const dataPoint = postData[Number(req.params.url)]
  return res.redirect(dataPoint.original_url)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
