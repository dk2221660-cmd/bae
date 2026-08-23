const fs = require("fs");
module.exports.config = {
	name: "khoon",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "🙂",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("@Khoon Kar Dungi")==0 ||  event.body.indexOf("khoon")==0) {
		var msg = {
				body: "Mujhe mat bulao Khoon kar dungi tera🤨🤨🤨",
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("🤨", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
