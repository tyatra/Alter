request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    message.send("Surely, master, please wait a moment");
    request({
      url: 'https://safebooru.donmai.us/posts.json?random=true&limit=1&tags=felicia_%28fire_emblem_fates%29',
      json: true
    }, function (err, temp, body) {
      if (!err && body.length > 0 && body[0].file_url) {
        selfie = {
          image: { url: "https://safebooru.donmai.us/" + body[0].file_url },
          description: "Here you go master",
          thumbnail: { url: client.emote.embarassed },
          color: 0xff0000
        }
        message.channel.sendMessage("", { embed: selfie });
      } else {
        message.send("I'm sorry master, the camera is broken");
        console.log(err);
        console.log(body);
      }
    });
  }
}