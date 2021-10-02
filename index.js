const sfetch = require("sync-fetch");
let twurl = {
	parseUrl: function(URL) {
		URL = URL.split("?")[0];
		let video_user = URL.split("/")[3];
		let video_id = URL.split("/")[5];
		return {
			id: video_id,
			user: video_user
		};
	},
	_getCredentials: function(id) {
		let token = "Bearer " + sfetch("https://ma-0.twimg.com/twitter-assets/responsive-web/web/ltr/main.5b6bf12947d7a3a6.js").text().split("BEARER_TOKEN:\"")[1].split("\"")[0];
		let data = sfetch("https://api.twitter.com/1.1/guest/activate.json", {
			method: "POST",
			headers: {
				"Authorization": token
			}
		}).json();
		return [data.guest_token, token];
	},
	getDetails: function(id) {
		let gtoken = twurl._getCredentials(id);
		let data = sfetch("https://api.twitter.com/2/timeline/conversation/" + id + ".json", {
			headers: {
				"Authorization": gtoken[1],
				"x-guest-token": gtoken[0]
			}
		}).json();
		return data;
	},
	getDetailsConcise: function(id) {
		let data = twurl.getDetails(id);
		let videos = data.globalObjects.tweets[id].extended_entities.media[0].video_info;
        let highest_url = videos.variants.sort((a,b)=>{ if(!b.bitrate) return -1; return Number(a.url.split("/")[7].split("x")[0]) > Number(b.url.split("/")[7].split("x")[0]) ? -1 : 1; })[0].url;
		let title = data.globalObjects.tweets[id].text;
		let thumbnail = data.globalObjects.tweets[id].entities.media[0].media_url;
		let _ustr = data.globalObjects.tweets[id].user_id_str;
		let username = data.globalObjects.users[_ustr].name;
		return {
			"videos": videos,
            "highest_video_url": highest_url,
			"title": title,
			"thumbnail": thumbnail,
			"user_name": username
		};
	}
};
module.exports = twurl;
