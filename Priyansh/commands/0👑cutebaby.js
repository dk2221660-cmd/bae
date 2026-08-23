module.exports.config = {
  name: "cutebaby",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "PREM BABU",
  description: "cute bacha photos",
  commandCategory: "Random-IMG",
  usages: "baby dp",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }

};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.imgur.com/DPxgBLs.jpeg","https://i.imgur.com/NnFVf37.jpeg","https://i.imgur.com/hpCGgu2.jpeg","https://i.imgur.com/PJiaObK.jpeg","https://i.imgur.com/7WmdQ41.jpeg","https://i.imgur.com/l5dQOHv.jpeg","https://i.imgur.com/q7IZq40.jpeg","https://i.imgur.com/GTpGacE.jpeg","https://i.imgur.com/DwyMKSC.jpeg","https://i.imgur.com/b80eBdh.jpeg","https://i.imgur.com/dbL9wkb.jpeg","https://i.imgur.com/Aw41VWZ.jpeg","https://i.imgur.com/oQaZ23w.jpeg","https://i.imgur.com/DqtZL6U.jpeg","https://i.imgur.com/lnbirnb.jpeg","https://i.imgur.com/8jYErG8.jpeg","https://i.imgur.com/dF6kE3Z.jpeg","https://i.imgur.com/O89Fu6w.jpeg","https://i.imgur.com/zEwce0P.jpeg","https://i.imgur.com/v9KVAtY.jpeg","https://i.imgur.com/mXVHrv9.jpeg","https://i.imgur.com/o9EYEOM.jpeg","https://i.imgur.com/1Nz19ct.jpeg","https://i.imgur.com/xYMKJx4.jpeg","https://i.imgur.com/AEqtRtw.jpeg","https://i.imgur.com/4ih7Kmn.jpeg","https://i.imgur.com/POB2pRU.jpeg","https://i.imgur.com/6Lqedub.jpeg","https://i.imgur.com/b92QX4B.jpeg","https://i.imgur.com/SouWkkP.jpeg","https://i.imgur.com/B4WdiGE.jpeg","https://i.imgur.com/mCJ1tQ3.jpeg","https://i.imgur.com/qbV1d7X.jpeg","https://i.imgur.com/Ak3AdHZ.jpeg","https://i.imgur.com/xsqvF0u.jpeg","https://i.imgur.com/80B3ktB.jpeg","https://i.imgur.com/uCkaWgc.jpeg"
           ];
     var callback = () => api.sendMessage({body:`┏━━━━━━━━━━━━━┓
  𓋜ྀི─୨⍤⃝𝗖𝘂𝘁𝗲 𝗕𝗮𝗯𝘆 ─˚˖𓍢ִ໋🦢˚
      🎀✴⭐⭐✴🎀  
         ┊                 ┊   
         ┊                 ┊   
  𓋜─୨⍤⃝𝗖𝘂𝘁𝗲 𝗕𝗮𝗯𝘆 ─˚🎀💗᪲᪲᪲
┗━━━━━━━━━━━━━┛`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
