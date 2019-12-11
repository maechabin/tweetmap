const express = require('express');
const Twit = require('twit');
require('dotenv').config();

const port = process.env.PORT || 3030;
const app = express();

app.get('/stream/:keyword', (req, res) => {
  const twitter = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true,
  });

  const params = {
    track: decodeURI(req.params.keyword) || 'twitter',
  };
  const stream = twitter.stream('statuses/filter', params);

  stream.on('tweet', tweet => console.log(tweet));
});

app.listen(port, () => console.log(`Hello app listening on port ${port}!`));
