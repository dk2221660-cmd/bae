const fs = require("fs");
module.exports.config = {
  name: "welcome",
    version: "2.1.1",
  hasPermssion: 0,
  credits: "PRINCE RAJPUT", 
  description: "Just Respond",
  commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = async ({ api, event, Users, Currencies, args, utils, client, global }) => {
  var name = await Users.getNameUser(event.senderID);
  var { threadID, messageID } = event;
  let react = event.body.toLowerCase();
  if(react.includes("welcome") ||
     react.includes("Welcome") ||
     react.includes("wlcm") ||
react.includes("welcoMe")) {
    var msg = {
        body: `★━━━━━━━━━━━━━★😍𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐡𝐨 𝐠𝐲𝐚 𝐦𝐞𝐫𝐢 𝐣𝐚𝐚𝐧😍★━━━━━━━━━━━━━★`,attachment: fs.createReadStream(__dirname + `/noprefix/welcome.gif`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("😈", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = async ({ api, event, Currencies, args, utils, client, global }) => {

  }
