const fs = require("fs-extra");
const path = require("path");
const yts = require("yt-search");
const { YtDlp } = require("ytdlp-nodejs");

module.exports.config = {
  name: "music",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "Priyansh",
  description: "YouTube se song download karke direct Messenger audio bheje",
  commandCategory: "media",
  usages: "[song name / YouTube URL]",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args.length) {
    return api.sendMessage(
      "🎵 MUSIC\n\n" +
      "Example:\n" +
      ".music dil ke armaan\n\n" +
      "YouTube URL bhi de sakte ho.",
      threadID,
      messageID
    );
  }

  const query = args.join(" ");
  const cacheDir = path.join(__dirname, "cache");

  try {
    await fs.ensureDir(cacheDir);

    let youtubeUrl;
    let title;

    // Direct YouTube link
    if (
      query.includes("youtube.com/watch") ||
      query.includes("youtu.be/")
    ) {
      youtubeUrl = query;
      title = "YouTube Music";
    } else {
      // YouTube search
      const search = await yts(query);

      if (!search.videos || !search.videos.length) {
        return api.sendMessage(
          "❌ Song nahi mila.",
          threadID,
          messageID
        );
      }

      const video = search.videos[0];

      youtubeUrl = video.url;
      title = video.title;
    }

    await api.sendMessage(
      `⏳ Music download ho raha hai...\n\n🎵 ${title}`,
      threadID,
      messageID
    );

    console.log("🎵 MUSIC URL:", youtubeUrl);

    const downloader = new YtDlp();

    /*
     * Audio download
     */
    const result = await downloader
      .downloadAudio(youtubeUrl, "mp3")
      .run();

    console.log("🎵 DOWNLOAD RESULT:", result);

    /*
     * ytdlp-nodejs normally returns filePaths
     */
    let downloadedFile = null;

    if (result && Array.isArray(result.filePaths)) {
      downloadedFile = result.filePaths[0];
    }

    if (
      !downloadedFile &&
      result &&
      Array.isArray(result.files)
    ) {
      downloadedFile = result.files[0];
    }

    if (!downloadedFile) {
      throw new Error(
        "Audio download hua lekin file path nahi mila."
      );
    }

    console.log("🎵 DOWNLOADED FILE:", downloadedFile);

    if (!await fs.pathExists(downloadedFile)) {
      throw new Error(
        "Downloaded audio file exist nahi karti."
      );
    }

    const stat = await fs.stat(downloadedFile);

    if (stat.size < 1000) {
      throw new Error(
        "Downloaded audio file empty/corrupt hai."
      );
    }

    /*
     * Messenger par DIRECT AUDIO
     */
    await api.sendMessage(
      {
        body: `🎵 ${title}`,
        attachment: fs.createReadStream(downloadedFile)
      },
      threadID,
      messageID
    );

    console.log("✅ MUSIC SENT SUCCESSFULLY");

    /*
     * Temporary file delete
     */
    setTimeout(async () => {
      try {
        if (await fs.pathExists(downloadedFile)) {
          await fs.remove(downloadedFile);
          console.log("🗑️ Music cache deleted");
        }
      } catch (error) {
        console.log(
          "Cache delete error:",
          error.message
        );
      }
    }, 15000);

  } catch (error) {
    console.error("========== MUSIC ERROR ==========");
    console.error(error);
    console.error("=================================");

    return api.sendMessage(
      "❌ Music download nahi ho paya.\n\n" +
      "Error:\n" +
      (error.message || "Unknown error"),
      threadID,
      messageID
    );
  }
};
