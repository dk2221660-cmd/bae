const {
    igdl,
    fbdown,
    pindl
} = require("btch-downloader");

const axios = require("axios");
const fs = require("fs-extra");
const tempy = require("tempy");

module.exports.config = {
    name: "reeldownloader",
    version: "3.0.0",
    hasPermssion: 0,
    credits: "Modified",
    description: "Instagram + Facebook + Pinterest Video Downloader",
    commandCategory: "utility",
    usages: "[Video/Reel Link]",
    cooldowns: 5,

    dependencies: {
        "btch-downloader": "6.3.6",
        "axios": "0.21.1",
        "fs-extra": "10.0.0",
        "tempy": "0.4.0"
    }
};


/* =========================
   GET VIDEO URL
========================= */

async function getVideoUrl(url) {

    // Instagram
    if (/instagram\.com/i.test(url)) {

        const result = await igdl(url);

        if (!result || !result.length) {
            throw new Error("Instagram video nahi mila.");
        }

        // Highest/first available video
        for (const item of result) {

            if (item.url) {
                return item.url;
            }

            if (item.download) {
                return item.download;
            }

            if (item.video) {
                return item.video;
            }
        }

        throw new Error("Instagram download URL nahi mila.");
    }


    // Facebook
    if (
        /facebook\.com/i.test(url) ||
        /fb\.watch/i.test(url)
    ) {

        const result = await fbdown(url);

        if (!result) {
            throw new Error("Facebook video nahi mila.");
        }

        if (result.HD) {
            return result.HD;
        }

        if (result.hd) {
            return result.hd;
        }

        if (result.SD) {
            return result.SD;
        }

        if (result.sd) {
            return result.sd;
        }

        if (result.url) {
            return result.url;
        }

        if (result.video) {
            return result.video;
        }

        throw new Error("Facebook download URL nahi mila.");
    }


    // Pinterest
    if (/pinterest\./i.test(url)) {

        const result = await pindl(url);

        if (!result) {
            throw new Error("Pinterest video nahi mila.");
        }

        if (Array.isArray(result)) {

            for (const item of result) {

                if (item.url) {
                    return item.url;
                }

                if (item.download) {
                    return item.download;
                }

                if (item.video) {
                    return item.video;
                }
            }
        }

        if (result.url) {
            return result.url;
        }

        if (result.video) {
            return result.video;
        }

        if (result.download) {
            return result.download;
        }

        throw new Error("Pinterest download URL nahi mila.");
    }


    throw new Error(
        "Sirf Instagram, Facebook aur Pinterest links supported hain."
    );
}


/* =========================
   DOWNLOAD VIDEO
========================= */

async function downloadFile(videoUrl, filePath) {

    const response = await axios.get(videoUrl, {
        responseType: "stream",
        timeout: 120000,
        maxRedirects: 10,

        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                "AppleWebKit/537.36 (KHTML, like Gecko) " +
                "Chrome/120.0 Safari/537.36"
        }
    });

    const writer = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {

        response.data.pipe(writer);

        writer.on("finish", resolve);

        writer.on("error", reject);

        response.data.on("error", reject);
    });
}


/* =========================
   AUTO LINK HANDLER
========================= */

module.exports.handleEvent = async function ({
    api,
    event
}) {

    if (!event.body) return;

    const url = event.body.trim();


    // Supported links only
    const supported =
        /instagram\.com/i.test(url) ||
        /facebook\.com/i.test(url) ||
        /fb\.watch/i.test(url) ||
        /pinterest\./i.test(url);


    if (!supported) return;


    let filePath = null;

    try {

        console.log(
            "=============================="
        );

        console.log(
            "VIDEO LINK DETECTED:"
        );

        console.log(url);

        console.log(
            "=============================="
        );


        // Get direct video URL
        const videoUrl = await getVideoUrl(url);


        if (!videoUrl) {
            throw new Error(
                "Direct video URL nahi mila."
            );
        }


        console.log(
            "Direct video URL received."
        );


        // Temporary MP4 file
        filePath = tempy.file({
            extension: "mp4"
        });


        // Download
        await downloadFile(
            videoUrl,
            filePath
        );


        // Check file
        const stat = await fs.stat(
            filePath
        );


        if (!stat.size) {
            throw new Error(
                "Downloaded file empty hai."
            );
        }


        console.log(
            "Video downloaded:",
            stat.size,
            "bytes"
        );


        // Send video
        await api.sendMessage(
            {
                body:
                    "★━━━━━━━━━━━━━━★\n" +
                    "🍂 𝐘𝐞𝐡 𝐥𝐨 𝐀𝐩𝐤𝐚 𝐯𝐢𝐝𝐞𝐨 🍂\n" +
                    "★━━━━━━━━━━━━━━★",

                attachment:
                    fs.createReadStream(
                        filePath
                    )
            },

            event.threadID
        );


        console.log(
            "Video sent successfully."
        );


    } catch (error) {

        console.error(
            "VIDEO DOWNLOAD ERROR:",
            error
        );


        try {

            await api.sendMessage(
                "❌ Video download nahi ho paya.\n\n" +
                "Instagram Reel, Facebook Reel/Video " +
                "ya Pinterest video ka public link bhejiye.\n\n" +
                "⚠️ Private/restricted video download nahi ho sakta.",

                event.threadID,

                event.messageID
            );

        } catch (sendError) {

            console.error(
                "Error sending error message:",
                sendError
            );
        }


    } finally {

        // Delete temporary file
        if (filePath) {

            try {

                await fs.remove(
                    filePath
                );

            } catch (deleteError) {

                console.error(
                    "Temporary file delete error:",
                    deleteError
                );
            }
        }
    }
};


/* =========================
   COMMAND
========================= */

module.exports.run = async function ({
    api,
    event
}) {

    return api.sendMessage(

        "📥 Instagram Reel, Facebook Reel " +
        "ya Pinterest video ka link bhejiye.",

        event.threadID,

        event.messageID
    );
};
