const axios = require("axios");

module.exports.config = {
    name: "pinterest",
    version: "1.0.0",
    credits: "virat saini",
    hasPermssion: 0,
    cooldowns: 5,
    description: "Download public Pinterest video",
    commandCategory: "media",
    usages: "[Pinterest URL]"
};

function getVideoUrl(html) {
    const patterns = [
        /"contentUrl":"(https?:\\\/\\\/[^"]+?\.mp4[^"]*)"/i,
        /"url":"(https?:\\\/\\\/[^"]+?\.mp4[^"]*)"/i,
        /https?:\/\/[^"'\\ ]+\.mp4[^"'\\ ]*/i
    ];

    for (const regex of patterns) {
        const match = html.match(regex);

        if (match && match[1]) {
            return match[1]
                .replace(/\\u002F/g, "/")
                .replace(/\\\//g, "/")
                .replace(/\\u003D/g, "=")
                .replace(/&amp;/g, "&");
        }
    }

    return null;
}

module.exports.run = async function ({ api, args, event }) {
    try {
        const url = args[0];

        if (!url || !url.includes("pinterest")) {
            return api.sendMessage(
                "❌ Pinterest video ka public URL do!",
                event.threadID,
                event.messageID
            );
        }

        await api.sendMessage(
            "🔍 Pinterest video search kar raha hoon...",
            event.threadID
        );

        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9"
            },
            timeout: 15000
        });

        const videoUrl = getVideoUrl(response.data);

        if (!videoUrl) {
            return api.sendMessage(
                "❌ Is Pinterest PIN me public video URL nahi mila.",
                event.threadID,
                event.messageID
            );
        }

        const video = await axios.get(videoUrl, {
            responseType: "stream",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                "Referer": "https://www.pinterest.com/"
            },
            timeout: 30000
        });

        video.data.path = "pinterest-video.mp4";

        return api.sendMessage(
            {
                body: "📌 Pinterest Video\n\n📥 Downloaded successfully!",
                attachment: video.data
            },
            event.threadID,
            event.messageID
        );

    } catch (err) {
        console.error("Pinterest Error:", err);

        return api.sendMessage(
            "⚠️ Pinterest video download nahi ho saka.\n\n" +
            "Possible reason: PIN private/login-required hai ya Pinterest ne request block ki hai.",
            event.threadID,
            event.messageID
        );
    }
};
