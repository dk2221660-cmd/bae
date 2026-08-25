const fs = require("fs-extra");
const path = require("path");
const yts = require("yt-search");

module.exports.config = {
  name: "song",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Priyansh",
  description: "YouTube se song download karke direct Messenger audio bheje",
  commandCategory: "media",
  usages: "[song name]",
  cooldowns: 10,

  dependencies: {
    "ytdlp-nodejs": "*"
  }
};

module.exports.run = async function ({ api, event, args }) {

  const { threadID, messageID } = event;

  if (!args || !args.length) {
    return api.sendMessage(
      "🎵 SONG COMMAND\n\n" +
      "Song ka naam likho.\n\n" +
      "Example:\n" +
      ".song dil ke armaan",
      threadID,
      messageID
    );
  }

  const query = args.join(" ");
  const cacheDir = path.join(__dirname, "cache");

  try {

    await fs.ensureDir(cacheDir);

    let youtubeURL;
    let title;

    // Direct YouTube URL
    if (
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(query)
    ) {

      youtubeURL = query;
      title = "YouTube Song";

    } else {

      // YouTube search
      const search = await yts(query);

      if (!search.videos || search.videos.length === 0) {

        return api.sendMessage(
          "❌ Song nahi mila.\n\nDusra song try karo.",
          threadID,
          messageID
        );

      }

      const video = search.videos[0];

      youtubeURL = video.url;
      title = video.title;
    }

    await api.sendMessage(
      "⏳ Song download ho raha hai...\n\n" +
      "🎵 " + title,
      threadID,
      messageID
    );

    console.log("================================");
    console.log("🎵 SONG TITLE:", title);
    console.log("🔗 YOUTUBE URL:", youtubeURL);
    console.log("================================");

    // Downloader load
    const downloaderModule = require("ytdlp-nodejs");

    const YtDlp =
      downloaderModule.YtDlp ||
      downloaderModule.default ||
      downloaderModule;

    const downloader = new YtDlp();

    // Audio download
    const result = await downloader
      .downloadAudio(youtubeURL, "mp3")
      .run();

    console.log("🎵 DOWNLOAD RESULT:");
    console.log(result);

    let filePath = null;

    // Different result formats handle
    if (
      result &&
      Array.isArray(result.filePaths) &&
      result.filePaths.length > 0
    ) {

      filePath = result.filePaths[0];

    } else if (
      result &&
      Array.isArray(result.files) &&
      result.files.length > 0
    ) {

      filePath = result.files[0];

    } else if (typeof result === "string") {

      filePath = result;

    }

    if (!filePath) {
      throw new Error(
        "Downloader ne audio file ka path return nahi kiya."
      );
    }

    console.log("📁 AUDIO FILE:", filePath);

    // File exists?
    if (!await fs.pathExists(filePath)) {
      throw new Error(
        "Downloaded audio file nahi mili."
      );
    }

    const stats = await fs.stat(filePath);

    if (stats.size < 1000) {
      throw new Error(
        "Downloaded audio empty ya corrupt hai."
      );
    }

    console.log(
      "📦 FILE SIZE:",
      (stats.size / 1024 / 1024).toFixed(2),
      "MB"
    );

    // Messenger DIRECT AUDIO
    await api.sendMessage(
      {
        body: "🎵 " + title,
        attachment: fs.createReadStream(filePath)
      },
      threadID
    );

    console.log("✅ SONG SENT SUCCESSFULLY");

    // Delete temporary file
    setTimeout(async () => {

      try {

        if (await fs.pathExists(filePath)) {

          await fs.remove(filePath);

          console.log(
            "🗑️ Temporary audio deleted."
          );

        }

      } catch (error) {

        console.log(
          "Cache delete error:",
          error.message
        );

      }

    }, 15000);

  } catch (error) {

    console.error("");
    console.error("========== SONG ERROR ==========");
    console.error(error);
    console.error("================================");
    console.error("");

    return api.sendMessage(
      "❌ Song download nahi ho paya.\n\n" +
      "Error:\n" +
      (error.message || "Unknown error"),
      threadID,
      messageID
    );
  }
};
