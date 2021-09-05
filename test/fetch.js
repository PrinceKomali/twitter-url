let twurl = require("../index.js");
let {id} = twurl.parseUrl("https://twitter.com/LetMeThinkOfAU1/status/1334241608078790659");
let details = twurl.getDetailsConcise(id);

console.log(twurl.getDetailsConcise(id).highest_video_url); //https://video.twimg.com/ext_tw_video/1334241558246252544/pu/vid/1280x720/XnFplcd-MwKi4HFw.mp4?tag=10