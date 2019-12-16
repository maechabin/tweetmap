const Express = require('express');
const app = Express();
const expressWs = require('express-ws')(app);
const Twitter = require('twit');
require('dotenv').config();

const port = process.env.PORT || 3030;

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

function getStream(params) {
  return twitter.stream('statuses/filter', params);
}

app.ws('/stream/:keyword', (client, req) => {
  const params = {
    track: decodeURI(req.params.keyword) || 'twitter',
  };

  console.log(params);

  const stream = getStream(params);

  stream.on('tweet', (tweet: any) => {
    console.log(tweet);
    client.send(JSON.stringify(tweet));
  });

  stream.on('error', (error: any) => {
    throw error;
  });

  client.on('close', () => {
    stream.stop();
    console.log('Stream stopped.');
  });
});

app.get('/stream/:keyword', (req, res) => {
  const params = {
    track: decodeURI(req.params.keyword) || 'twitter',
  };

  const stream = twitter.stream('statuses/filter', params);

  stream.on('tweet', (tweet: any) => {
    console.log(tweet);
    return res.status(200).send(tweet);
  });

  stream.on('error', (error: any) => {
    throw error;
  });
});

app.listen(port, () => console.log(`Hello app listening on port ${port}!`));
