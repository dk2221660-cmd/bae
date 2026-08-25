const fs = require("fs");
const path = require("path");
const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core");

module.exports.config = {
    name: "music",
    version: "3.0.0",
    credits: "virat saini + fixed",
    hasPermssion: 0,
    cooldowns: 5,
    description: "YouTube se song audio bheje",
    commandCategory: "media",
    usages: "[song name]"
};

module.exports.run = async function ({ api, args, event }) {
    let filePath = null;

    try {
        const query = args.join(" ").trim();

        if (!query) {
            return api.sendMessage(
                "❌ Song ka naam do!\nExample: music tum hi ho",
                event.threadID,
                event.messageID
            );
        }

        const result = await yts(query);

        if (!result.videos || result.videos.length === 0) {
            return api.sendMessage(
                "❌ Song nahi mila!",
                event.threadID,
                event.messageID
            );
        }

        const video = result.videos[0];

        if (!video.url || !ytdl.validateURL(video.url)) {
            return api.sendMessage(
                "❌ YouTube video nahi mila.",
                event.threadID,
                event.messageID
            );
        }

        await api.sendMessage(
            `⬇️ Downloading...\n🎵 ${video.title}`,
            event.threadID
        );

        const tempDir = path.join(__dirname, "music_temp");

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        filePath = path.join(
            tempDir,
            `song_${Date.now()}.webm`
        );

        await downloadAudio(video.url, filePath);

        if (!fs.existsSync(filePath)) {
            throw new Error("Audio download nahi hua.");
        }

        await api.sendMessage(
            {
                body: `🎵 ${video.title}`,
                attachment: fs.createReadStream(filePath)
            },
            event.threadID,
            event.messageID
        );

        setTimeout(() => {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (e) {}
        }, 15000);

    } catch (error) {
        console.error("MUSIC ERROR:", error);

        try {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (e) {}

        return api.sendMessage(
            "❌ Song send nahi ho paya.\n" +
            "Error: " + (error.message || "Unknown error"),
            event.threadID,
            event.messageID
        );
    }
};

function downloadAudio(url, output) {
    return new Promise((resolve, reject) => {

        const stream = ytdl(url, {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25
        });

        const writeStream = fs.createWriteStream(output);

        stream.on("error", reject);
        writeStream.on("error", reject);

        writeStream.on("finish", resolve);

        stream.pipe(writeStream);
    });
}
