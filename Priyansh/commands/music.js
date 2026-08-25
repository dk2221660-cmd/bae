const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");

module.exports.config = {
    name: "video",
    version: "1.0.0",
    credits: "virat saini + fixed",
    hasPermssion: 0,
    cooldowns: 5,
    description: "YouTube video search/download",
    commandCategory: "media",
    usages: "[YouTube URL ya video name]"
};

function getVideoId(url) {
    try {
        return ytdl.getURLVideoID(url);
    } catch (e) {
        return null;
    }
}

function safeName(name) {
    return String(name || "video")
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 70) || "video";
}

module.exports.run = async function ({ api, args, event }) {
    let searchMsg;

    try {
        const input = args.join(" ").trim();

        if (!input) {
            return api.sendMessage(
                "❌ YouTube link ya video name do!",
                event.threadID,
                event.messageID
            );
        }

        let videoUrl;

        // YouTube URL
        if (
            input.includes("youtube.com") ||
            input.includes("youtu.be")
        ) {
            const id = getVideoId(input);

            if (!id) {
                return api.sendMessage(
                    "❌ Invalid YouTube URL!",
                    event.threadID,
                    event.messageID
                );
            }

            videoUrl = `https://www.youtube.com/watch?v=${id}`;
        }

        // Search by name
        else {
            searchMsg = await api.sendMessage(
                `🔍 Searching YouTube: "${input}"`,
                event.threadID
            );

            const result = await yts(input);

            if (!result.videos || result.videos.length === 0) {
                if (searchMsg?.messageID) {
                    try {
                        await api.unsendMessage(searchMsg.messageID);
                    } catch {}
                }

                return api.sendMessage(
                    "❌ Video nahi mila!",
                    event.threadID,
                    event.messageID
                );
            }

            videoUrl = result.videos[0].url;
        }

        if (searchMsg?.messageID) {
            try {
                await api.unsendMessage(searchMsg.messageID);
            } catch {}
        }

        // Get video information
        const info = await ytdl.getInfo(videoUrl);

        const title =
            info.videoDetails?.title || "YouTube Video";

        const stream = ytdl(videoUrl, {
            quality: "18",
            filter: "audioandvideo",
            highWaterMark: 1 << 25,

            requestOptions: {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                    "Accept-Language":
                        "en-US,en;q=0.9"
                }
            }
        });

        stream.on("error", (err) => {
            console.error("YouTube stream error:", err);
        });

        stream.path = `${safeName(title)}.mp4`;

        return api.sendMessage(
            {
                body: `🎬 ${title}\n\n📥 YouTube video`,
                attachment: stream
            },
            event.threadID,
            event.messageID
        );

    } catch (err) {
        console.error("VIDEO COMMAND ERROR:", err);

        if (searchMsg?.messageID) {
            try {
                await api.unsendMessage(searchMsg.messageID);
            } catch {}
        }

        let msg = "⚠️ YouTube video send nahi ho saka.";

        if (
            err?.statusCode === 403 ||
            String(err?.message).includes("403")
        ) {
            msg +=
                "\n\n❌ YouTube ne request ko 403 Forbidden diya. " +
                "Ye YouTube/server-side restriction hai.";
        } else {
            msg += `\n\nError: ${err?.message || "Unknown error"}`;
        }

        return api.sendMessage(
            msg,
            event.threadID,
            event.messageID
        );
    }
};
