
# twitter-url
A very crude way to get the internal twitter video url
```js
let  {parseUrl, getDetailsConcise} = require("twitter-url");
let {id} = parseUrl("https://twitter.com/LetMeThinkOfAU1/status/1334241608078790659");
let  details = getDetailsConcise(id);

console.log(details.highest_video_url); //https://video.twimg.com/ext_tw_video/1334241558246252544/pu/vid/1280x720/XnFplcd-MwKi4HFw.mp4?tag=10
```

## API

|       |  |
| ----------- | ----------- |
| `parseUrl`    | Returns the video id and user as an object<br>```{id: video_id, user: user}```       |
| `getDetails`| Returns the entire response fetched by the twitter API
| `getDetailsConcise` | Returns a stripped down result with the important details

`getDetails` returns 
```js
{
  globalObjects: {
    tweets: { '0000000000000000000': [Object] },
    users: { '0000000000000000000': [Object] },
    moments: {},
    cards: {},
    places: {},
    media: {},
    broadcasts: {},
    topics: {},
    lists: {}
  },
  timeline: {
    id: 'Conversation-0000000000000000000',
    instructions: [ [Object], [Object] ],
    responseObjects: { feedbackActions: {} }
  }
}
```

`getDetailsConcise` returns
```js
{
  videos: {
    aspect_ratio: [ 16, 9 ],
    duration_millis: 29733,
    variants: [ [Object], [Object], [Object], [Object] ]
  },
  title: 'This is an example',
  highest_video_url: 'https://video.twimg.com/ext_tw_video/0000000000000000000/pu/vid/1280x720/xxxxxxxxxxxxx.mp4?tag=10',
  thumbnail: 'http://pbs.twimg.com/ext_tw_video_thumb/0000000000000000000/pu/img/xxxxxxxxxxxxx.jpg',
  user_name: 'name'
}
```
