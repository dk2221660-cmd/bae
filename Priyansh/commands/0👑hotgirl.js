module.exports.config = {
  name: "hotgirl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "PREM BABU",
  description: "hotgirl girl",
  commandCategory: "Random-IMG",
  usages: "hot girl dp",
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
    var link = [ "https://i.imgur.com/fMGFh8w.jpeg","https://i.imgur.com/n1XPZDu.jpeg","https://i.imgur.com/Dnl3N9e.jpeg","https://i.imgur.com/Bj6eQD3.jpeg","https://i.imgur.com/HTkCkOX.jpeg","https://i.imgur.com/RsmQwTy.jpeg","https://i.imgur.com/yEei7jV.jpeg","https://i.imgur.com/qJIIHhF.jpeg","https://i.imgur.com/oy9nmIC.jpeg","https://i.imgur.com/DOZWytk.jpeg","https://i.imgur.com/8gUeyk1.jpeg","https://i.imgur.com/zi2UieB.jpeg","https://i.imgur.com/VOiqQTo.jpeg","https://i.imgur.com/7Apvaw9.jpeg","https://i.imgur.com/mmOCIbQ.jpeg","https://i.imgur.com/YsXIg8l.jpeg","https://i.imgur.com/fZ0Jpdo.jpeg","https://i.imgur.com/36mND0Y.jpeg","https://i.imgur.com/6GZCK5n.jpeg","https://i.imgur.com/uiX3s8y.jpeg","https://i.imgur.com/dlvNrNX.jpeg","https://i.imgur.com/cI2xi6I.jpeg","https://i.imgur.com/5pPU1f4.jpeg","https://i.imgur.com/x8SzDfK.jpeg","https://i.imgur.com/FaYfcr4.jpeg","https://i.imgur.com/wZOMWYa.jpeg","https://i.imgur.com/mAEcoou.jpeg","https://i.imgur.com/8r5qX6m.jpeg","https://i.imgur.com/2UOb46Z.jpeg","https://i.imgur.com/zgTv9qD.jpeg","https://i.imgur.com/J031a9W.jpeg","https://i.imgur.com/0ceNzYy.jpeg","https://i.imgur.com/x9vHJvo.jpeg","https://i.imgur.com/r1bvQoF.jpeg","https://i.imgur.com/NBFWeeR.jpeg"
        ];
     var callback = () => api.sendMessage({body:`┏━━━━━━━━━━━━━┓
  𓋜ྀི─୨⍤⃝𝗛𝗼𝘁 𝗚𝗶𝗿𝗹 ─˚˖𓍢ִ໋🦢˚
      🎀✴⭐⭐✴🎀  
         ┊                 ┊   
         ┊                 ┊   
  𓋜─୨⍤⃝𝗛𝗼𝘁 𝗚𝗶𝗿𝗹 ─˚🎀💗᪲᪲᪲
┗━━━━━━━━━━━━━┛`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
