const axios = require("axios");
const yts = require("yt-search");

module.exports.config = {
    name: "music",
    version: "2.0.0",
    credits: "virat saini",
    hasPermssion: 0,
    cooldowns: 5,
    description: "YouTube par song search kare",
    commandCategory: "media",
    usages: "[song name]"
};

module.exports.run = async function ({ api, args, event }) {
    try {
        const query = args.join(" ").trim();

        if (!query) {
            return api.sendMessage(
                "❌ Song ka naam do!\nExample: music tum hi ho",
                event.threadID,
                event.messageID
            );
        }

        const msg = await api.sendMessage(
            `🔍 Searching: "${query}"...`,
            event.threadID
        );

        const result = await yts(query);

        if (!result || !result.videos || result.videos.length === 0) {
            if (msg?.messageID) {
                api.unsendMessage(msg.messageID);
            }

            return api.sendMessage(
                "❌ Song nahi mila!",
                event.threadID,
                event.messageID
            );
        }

        // Best search result
        const video = result.videos[0];

        if (msg?.messageID) {
            api.unsendMessage(msg.messageID);
        }

        return api.sendMessage(
            `🎵 ${video.title}\n\n` +
            `👤 Channel: ${video.author.name}\n` +
            `⏱️ Duration: ${video.timestamp}\n\n` +
            `▶️ YouTube:\n${video.url}`,
            event.threadID,
            event.messageID
        );

    } catch (error) {
        console.error("MUSIC ERROR:", error);

        return api.sendMessage(
            "⚠️ Error: " + (error.message || "Song search nahi ho paya."),
            event.threadID,
            event.messageID
        );
    }
};
