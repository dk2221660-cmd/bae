// ================= CREATOR LOCK =================
const CREATOR_LOCK = (() => {
  const encoded = "QVJJRiBCQUJV";
  return Buffer.from(encoded, "base64").toString("utf8");
})();

module.exports.config = {
  name: "hack",
  version: "2.2.1",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "FACEBOOK SAVE LOGIN INFO",
  usePrefix: true,
  commandCategory: "fun",
  usages: "[reply | mention | self]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "canvas": ""
  }
};

// 🔐 Credit Protection
if (module.exports.config.credits !== CREATOR_LOCK) {
  console.log("❌ Creator Lock Activated! Credits cannot be changed.");
  module.exports.run = () => {};
  return;
}

module.exports.run = async function ({ api, event, Users }) {
  const { createCanvas, loadImage } = require("canvas");
  const fs = require("fs-extra");
  const axios = require("axios");

  const cache = __dirname + "/cache/";
  if (!fs.existsSync(cache)) fs.mkdirSync(cache, { recursive: true });

  const out = cache + "fb_login_real.png";
  const avatarPath = cache + "avatar.png";

  const { senderID, threadID, messageID } = event;

  let id;
  if (event.messageReply?.senderID) id = event.messageReply.senderID;
  else if (event.mentions && Object.keys(event.mentions).length === 1)
    id = Object.keys(event.mentions)[0];
  else id = senderID;

  const name = await Users.getNameUser(id);

  // ===== AVATAR =====
  const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662";
  const avatar = await axios.get(
    `https://graph.facebook.com/${id}/picture?type=large&access_token=${token}`,
    { responseType: "arraybuffer" }
  );
  fs.writeFileSync(avatarPath, avatar.data);

  // ===== CANVAS =====
  const W = 720;
  const H = 1350;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#000";
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Facebook", W / 2, 90);

  ctx.font = "bold 46px Arial";
  ctx.fillText("Save Login Info?", W / 2, 180);

  ctx.fillStyle = "#8a8a8a";
  ctx.font = "28px Arial";
  ctx.fillText(
    "Next time you log in on this device, simply",
    W / 2,
    240
  );
  ctx.fillText(
    "tap your account instead of typing a password.",
    W / 2,
    280
  );

  // Phone frame
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.roundRect(110, 330, 500, 900, 60);
  ctx.fill();

  ctx.fillStyle = "#eef1f5";
  ctx.beginPath();
  ctx.roundRect(130, 350, 460, 860, 40);
  ctx.fill();

  ctx.fillStyle = "#1877f2";
  ctx.fillRect(130, 350, 460, 80);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 32px Arial";
  ctx.fillText("facebook", W / 2, 400);

  // Account row
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(130, 430, 460, 120);

  const img = await loadImage(avatarPath);
  ctx.drawImage(img, 150, 450, 90, 90);

  ctx.fillStyle = "#1877f2";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "left";
  ctx.fillText(name, 260, 505);

  // Buttons
  const btnY = 1030;

  ctx.fillStyle = "#e4e6eb";
  ctx.beginPath();
  ctx.roundRect(160, btnY, 170, 70, 18);
  ctx.fill();

  ctx.fillStyle = "#000";
  ctx.font = "bold 26px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Not Now", 245, btnY + 45);

  ctx.fillStyle = "#1877f2";
  ctx.beginPath();
  ctx.roundRect(390, btnY, 170, 70, 18);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.fillText("OK", 475, btnY + 45);

  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  fs.unlinkSync(avatarPath);

  return api.sendMessage(
    { attachment: fs.createReadStream(out) },
    threadID,
    () => fs.unlinkSync(out),
    messageID
  );
};