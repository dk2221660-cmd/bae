const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const yts = require("yt-search");

const { downloadVideo } = require("priyansh-all-dl");

module.exports.config = {
  name: "music",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Priyansh",
  description: "YouTube song download karke Messenger par direct audio bheje",
  commandCategory: "media",
  usages: "[song name / YouTube URL]",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {

  const { threadID, messageID } = event;

  if (!args.length) {
    return api.sendMessage(
      "🎵 MUSIC\n\n" +
      "Song ka naam likho.\n\n" +
      "Example:\n" +
      ".music don\n\n" +
      "Ya YouTube link:\n" +
      ".music https://youtu.be/xxxx",
      threadID,
      messageID
    );
  }

  const query = args.join(" ");

  const cacheDir = path.join(__dirname, "cache");

  try {

    await fs.ensureDir(cacheDir);

    let youtubeUrl;
    let title = query;

    /*
     * STEP 1
     * Agar direct YouTube URL diya hai
     */
    if (
      query.includes("youtube.com/watch") ||
      query.includes("youtu.be/")
    ) {

      youtubeUrl = query;

    } else {

      /*
       * STEP 2
       * Song name se YouTube search
       */

      const search = await yts(query);

      if (!search.videos || search.videos.length === 0) {

        return api.sendMessage(
          "❌ Song nahi mila.\n\nDusra song try karo.",
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

    console.log("MUSIC URL:", youtubeUrl);

    /*
     * STEP 3
     * priyansh-all-dl se AUDIO download
     */

    const result = await downloadVideo(
      youtubeUrl,
      {
        format: "audio"
      }
    );

    console.log("MUSIC RESULT:", result);

    /*
     * Package ke different possible result formats
     */

    let downloadUrl = null;
    let localFile = null;

    if (typeof result === "string") {

      if (
        result.startsWith("http://") ||
        result.startsWith("https://")
      ) {
        downloadUrl = result;
      } else if (await fs.pathExists(result)) {
        localFile = result;
      }

    }

    if (result && typeof result === "object") {

      downloadUrl =
        result.url ||
        result.downloadUrl ||
        result.download_url ||
        result.audio ||
        result.audioUrl ||
        result.link ||
        result.fileUrl ||
        result.file ||
        null;

      if (!downloadUrl && result.data) {

        if (typeof result.data === "string") {

          if (
            result.data.startsWith("http://") ||
            result.data.startsWith("https://")
          ) {
            downloadUrl = result.data;
          }

        } else if (typeof result.data === "object") {

          downloadUrl =
            result.data.url ||
            result.data.downloadUrl ||
            result.data.download_url ||
            result.data.audio ||
            result.data.audioUrl ||
            result.data.file ||
            null;
        }
      }
    }

    /*
     * STEP 4
     * Agar package ne local file di hai
     */

    if (localFile) {

      const stat = await fs.stat(localFile);

      if (stat.size < 1000) {
        throw new Error("Downloaded audio file invalid hai.");
      }

      await api.sendMessage(
        {
          body: `🎵 ${title}`,
          attachment: fs.createReadStream(localFile)
        },
        threadID
      );

      setTimeout(async () => {

        try {

          if (await fs.pathExists(localFile)) {
            await fs.remove(localFile);
          }

        } catch (e) {
          console.log("Cache delete error:", e.message);
        }

      }, 10000);

      return;
    }

    /*
     * STEP 5
     * Agar package ne download URL diya hai
     */

    if (!downloadUrl) {

      console.log(
        "DOWNLOAD RESULT KEYS:",
        result && typeof result === "object"
          ? Object.keys(result)
          : typeof result
      );

      throw new Error(
        "Downloader ne audio URL/file return nahi ki."
      );
    }

    /*
     * STEP 6
     * Audio ko local cache mein save karo
     */

    const safeTitle = String(title)
      .replace(/[<>:"/\\|?*]/g, "")
      .replace(/\s+/g, "_")
      .slice(0, 70);

    const filePath = path.join(
      cacheDir,
      `${Date.now()}_${safeTitle}.mp3`
    );

    console.log("AUDIO URL:", downloadUrl);

    const response = await axios({
      method: "GET",
      url: downloadUrl,
      responseType: "stream",
      timeout: 120000,
      maxContentLength: 50 * 1024 * 1024,
      maxBodyLength: 50 * 1024 * 1024
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {

      writer.on("finish", resolve);
      writer.on("error", reject);
      response.data.on("error", reject);

    });

    /*
     * STEP 7
     * Check downloaded file
     */

    const stat = await fs.stat(filePath);

    if (stat.size < 1000) {

      await fs.remove(filePath);

      throw new Error(
        "Audio file empty/corrupt hai."
      );
    }

    /*
     * STEP 8
     * Messenger par DIRECT AUDIO bhejo
     */

    await api.sendMessage(
      {
        body:
          `🎵 ${title}\n\n` +
          `🎧 Music downloaded successfully`,
        attachment: fs.createReadStream(filePath)
      },
      threadID
    );

    /*
     * STEP 9
     * Temporary file delete
     */

    setTimeout(async () => {

      try {

        if (await fs.pathExists(filePath)) {
          await fs.remove(filePath);
        }

      } catch (e) {

        console.log(
          "Music cache delete error:",
          e.message
        );

      }

    }, 10000);

  } catch (error) {

    console.error(
      "========== MUSIC ERROR =========="
    );

    console.error(error);

    console.error(
      "================================="
    );

    return api.sendMessage(
      "❌ Music download nahi ho paya.\n\n" +
      "Error: " +
      (error.message || "Unknown error") +
      "\n\n" +
      "Console/terminal mein complete error check karo.",
      threadID,
      messageID
    );
  }
};
