module.exports.config = {
  name: "Coupledp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "PREM BABU",
  description: "couple Dp photos",
  commandCategory: "Random-IMG",
  usages: "couple dp",
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
    var link = ["https://i.imgur.com/8eN11jn.jpeg","https://i.imgur.com/PDqskKV.jpeg","https://i.imgur.com/nV3Q6Kq.jpeg","https://i.imgur.com/8qdGqIn.jpeg","https://i.imgur.com/s29VPeP.jpeg","https://i.imgur.com/HmQzHbA.jpeg","https://i.imgur.com/zgnabGo.jpeg","https://i.imgur.com/qYVR8Py.jpeg","https://i.imgur.com/ErKmVZC.jpeg","https://i.imgur.com/CsIOsau.jpeg","https://i.imgur.com/RMiqnJ1.jpeg","https://i.imgur.com/W3sneFu.jpeg","https://i.imgur.com/gHZzUVv.jpeg","https://i.imgur.com/zTZfruL.jpeg","https://i.imgur.com/B7UDl8t.jpeg","https://i.imgur.com/mpsJ86M.jpeg","https://i.imgur.com/vTIDwRU.jpeg","https://i.imgur.com/rcRt24D.jpeg","https://i.imgur.com/SZeqU7M.jpeg","https://i.imgur.com/hzyzjRP.jpeg","https://i.imgur.com/FzpLRi4.jpeg","https://i.imgur.com/8jaMkFQ.jpeg","https://i.imgur.com/GuA1e9O.jpeg","https://i.imgur.com/IpmrSpU.jpeg","https://i.imgur.com/qInSLdo.jpeg","https://i.imgur.com/u6jGXWb.jpeg"           ];
     var callback = () => api.sendMessage({body:`┏━━━━━━━━━━━━━┓
  𓋜ྀི─୨⍤⃝𝗖𝗼𝘂𝗽𝗹𝗲 𝗱𝗽 ─˚˖𓍢ִ໋🦢˚
      🎀✴⭐⭐✴🎀  
         ┊                 ┊   
         ┊                 ┊   
  𓋜─୨⍤⃝𝗖𝗼𝘂𝗽𝗹𝗲 𝗱𝗽 ─˚🎀💗᪲᪲᪲
┗━━━━━━━━━━━━━┛`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
