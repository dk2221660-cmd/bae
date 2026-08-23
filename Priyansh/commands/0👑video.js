const axios = require("axios");
const yts = require("yt-search");

const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
  return base.data.api;
};

(async () => {
  global.apis = { diptoApi: await baseApiUrl() };
})();

// Stream fetch with size limit
async function getStreamFromURL(url, pathName) {
  const response = await axios.get(url, { responseType: "stream" });
  response.data.path = pathName;
  return response.data;
}

function getVideoID(url) {
  const regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
  const match = url.match(regex);
  return match? match[1] : null;
}

module.exports.config = {
  name: "video",
  version: "1.2.0",
  credits: "virat saini",
  hasPermssion: 0,
  cooldowns: 5,
  description: "YouTube video ko URL ya name se MP4 me download karein",
  commandCategory: "media",
  usages: "[YouTube URL ya song ka naam]"
};

module.exports.run = async function({ api, args, event }) {
  try {
    if (!args[0]) return api.sendMessage("❌ Song ka naam ya YouTube link do!", event.threadID, event.messageID);

    let videoID, searchMsg;
    const url = args[0];

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      videoID = getVideoID(url);
      if (!videoID) return api.sendMessage("❌ Galat YouTube URL!", event.threadID, event.messageID);
    } else {
      const query = args.join(" ");
      searchMsg = await api.sendMessage(`🔍 Searching: "${query}"`, event.threadID);
      const result = await yts(query);
      if (!result.videos.length) return api.sendMessage("❌ Kuch nahi mila!", event.threadID, event.messageID);
      videoID = result.videos[0].videoId; // top result
    }

    const { data } = await axios.get(`${global.apis.diptoApi}/ytDl3?link=${videoID}&format=mp4`);
    if (!data.downloadLink ||!data.title) throw new Error("Download link nahi mila");

    if (searchMsg?.messageID) api.unsendMessage(searchMsg.messageID);

    // Messenger limit 25MB check
    const head = await axios.head(data.downloadLink).catch(() => null);
    const sizeMB = head? parseInt(head.headers["content-length"] || "0") / 1024 / 1024 : 0;
    if (sizeMB > 25) {
      return api.sendMessage(`⚠️ File ${sizeMB.toFixed(1)}MB hai. Messenger 25MB se badi file nahi bhejta.`, event.threadID, event.messageID);
    }

    // TinyURL fail hoga toh direct link bhej dena
    const shortLink = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(data.downloadLink)}`)
     .then(r => r.data)
     .catch(() => data.downloadLink);

    const safeTitle = data.title.replace(/[^\w\s-]/g, "").slice(0, 50);
    const stream = await getStreamFromURL(data.downloadLink, `${safeTitle}.mp4`);

    return api.sendMessage({
      body: `🎵 ${data.title}\n📥 ${shortLink}`,
      attachment: stream
    }, event.threadID, event.messageID);

  } catch (err) {
    console.error(err);
    return api.sendMessage("⚠️ Error: " + (err.response?.data?.message || err.message || "Kuch galat ho gaya!"), event.threadID, event.messageID);
  }
};
```

