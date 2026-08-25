const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const yts = require("yt-search");

module.exports.config = {
    name: "video",
    version: "2.0.0",
    credits: "virat saini + fixed 429",
    hasPermssion: 0,
    cooldowns: 10,
    description: "YouTube video search/download",
    commandCategory: "media",
    usages: "[YouTube URL ya video name]"
};

function safeName(name) {
    return String(name || "video")
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 70) || "video";
}

function isYouTubeUrl(url) {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url);
}

function downloadVideo(url, output) {
    return new Promise((resolve, reject) => {
        execFile(
            "yt-dlp",
            [
                "--no-playlist",
                "--no-warnings",
                "--restrict-filenames",

                // MP4 compatible video
                "-f",
                "best[ext=mp4][vcodec^=avc1][acodec^=mp4a]/best[ext=mp4]/best",

                "-o",
                output,

                url
            ],
            {
                maxBuffer: 10 * 1024 * 1024
            },
            (error, stdout, stderr) => {
                if (error) {
                    console.error("yt-dlp error:", stderr || error.message);
                    return reject(
                        new Error(stderr || error.message)
                    );
                }

                resolve(output);
            }
        );
    });
}

module.exports.run = async function ({ api, args, event }) {
    let searchMsg;
    let filePath;

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
        let title = "YouTube Video";

        // Direct YouTube URL
        if (isYouTubeUrl(input)) {
            videoUrl = input;
        }

        // Search YouTube
        else {
            searchMsg = await api.sendMessage(
                `🔍 Searching YouTube: "${input}"`,
                event.threadID
            );

            const result = await yts(input);

            if (!result.videos || result.videos.length === 0) {
                return api.sendMessage(
                    "❌ Video nahi mila!",
                    event.threadID,
                    event.messageID
                );
            }

            const video = result.videos[0];

            videoUrl = video.url;
            title = video.title || title;
        }

        if (searchMsg?.messageID) {
            try {
                await api.unsendMessage(searchMsg.messageID);
            } catch {}
        }

        const tempDir = path.join(__dirname, "temp");

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const fileName =
            `${Date.now()}_${safeName(title)}.mp4`;

        filePath = path.join(tempDir, fileName);

        await api.sendMessage(
            "📥 Video download ho raha hai...\n⏳ Thoda wait karo.",
            event.threadID
        );

        await downloadVideo(videoUrl, filePath);

        if (!fs.existsSync(filePath)) {
            throw new Error("Video file create nahi hui.");
        }

        const stats = fs.statSync(filePath);

        if (stats.size === 0) {
            throw new Error("Downloaded video empty hai.");
        }

        await api.sendMessage(
            {
                body: `🎬 ${title}\n\n✅ Video ready!`,
                attachment: fs.createReadStream(filePath)
            },
            event.threadID,
            event.messageID
        );

        // Delete temporary file
        setTimeout(() => {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch {}
        }, 10000);

    } catch (err) {
        console.error("VIDEO COMMAND ERROR:", err);

        if (searchMsg?.messageID) {
            try {
                await api.unsendMessage(searchMsg.messageID);
            } catch {}
        }

        if (filePath && fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch {}
        }

        let msg = "⚠️ YouTube video send nahi ho saka.";

        const errorText = String(
            err?.message || err || ""
        ).toLowerCase();

        if (errorText.includes("429")) {
            msg +=
                "\n\n❌ YouTube ne request rate-limit (429) kar di.";
        } else if (errorText.includes("403")) {
            msg +=
                "\n\n❌ YouTube ne access deny (403) kiya.";
        } else if (
            errorText.includes("yt-dlp") &&
            errorText.includes("not found")
        ) {
            msg +=
                "\n\n❌ Server par yt-dlp install nahi hai.";
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
