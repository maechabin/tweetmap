const Express = require('express');
const app = Express();
const expressWs = require('express-ws')(app);
const Twitter = require('twit');
require('dotenv').config();

interface Params {
  track: string;
}

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

class TwitterRepository {
  getStream(params: Params) {
    return twitter.stream('statuses/filter', params);
  }
}

const twitterRepository = new TwitterRepository();
const port = process.env.PORT || 3030;

function getStream(params: Params) {
  return twitterRepository.getStream(params);
}

app.ws('/stream/:keyword', (client, req) => {
  let tweets = [];
  let timer;
  const params = {
    track: decodeURI(req.params.keyword) || 'twitter',
  };

  const stream = getStream(params);

  stream.on('tweet', (tweet: any) => {
    console.log('Stream started.');
    tweets = [...tweets, tweet];

    if (!timer) {
      timer = setInterval(() => {
        client.send(JSON.stringify(tweets));
        tweets = [];
      }, 5000);
    }
  });

  stream.on('error', (error: any) => {
    throw error;
  });

  client.on('close', () => {
    stream.stop();
    clearInterval(timer);
    tweets = [];
    console.log('Stream stopped.');
  });
});

app.get('/stream/:keyword', (req, res) => {
  const params = {
    track: decodeURI(req.params.keyword) || 'twitter',
  };

  const stream = twitterRepository.getStream(params);

  stream.on('tweet', (tweet: any) => {
    return res.status(200).send(tweet);
  });

  stream.on('error', (error: any) => {
    throw error;
  });
});

app.listen(port, () => console.log(`Hello app listening on port ${port}!`));
