const { downloadVideo } = require('priyansh-all-dl');
const axios = require("axios");
const fs = require("fs-extra");
const tempy = require("tempy");

module.exports.config = {
    name: "reeldownloader",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Priyansh Rajput + Modified",
    description: "Downloads videos from Instagram, Facebook and Pinterest links",
    commandCategory: "utility",
    usages: "[Instagram/Facebook/Pinterest video URL]",
    cooldowns: 5,

    dependencies: {
        "priyansh-all-dl": "latest",
        "axios": "0.21.1",
        "fs-extra": "10.0.0",
        "tempy": "0.4.0"
    }
};

module.exports.handleEvent = async function ({ api, event }) {

    if (event.type !== "message" || !event.body) return;

    const url = event.body.trim();

    // Instagram
    const instagram =
        /https?:\/\/(?:www\.)?instagram\.com\/(?:reel|p|share)\//i.test(url);

    // Facebook
    const facebook =
        /https?:\/\/(?:www\.)?(?:facebook\.com|fb\.watch)\/.+/i.test(url);

    // Pinterest
    const pinterest =
        /https?:\/\/(?:www\.)?pinterest\.[a-z.]+\/.+/i.test(url);

    // Agar supported link nahi hai
    if (!instagram && !facebook && !pinterest) return;

    let tempFilePath = null;

    try {

        console.log("Video link detected:", url);

        const videoInfo = await downloadVideo(url);

        if (!videoInfo || !videoInfo.video) {
            throw new Error("Video URL nahi mila.");
        }

        const videoUrl = videoInfo.video;

        console.log("Downloading video...");

        const response = await axios.get(videoUrl, {
            responseType: "stream",
            timeout: 60000,
            maxRedirects: 5
        });

        tempFilePath = tempy.file({
            extension: "mp4"
        });

        const writer = fs.createWriteStream(tempFilePath);

        await new Promise((resolve, reject) => {

            response.data.pipe(writer);

            writer.on("finish", resolve);

            writer.on("error", reject);

            response.data.on("error", reject);
        });

        console.log("Sending video...");

        await api.sendMessage(
            {
                attachment: fs.createReadStream(tempFilePath),
                body:
                    "★━━━━━━━━━━━━━★\n" +
                    "🍂 𝐘𝐞𝐡 𝐥𝐨 𝐀𝐩𝐤𝐚 𝐯𝐢𝐝𝐞𝐨 🍂\n" +
                    "★━━━━━━━━━━━━━★"
            },
            event.threadID,
            event.messageID
        );

    } catch (error) {

        console.error("Video download error:", error);

        await api.sendMessage(
            "❌ Video download nahi ho paya.\n\n" +
            "✔️ Instagram Reel\n" +
            "✔️ Facebook Reel/Video\n" +
            "✔️ Pinterest Video\n\n" +
            "ka public link bhejkar dobara try karein.",
            event.threadID,
            event.messageID
        );

    } finally {

        if (tempFilePath) {
            try {
                await fs.remove(tempFilePath);
            } catch (error) {
                console.error("Temporary file delete error:", error);
            }
        }
    }
};

module.exports.run = async function ({ api, event }) {

    return api.sendMessage(
        "📥 Instagram, Facebook ya Pinterest ka video/reel link bhejiye.",
        event.threadID,
        event.messageID
    );

};
