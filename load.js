const fs = require('fs');
module.exports = (client, callback) => {
  let commandList = fs.readdirSync('./commands/');
  client.commandRegex = [];
  client.commands = {};

  client.emote = { 
    "default": "http://puu.sh/tP8sf/cf6d531885.jpg", 
    "serious": 
    "http://puu.sh/tP8qt/549ad95f25.jpg", 
    "embarassed": "http://puu.sh/tP8y4/76d4aaccff.jpg", 
    "flustered": "http://puu.sh/tP8x9/b8db9592d2.jpg", 
    "smile": "http://puu.sh/tP8ug/0daf7317c4.jpg" 
  }

  loadTime = Date.now();
  for (i = 0; i < commandList.length; i++) {
    let item = commandList[i];
    if (item.match(/\.js$/)) {
      taken = Date.now() - loadTime;
      loadTime += taken;
      delete require.cache[require.resolve(`./commands/${item}`)];
      client.commands[item.slice(0, -3).replace(/-/g, ' ')] = require(`./commands/${item}`);
      client.commands[item.slice(0, -3).replace(/-/g, ' ')].count = 0;
      client.commandRegex.push(`\\b${item.slice(0, -3).replace(/-/g, ' ')}\\b`);
      console.log(`Command ${item.slice(0, -3)} loaded. Took ${taken}ms`);
    }
  }
  client.commandRegex = new RegExp(client.commandRegex.join('|'));
  callback();
}