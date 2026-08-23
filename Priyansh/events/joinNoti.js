module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "Meera Rajput",
  description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "joinGif");
  if (existsSync(path)) mkdirSync(path, { recursive: true });	

  const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "djt me Hoàn simp Dũng lỏ" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    const fs = require("fs");
    return api.sendMessage("", event.threadID, () => api.sendMessage({body:`► [____B0T_3NT3R____] ◄\n\n 𝄟✮͢🦋⃟≛Basanti🐰⃕⃝𒌋𝆺𝅥♥⃝🦋 𝐁𝐨𝐭 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝 𝐔𝐬𝐞 *𝐇𝐞𝐥𝐩 𝐅𝐨𝐫 𝐌𝐨𝐫𝐞 ⚠️\n\n 𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫\n 𝄟≛⃝👸🏻VIRAT SAINI 🐰⃕⃝𒌋𝆺𝅥♥⃝\n\n 𝐇𝐞𝐫 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐈𝐃 𝐋𝐢𝐧𝐤 ⇨⇛ https://www.facebook.com/profile.php?id=61593211337826\n\n 𝐄𝐦𝐚𝐢𝐥 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 ⇩⇩⇩\n◆━━━━━━━━━━━◆\n sumitskhero628@gmail.com\n\n 𝐁𝐫𝐚𝐧𝐝𝐞𝐝 king ࿐ VIRAT 🔰`, attachment: fs.createReadStream(__dirname + "/cache/joinMp4/entry.mp4")} ,threadID));
  }
  else {
    try {
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
  var ngay = moment.tz('Asia/Kolkata').format('D/MM/YYYY');
  var gio = moment.tz('Asia/Kolkata').format('HH:mm:ss');
  var thu = moment.tz('Asia/Kolkata').format('dddd');
  if (thu == 'Sunday') thu = '𝗖𝗵𝘂̉ 𝗡𝗵𝗮̣̂𝘁'
  if (thu == 'Monday') thu = '𝗧𝗵𝘂̛́ 𝗛𝗮𝗶'
  if (thu == 'Tuesday') thu = '𝗧𝗵𝘂̛́ 𝗕𝗮'
  if (thu == 'Wednesday') thu = '𝗧𝗵𝘂̛́ 𝗧𝘂̛'
  if (thu == "Thursday") thu = '𝗧𝗵𝘂̛́ 𝗡𝗮̆𝗺'
  if (thu == 'Friday') thu = '𝗧𝗵𝘂̛́ 𝗦𝗮́𝘂'
  if (thu == 'Saturday') thu = '𝗧𝗵𝘂̛́ 𝗕𝗮̉𝘆'
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "cache", "joinGif");
      const pathGif = join(path, `${threadID}.gif`);

      var mentions = [], nameArray = [], memLength = [], i = 0;

      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = '𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗛𝗢 𝗚𝗬𝗔 𝗧𝗨𝗠𝗛𝗔𝗥𝗔\n━━━━━━━━━━━━━   🥰 {name}.\n𝗛𝗮𝗺𝗮𝗿𝗲 𝗚𝗿𝗼𝘂𝗽 𝗠𝗲 {threadName}\n━━━━━━━━━━━━━   𝗠𝗲𝗿𝗮 𝗣𝗿𝗲𝗳𝗶𝘅 [ . ] 𝗛𝗮𝗶 𝗘𝗻𝗷𝗼𝘆 𝗔𝗹𝘄𝗮𝘆𝘀 𝗦𝗺𝗶𝗹𝗶𝗻𝗴 🥰🍀' : msg = threadData.customJoin;
      msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{type}/g, (memLength.length > 1) ?  '𝗖𝗮́𝗰 𝗯𝗮̣𝗻' : '𝗕𝗮̣𝗻')
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName)
      .replace(/\{thu}/g, thu)
      .replace(/\{ngay}/g, ngay)
      .replace(/\{gio}/g, gio);

      if (existsSync(path)) mkdirSync(path, { recursive: true });

      const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
      else if (randomPath.length != 0) {
        const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
        formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
      }
      else formPush = { body: msg, mentions }

      return api.sendMessage(formPush, threadID);
    } catch (e) { return console.log(e) };
  }
                     }
