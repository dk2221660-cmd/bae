const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core");

module.exports.config = {
  name: "music",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Priyansh",
  description: "YouTube se music download karke Messenger par bheje",
  commandCategory: "media",
  usages: "[song name / YouTube URL]",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args.length) {
    return api.sendMessage(
      "🎵 Music command\n\n" +
      "Usage:\n" +
      "!music song name\n\n" +
      "Example:\n" +
      "!music Tum Hi Ho",
      threadID,
      messageID
    );
  }

  const query = args.join(" ");
  const cacheDir = path.join(__dirname, "cache");

  try {
    await fs.ensureDir(cacheDir);

    let video;

    // YouTube URL diya hai
    if (ytdl.validateURL(query)) {
      const info = await ytdl.getInfo(query);

      video = {
        title: info.videoDetails.title,
        url: query,
        duration: info.videoDetails.lengthSeconds,
        thumbnail: info.videoDetails.thumbnails?.[0]?.url || null
      };
    } else {
      // Song name se YouTube search
      const result = await yts(query);

      if (!result.videos || result.videos.length === 0) {
        return api.sendMessage(
          "❌ Song nahi mila.\n\nDusra song name try karo.",
          threadID,
          messageID
        );
      }

      video = result.videos[0];
    }

    const safeName = String(video.title)
      .replace(/[<>:"/\\|?*]/g, "")
      .replace(/\s+/g, "_")
      .slice(0, 80);

    const filePath = path.join(
      cacheDir,
      `${Date.now()}_${safeName}.mp3`
    );

    await api.sendMessage(
      `⏳ Music download ho raha hai...\n\n🎵 ${video.title}`,
      threadID,
      messageID
    );

    // YouTube audio stream
    const stream = ytdl(video.url, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1 << 25
    });

    const writeStream = fs.createWriteStream(filePath);

    await new Promise((resolve, reject) => {
      stream.pipe(writeStream);

      stream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);
    });

    const stats = await fs.stat(filePath);

    // Facebook Messenger attachment limit ko dhyan me rakhte hue
    if (stats.size > 25 * 1024 * 1024) {
      await fs.remove(filePath);

      return api.sendMessage(
        "❌ Audio file bahut badi hai.\n\n" +
        "Koi chhota/short song try karo.",
        threadID,
        messageID
      );
    }

    await api.sendMessage(
      {
        body:
          `🎵 ${video.title}\n\n` +
          `🎧 Requested by Messenger Bot`,
        attachment: fs.createReadStream(filePath)
      },
      threadID
    );

    // Temporary file delete
    setTimeout(async () => {
      try {
        if (await fs.pathExists(filePath)) {
          await fs.remove(filePath);
        }
      } catch (err) {
        console.log("Music cache delete error:", err.message);
      }
    }, 10000);

  } catch (error) {
    console.error("MUSIC ERROR:", error);

    return api.sendMessage(
      "❌ Music download nahi ho paya.\n\n" +
      "Possible reason:\n" +
      "• YouTube ne request block ki\n" +
      "• Video unavailable hai\n" +
      "• Internet/download error\n\n" +
      "Dusra song try karo.",
      threadID,
      messageID
    );
  }
};
