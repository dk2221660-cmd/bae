//@Prem-babu3608
////////////////////////////////////////////////////////
/////// WARNING => JO CREDIT NAME CHANGE KREGA USKA ID BAN KAR DIYA JAYEGA + THIS BOT IS MADE BT PREM BABU
const fs = require("fs");
module.exports.config = {
	name: "golgappe",
    version: "1.1.1",
	hasPermssion: 0,
	credits: "PREM BABU", ////////@prem-babu3608
	description: "THIS BOT IS MR PREM SHARMA",
	commandCategory: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("golgappe") ||
     react.includes("Golgappa") || react.includes("goLgAppe") || react.includes("golGappe") ||
react.includes("Golgape") ||
react.includes("golgappE")) {
		var msg = {
				body: `★━━━━━━━━━━━━━★🌶️𝐊𝐡𝐚 𝐋𝐨 𝐌𝐞𝐫𝐢 𝐉𝐚𝐚𝐧🌶️ ★━━━━━━━━━━━━━★`,attachment: fs.createReadStream(__dirname + `/noprefix/golgappe.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("💋", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
