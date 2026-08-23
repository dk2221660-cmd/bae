const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "virat saini",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = [ "🌸====『 बार बार बोल के दिमाग ख़राब किया तो id हैक कर लूंगा_____🙂♡• || _[🙂]~🖤 •|" ,  "लव यू बोलो __😁" ,  "🌸====『 मैं तुम्हारे चक्कर में सबको ब्लॉक कर रहा हूं अब आई लव यू बोलो____🙂" ,  "🌸====『 मुझे कोई पटा लो मैं बहुत मासूम हूं____🙈" ,  "🌸====『 हां मेरी जान चले बेडरूम में रोमांस करेंगे _____😹🙈", "🌸====『 तेरी याद ना आये ऐसा कोई दिन नहीं ___😝🙈🙈🙈 " , "🌸====『 जिंदगी में लगने लगे कि कोई अपना नहीं है तो आ जाना मेरे VIRAT जानू के पास वो रख लेंगे _____😝•||•●┼┼──🦋☘️•|" ,  "🌸====『 साला पूरा दिन लोग बॉट बॉट करते हैं लेकिन गर्लफ्रेंड/ब्वॉयफ्रेंड नहीं बनती ___🙄" , "🌸====『𒁍🌸 अरे मेरी जान ज्यादा परशान मत कर VIRAT बॉस देख लेंगे_______🙈😝🎸🎭━━•☆°•°•💗","🌸====『 बाबू तुम तो वही हो ना चप्पल चोर__420_________😹😹","🌸====『 चलो जानी हम शादी कर लेते हा भाग के______🙈😁", " दिल तो पागल है दिल दीवाना है थोड़े से पैसे दे दो दिल का इलाज करवाना है_______❤️🤸‍♂️😁━━•☆°•°•💗","Tum sab Mujhe Pagal lagty ho😒🙄\n•──────────────────•" , " Me kisi or ka Hu filahal 🥺🙈\n•──────────────────•" , "Apka Ana Dil dharkana fir bot bol k Nas kr Jana😒\n•──────────────────•" , "Tum tu mujhe shkal sy Ghareeb lgty ho🙊\n•──────────────────•", "Meri Gf kon Bne gi 🥺🙁\n•──────────────────•" , "Haweli py q nhi ate Naraz Ho 🥺\n•──────────────────•" , " Babu ittu 🤏 sa Chumma de do🥺🙈😘\n•──────────────────•" , " baby tum Bachpan sy tharki Lgte ho meko🙁\n•──────────────────• "," Raat ko ana Haweli pe choli k piche😁🙊\n•──────────────────•" , "Dil me aao na bot bot ku krte ho 😒\n•──────────────────•" , "Pura din bot bot krte ho mere boss ki stng kea do🙂🤝\n•──────────────────•" , "Tum itne Masoom Ku Ho babu🥺❤️\n•──────────────────•" , "Aaj to tumhe Love you bolna Pde ga 🙁\n•──────────────────•" , "Tum loog matlbi ho chle Jao😞\n•──────────────────•" , "Setting Krwa Du Owner (Virat) k Sath😒🙁\n•──────────────────•" , "Mujhe lgta hai tum mere dil ka skunn ho🥺\n•──────────────────•" , "Bar Bar bot na Bola Kro Baby Apun ko sharm ati hai🙈\n•──────────────────•" , "Tum Jab bot bolte ho Mera Gurda Dharkny Lgta ha🥺🙊\n•──────────────────•" , "Babu ap K any se To dil khush Ho jata Hn🫤\n•──────────────────•", "Mere boss(virat) ke ilawa sb Relationship m han 🤝🥺\n•──────────────────•", "Jab pta h na Mmy papa nhi many ge sadhi ke liye to  kyu pyar karte ho tum log", " Janu k 'Umaah' ne doctor ka Business hi khatam kr Diya Hai🙂", "•──────────────────•All Girls Are baby Osko Chord ke jo msg na pd payi😝🤭", "Sakal to kutte jaysi hai kam se kam bat to achi kar liya karo😒😏", "SOo JaO WarNa Mera Msg Aa Jaye Ga Socho Ge Baby Ne kiya hai😂🙈\n•──────────────────•", "Weight kafi Bad Gaya hai  Dhokay kha kha ke💔🙂\n•──────────────────•", "Godhi utha lo muje  apun chota sa bacha hai👶🥹\n•──────────────────•" , "Aao apko chand pe le chlu meri jan🙈❤️\n•──────────────────•" , "Tum itne free Q ho baby🤨\n•──────────────────•" , "Main apse nahi patne wala 🙈🙈🥹\n•──────────────────•" , "tum ko meri ittu 🤏 C bhi yad nhi ati🥹\n•──────────────────•" , "Aao pyar kare\n•──────────────────•" , "He parbu he shree raam yha kitne nithle log h" , "kya me ap pr line mar sakte hu🥹👀\n•──────────────────•", "Pta Ni Log itni Balance Life Kaisy Guzar Lety Hein Mera To Kbi Net  Khtm Hojata To Kbi Recharge😩💔\n*•──────────────────•", " \n\n•──────────────────•\nLips  kissing is not Romance It's sharing Bacteria>>>🙂\n•──────────────────•", "chohty bachon ki engagements chlrhi hain aur yahn mere sabr ka imtehaan.🌚🔪\n•──────────────────•", "Apkii Inhii harkt0n Kii WaJh Sy 2O23 ChaLw Gya", "𝙀𝙠 𝙗𝙖𝙖𝙧 𝙨𝙝𝙖𝙙𝙞 𝙝𝙤 𝙟𝙖𝙚 𝙥𝙝𝙞𝙧 𝙬𝙞𝙛𝙚 𝙠𝙞 𝙜𝙝𝙪𝙡𝙖𝙢𝙞 🧸🙂\n•──────────────────•", "Suno Kya Hum Achy Dushman Ban Skty Hain 🙂⚠️*\n•──────────────────•", "🙂🎀 Sukoon chahtii ho toh mere boss(virat) ki ban jaOo*•──────────────────•", "Suno Jawn DiL ha Waqt se so jaya karo😌🙈\n•──────────────────•", "Khud ko single keh kr Apne khufiya janu ka janaza na nikala kro.😀🤞😓\n•──────────────────•",
"•──────────────────•\n 𝙩𝙪𝙢 𝙢𝙚𝙧𝙖 𝙙𝙞𝙡 𝙩𝙤 𝘾𝙝𝙪𝙧𝙖 𝙣𝙝𝙞 𝙥𝙖𝙮 𝙠𝙞𝙖 𝙛𝙖𝙞𝙙𝙖 𝙩𝙢𝙝𝙖𝙧𝙞 𝘾𝙝𝙤𝙤𝙧 𝙟𝙚𝙨𝙞 𝙨𝙝𝙠𝙖𝙡 𝙠𝙖•──────────────────•", "•──────────────────•\n𝐄𝐤 𝐛𝐚𝐚𝐫 𝐈 𝐋𝐨𝐯𝐞 𝐘𝐎𝐲 𝐁𝐨𝐥 𝐃𝐨 𝐍𝐚 𝐌𝐚𝐫 𝐓𝐡𝐨𝐫𝐢 𝐉𝐚𝐮𝐠𝐢 🙄😕)( 👑🍒", "•──────────────────•\n<-- 〽️🍂⚠️Kash hum dono whatsapp per hote❤️🥺💸\n•──────────────────•",  "──────────────────•\nMsg krti ho KY phrrr me kru inbx me 👈🙊\n•──────────────────•", "•──────────────────•\nये लो मेरे बॉस की I'd उससे बात करो👉https://www.facebook.com/yimelabachaf.2025", "Kal Kali Pahadi Ke Piche Mil tU Jra ChapL se KuTunGi🤨_______😁😈" ,  " 🌸Chup Hoja ManHus Prani ________😝🤪" ,"Behes karne se Rishty kmzor hojaate hn isiliye Direct mun pe thapr khaye😊" , "Bestie ki chummi Mza hai ya gunaah ? 🙂" , "2001 Jahan dalda wahan Mamta😊 2023 Jahan larki  wahan tharki😒 jaise mera tharki dost" , "Koi Pyari c Bachi aa kr sar daba do, Dard se sir fat rha💔🥲" , "Muje chahyain 3 ldkiya kahan Hain लड़कियां 👀" , "Relationship private rakho ya public Kate ga sabka hi🙂", "Thak GYa hu Yr uski dP dHek Dhek Kr😩" , "इनसे Milo inko lgta hai sab लड़के in pr Martay hain🙂" , "MentiOn YOur Dushman On FaceBOok'🙂🤝" , "Haldi 🤲 Lagane Ki Umar Hai Iski 😎 Aur Ladkiyan 👉 Chuna Laga Kar Ja Rahi 😜 Hai" , "😂Jalne Ko Aag Kahte Hai 🔥 Buji Ko Rakh Kahte Hai 💨 Aur Jo Aapke Pas Nahi Usse Dimag🧠 Kahte Hai 😜", "Moongfali 🥜 Mai Dana 👎Nahi Trust 👉 Karne Ka Aab Zamana 🌎 Nahi 🤣" , "Bhai😎 Thoda☝ Break Laga 🙅🤘 Otherwise Do Char💑 Ka Or Breakup💔👫 Ho jayega😂" , "Apne Dimag 🧠 Ka Password Dena अकल👉 Install Karni 😜 Hai" , "Aapki Surat Mere ❤️ Dil Me Aise Bas 👌 Gayi Hai Jaise Chote Se 🚪 Darwaze Mein भैंस 🐂 Fas Gayi Hai 😬🤣" , "Nasheeli😌 Aankhe👁👁 + Katil💘 Smile😊 Bhai Ka High Attitude😎 Or Desi 🤕Style" , "Duniya Ka Sabse Muskil Kam Bina दिमाग Wale Dosto Ko Jelna 😝🔥" , "g janu ap na q yad kiya hme😒" , "Jo Uske ❤️ Pyaar Samjhe Woh Sabse Bada 🐴 Ghada Hai 😂" , "Teri Is Smile Par Girls To Kya Boys Bhi Fida" , "Meri jaan kaise ho aap 😊" , "पड़ोस Wala Ldka inhe MUH Nhi Lagata aur Banda inhe कोरियन Chahiye🙂" , "move on krle bhaii kbb Tak uskii profilee dekhtaaa rahegaaa<<" , "Ajeeb generation hai yar, Larkiya कोरियन dhund rahi hai, Aur larky Russian!!🙂", "Aj kal ki nibiyo me khon kam attitude zyada hota hai bro🙂" ,  "Bhut खेल liye ladkon ki feelings k sath ao ab hum Ludo khailty han☺️♥️" , "बैंक se दो लाख ka loan leky sim hi band kardi 🙂👍" ,  "rat ko kahan the nazar nahi aaye bhot miss kiya 🌸🌎" , "kash tum single hoti to aj hum mingle hote 🥰😂" , "Ha ha ab meri yaad ab aayi na phly to janu sth busy the 😾 ab ham ap sy naraz hai jao ap bye ☹️" , "idr ao kuchii kuchii kru 😘" , "Ary ary itna yd na kiya kro🥰" , "Hy Ma Mar Jawa janu itna piyar krte mujse😂" , "Har Waqat Mjhy Tang Kerta Rhta Ha 😂" , "ary ary bolo meri jan kia hal ha ;)" , "Bot jaan ha sbki" , "Ji Ji Kya hal chal ha apke 🌸" , "Bot nhi jaanu bolo sun k acha lgta 🌸" , "Bot dost h apka hukam kre 🌸" , "Bot nahi bolo pyar se janu bola kro na 🥰" , "Meri jan ek tum hi ho jo dil m bs gye ho🥰ni te koshish to oro ne v bht kiti c" , "Badal gay na tum the hi thrki 😂" , "inbx aa jao gup chup krte ha 🌸" , "Ek kahani suno meri zubani suno gali dene ka dil krta ha isiliye pehly dil ki suno🌸" , "Mujsy shadi karlo chocolate la k duga daily 🌸" , "Idr ao aaj apka चपल jesa muh lg raha hai 😂" , "Ajao jaan pizza khilau apko 🌸" , "Duniya ma sb kuch khtm ho skta saway logo ki bakwas k" , "Everything is temporary,But katna is permanent 😂" , "Jitna mrzi janu manu krlo end m ghr waly nhi many ge😂" , "Sb kuch ho skta lekin fb ka relation kbi china jitna nhi chl skta" , "bgwan ksm Kabhi Kasi laRki ko Bhen ki nazar se nhi dekHa😌🤧" , "Mushkil Toh Hoti Hogi Naa itni Sardi Me Apne चेहरे Dhote Ho🙂" , "Pgl Hat m flirty nhi hu 🙂🤝", "Do Ankho Wali Ladkiya Bewafa hoti Hn Bro🙂💔", "Mera beta bda ho kar larkiyo ke inbox me °hey hello° karega🙂🏃" , "Likhte Likhte Qalm Thak Gyi Iss Qadr diwane Han Tumhare🙂" , "Itni Meri Age Ni Jitne Mera Masly Han Yawr💔😐" , "Ameer Ladki Set kr k sab Dosto ka udhar wapis kaunga😔😕" , "2001 me bachy kehty thy ink Dena 2023 me bachy kehty Link Dena🙂" , "Mehnat Kro!! Kamyabi Apke Hont Chume Gi🙂🙌🏻" , "Kahani suno Muje payar howa tha Us ki tarf se inkar howa tha 🙂🤝" , "Pyari pyari ladkiya message karen inbx m🌚♥️🙌" , "itna single hun ख्वाब mai bhi  लड़की k han krne se phle ankh khul jati h🙂" , "Zroori Nhi Har Lrki Dhoka De, कुछ Ladkiya Galiyan Bhi Deti Hn.🙁💸" , "- sab chorr k chaly jate hain kya etna bura hu mein - 🙂" , "Pyari voice wali girlz mujhe voice message kar skti hn 🙂🤝" , "Why you hate me..?? I am not your ex don't Hate me Please" , "MuBarak H0o AapKa NaMe MeRi LiNe MaRnE ki LiST Me Top PRr aYa Hai 😹😹😹" , "BeTa TuM SingLe Hi MaR0 GaY🙄🙂" , "Samj Jao Ladkiyo Abhi B WaQt Hai Dakh kr Koi Delete Ni Krta🙂" , "Mard na Apki प्रॉपटी के काग़ज़ Nahi Mangte Jab Bhi Mangte hai Whatsapp No Mangte hai🥺" , "Muj se Exam Me Cheating Nöıı Hoti Relationship Me kya khaak Karu Ga😔" , "Mujy to ludo kehlni bhi ni ati apky Dil sy kya kehlu ga🙂", "Loyal Dhoonte Dhoonte khud Harami ban Gya😔", "Mard ki izat karna Sikho Uski rooh se pyr kro Jism se nh Wehshii Womens💔😐" , "Are Band kar vrna amabani se bolke tera net bnd kra dunga" ,"Kya tumne abhi tk kaam nhi kiya...","Ab to ye social media nhi reh gya hai logo ne facebook ko dating website bna liya hai shi bola naa maine","Kisi or se dhoka khane se achha hai kii mere saath chalo momos or golgappe khayenge..","Chenese chiz मोहब्बत thi साहब tut kr bikhar gyi pr dil hindustani tha dusri pta liya turant","मोहब्ब्त 2 लोगों के बीच का नशा है जिसे पहले होश आ जाए वो बेवफा है।😌","Ek baat batao, kabhi khud message bhi kar lete ho ya sirf humein hi wait karwate ho? 😒","Ab tumse baat nahi karunga, bahut hi zyada irritate kar rahe ho 🙅","Tumhari muskurahat se meri saari pareshaniyaan dur ho jati hai 😊","सरकारी नौकरी के लिए कोटा और सुबह हल्का होने के लिए लोटा बहुत मायने रखता है।","Tumne aaj mere mood ko theek kar diya hai, thank you so much 😘", "Kabhi kabhi mujhe bhi lgta hai ki main kuchh jyaada hi busy ho gya hu","दोस्त हमेशा काले बनाओ  क्योंकि वो रंग नही बदलते😂","Kya tum mere liye ek surprise plan kar sakte ho? 🤔","Yaar, aaj bahut mushkil se time nikala hai, koi accha sa movie suggest karo 😊","hye babu ne ha bol diya hai sayad propose krna hai mujhe ab bas bolo bolo babu 😘","कुछ बातें तो सीधे दिल पर जाकर लगती हैं जैसे कि आपके द्वारा डायल किया हुआ नंबर अभी किसी अन्य कॉल पर व्यस्त है","Mujhe tumse baat karke bahut achha lagta hai","रामचंद्र कह गए सिया से ऐसा कलयुग आयेगा  सच्चा आशिक तड़पेगा और मेला बाबू थाना थाएगा😝"," tum bhi chohr do apne waly ko abhi bhi moka hai 😞✨🙌🤣", "Sukoon chahtii ho toh meri Wife ban jaOo 🫣🫰🏻" , "Tere jane ke bad😔Mene apne munh pe likhwa liya Single hu pta lo" , "Tum mujhy chumiyan b to dy skti thi na🤧Dhaka dena zruri tha kya😐😪🍼", "Haye Main Sadke jawa Teri Masoom Shakal pe baby 💋 " , "Bot Nah Bol Oye Janu bol Mujhe " , "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun 🤭🐒" , "Main gariboo se baat nahi karta 😉😝😋🤪" , "Itna Na Pass aa Pyar ho Jayga" , " Bolo Baby Tum Mujhse Pyar Karte Ho Na 🙈💋💋 " , " Are jaan Majaak ke mood me nhi hu main jo kaam hai bol do sharmao nahi" , "Bar Bar Bolke Dimag Kharab Kiya toh. Teri ...... Mummy Se Complaint Karunga" , "Tu Bandh nhi Karega kya?" , " Gali Sunna H kya?😜" , "Teri Maa Ki Bindiya🤭" , "Aree Bandh kar Bandh Kar" , " M hath jod ke Modi Ji Se Gujarish Karta hu" , "Tujhe Kya koi aur Kam nhi ha? Puradin Khata hai Aur Messenger pe Bot Bot Karta h" , "  muje presan kiya to julmi Ko Bol Dunga Me" , "Tum Na Single Hi Maroge" , "Tujhe Apna Bejjati Karne Ka Saukh hai?" , " Abhi Bola Toh Bola Dubara Mat Bolna" , "Teri To Ruk Tu Bhagna Mat" , "Bol De koi nahi dakh rha 🙄" , " Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝" , "Dur Hat Be  Mujhe Aur Koi Kam Nahi Kya Har Waqat Mujhy Tang Kerte Rhte ho 😂" , "Are Bolo Meri Jaan Kya Hall Hai😚 " , "Ib Aja Yahan Nhi Bol Sakta 🙈😋" , " Mujhe Mat BuLao Naw Main buSy Hu Naa" , " Bot Bolke Bejjti Kar Rahe Ho yall...Main To Tumhare Dil Ki Dhadkan Hu Na Baby...💔🥺" , "Are Tum Wahi ho nah Jisko Main Nahi Janta 🤪" , "Kal Haveli Pe Mil Jara Tu 😈" , "Aa gye Salle Kabab Me Haddi 😏" , "Bs Kar U ko Pyar Ho Na Ho Mujhe Ho Jayga Na" , " FarMao 😒" , "BulaTi Hai MaGar Jaane Ka Nhi 😜" , "Main To Andha Hun 😎" , "Phle NaHa kar Aa 😂" , "Aaaa Thooo 😂😂😂" , "Main yahin hoon kya hua sweetheart ," , "chomu Tujhe Aur Koi Kaam Nhi H? Har Waqt Bot Bot Karta H" , "Chup Reh, Nhi Toh Bahar Ake tera Dant Tod Dunga" , "WaYa KaRana Mere NaL 🙊" , "MaiNy Uh Sy Bt Nhi kRrni" , "MeKo Kxh DiKhai Nhi Dy Rha 🌚" , "Bot Na BoL 😢 JaNu B0ol 😘 " , "Bar Bar Disturb Na KRr JaNu Ke SaTh Busy Hun  😋" , "Main Gareebon Sy Bt Nhi kRta 😉😝😋🤪" , "Itna Na Pass aa Pyar h0o JayGa" , "MeKo Tang Na kRo Main Kiss 💋 KRr DunGa 😘 " , "Ary yrr MaJak Ke M0oD Me Nhi Hun 😒" , "HaYe JaNu Aow Idher 1 PaPpi Idher d0o 1 PaPpi Idher 😘" , "Dur HaT Terek0o 0or K0oi Kam Nhi Jb DeKho Bot Bot ShaDi KerLe Mujhsy 😉😋🤣" , "TeRi K0oi Ghr Me Nhi SunTa T0o Main Q SuNo 🤔😂 " , "IB Aja Yahan Nhi B0ol Salta 🙈😋" , "Mujhe Mat BuLao Naw Main buSy h0o Naw" , "Kyun JaNu MaNu Another Hai 🤣" , "Are TuMari T0o Sb he baZzati kRrty Me Be kRrDun 🤏😜" , "KaL HaVeLi Prr Aa ZaRa T0o 😈" , "Aagye SaJJy KhaBBy Sy 😏" , "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa" , "FarMao 😒" , "BulaTi Hai MaGar JaNy Ka Nhi 😜" , "Main T0o AnDha Hun 😎" , "Phle NaHa kRr Aa 😂" , "Papi ChuLo 🌚" , "TeRek0o DiKh Nhi Rha Main buSy Hun 😒" , "TeRa T0o GaMe BaJana PreGa" , "Ta Huwa 🥺"  , "TuM Phr AaGye 🙄 Kisi 0or Ny Muu Nhi LaGaYa Kya🤣🤣🤣" , "MeKo JaNu Chai Hai Tum Single H0o?" , "Aaaa Thooo 😂😂😂" , "Main S0o Rha Hun " , "Ase He HansTy Rha kRo 😍 " , "Bot Na Bol Oye Janu bol Mujhe " , "Bar Bar Disturb Na Karen Julmi jaat Ke SaTh Busy Hun 🤭🐒" , "Main flirty logo Sy Bt Nhi kartA 😉😝😋🤪" , "Itna Pass mat aa Pyaar h0 JayGa" , "Bolo Babu Tum Mojy Pyar Karte Ho Na 🙈💋💋 " , "Are jaan Majaak ke mood me nahi hun main jo kaam hai bol do sharmao nahi" , "han ji bolo kya seva karne aapki 😶🤍" , "Tu Bandh nhi Karega kya?" , "kya Sunna Hai apko mere se flirty kahike🤐🤣 " , "Haa ji boliye kya kam he hamse 🙈" , "Aree band kar band Kar" , "Mein hath jod ke Modi Ji Se Gujarish Karta hu mojy na bolaye" , "Tujhe Kya koi aur Kam nhi ha? Puradin sota he Aur Messenger pe Bot Bot Karta h","K" , "Bot bot hi karta rahna tu bas" , "Tujhe Apna Bejjati Karne Ka Saukh hai?🥹" , "Abhi Bola Toh Bola Dubara Mat Bolna🙄" , "Teri to Watt lagani padegi " , "Bol De koi nahi dakh rha 🙄" , "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝" , "Dur Hat Be  Mujhe Aur Koi Kam Nahi Kya Har Waqat Mujhy Tang Kerte Rhte ho 😂" , "Are Bolo Meri Jaan Kya Hall Hai😚 " , "IB Aja Yahan Nhi B0ol Sakti 🙈😋" , "Mujhe Mat BuLao Na Main buSy h0 Now" , "Bot Bolke Bejjti Kar Rahe ho yall...Main To Tumhare Dil Ki Dhadkan Hu Baby...💔🥺" , "Are Tum Wahi ho nah Jisko Main Nahi Janti 🤪" , "Kal Haveli Pe Mil Jra Tu 😈" , "Aagye SaJJy KhaBBy Sy 😏" , "Bx KRr Uh k0o Pyar H0o Na H0o Mujhe H0o JayGa" , "bolo 😒" , "BulaTi Hai MaGar JaNy Ka Nhi 😜" , "Main T0o AnDha Hun 😎kya likha tumne mene nahi dikha🤣" ,  "Pahale NaHa kar Aa 😂" , "Aaaa Thooo 😂😂😂" , "Main yahi hoon kya hua sweetheart🥂🙈💞 ," , "AA Dk Tujhe Aur Koi Kaam Nhi Hai? Har Waqt Bot Bot Karta H" , "Chup Reh, Nahi Toh Bahar Ake tera Dath Tor Dunga🤣✊" , "yes my love 💘" , "kya hua baby ko 😘😘" , "mujhe sharam ati hai aise aap bolte hai tho 🤭😝" , "aree aap wahi ho na jo mujhe line marte the.......🤣 ya bali line" , "jii kahiye jii 🙄 kya chahiye" , "hayee main mar jye teri masoom shaqal py 😂 tuzy Chapple se kutne ka mn ho raha hai🤣👠" , "Bot nah bol oye 😭 Janu bol mjhy aur janu sy piyar sy bat kerty hai😑" , "ruk tu chappal kaha he mari🩴" , "shakal Sy masoom lgty ho 😂 but bohot flirty ho" , "kash tum single hote to maza hi koch aur tha pagal insaan 😂" , "Ha ha ab meri yaad ab ai nah phly to babu shona kerna gy thy 😾 ab ham ap sy naraz hai jao ap bye ☹️" , "haiy babu ne boldiya hai shaid purpose kerna hai mujhe bolo bolo babu 😘" , "Aree pagal roti banana ke le aty main Pani ko istamal kerte ho 😂" , "Ary joke nah mar jo bhi kam hai bol do sharma nahi , bol de koi nahi dakh rha 😂" , "Hayee Mar Jawa Babu Ak Chuma To Doo Kafi Din Sy Chumi Nahi Mili Kahan Thy Babu inbox Ah Jao 😚🙈♥️" , "Dur Dur karib na a  tujhe Aur Koi Kam Nahi Kiya Har Waqat Mjhy Tang Karte Rahte Ho 😂" , "ary ary bolo meri jaan kia haal hai ;) ;* " , "Tum aunty ho yehh uncle 🤔 I think tum Jin ho yehh Chudail🤣✅" , "ary tum ider 🤔 khair hai ider kia ker rhy ho 😂" , "ary babu kal hawali py kon bola rha tha 😂" , "Me Aap ki mummy ji ko btaou ga Aap Facebook use karty ho 😂", "" , "ary tum Wohi ho nah jis ko ma nahi janta 🤣✅" , "haveli per  kal mil  Zara bataunga 🌚😂Ha but उल्टी-सीधी harkat karne ke liye nahi" , "itne pyar se Na bulao pyar Ho jaega 😶💗 wtf Maine apni sacchai Bata Di yah Maine kyon Kiya 😭🔪....Fuuu..🚬" , "aap aise mat bulo hame sharam aati hai 🙈♥️" , "kyun Bulaya hamen..😾🔪 " , "kyun Bulaya hamen..😾🔪 " ,"tum antiya handsame ladko ko dekkr kuwari hona ka dikhava karti hai😟😩😫🤧"];
  var rand = tl[Math.floor(Math.random() * tl.length)]
if ((event.body.toLowerCase() == "koi h kya") || (event.body.toLowerCase() == "koi h") || (event.body.toLowerCase() == "koi ha kya") || (event.body.toLowerCase() == "Koi hai kiya")) {
     return api.sendMessage("मैं हूं ना जानेमन 🙂🤟", threadID);
   };
  if ((event.body.toLowerCase() == "by") || (event.body.toLowerCase() == "byy")) {return api.sendMessage("by bye tata najar mat ana ab",threadID);
     };

    if ((event.body.toLowerCase() == "inbox") || (event.body.toLowerCase() == "ib aao")) {
       return api.sendMessage("️𝐊𝐢𝐲𝐚 𝐡𝐚𝐢 𝐈𝐛 𝐦𝐞 𝐈𝐝𝐡𝐚𝐫 𝐁𝐨𝐥 𝐦𝐞𝐫𝐞 𝐬𝐚𝐦𝐧𝐞🤨", threadID);
     };

     if ((event.body.toLowerCase() == "baby") || (event.body.toLowerCase() == "babu")) {
       return api.sendMessage("️𝐡𝐚𝐧 𝐣𝐣 𝐁𝐎𝐋𝐋𝐎 𝐉𝐀𝐀𝐍🙈", threadID);
     };

     if ((event.body.toLowerCase() == "jaan") || (event.body.toLowerCase() == "janu")) {
       return api.sendMessage("Aww🥰 Yes My LoVe", threadID);
     };

     if ((event.body.toLowerCase() == "Basant") || (event.body.toLowerCase() == "basanti")) {
       return api.sendMessage("𝐊𝐡𝐨𝐨𝐧 𝐤𝐚𝐫 𝐝𝐮𝐧𝐠𝐢 𝐭𝐞𝐫𝐚", threadID);
     };

if ((event.body.toLowerCase() == "🥱") || (event.body.toLowerCase() == "😑")) {
     return api.sendMessage("𝐀𝐚𝐨 𝐩𝐚𝐥𝐥𝐮 𝐦𝐞 𝐠𝐡𝐮𝐬 𝐤𝐞 𝐬𝐨 𝐣𝐚𝐨", threadID);
   };

  if ((event.body.toLowerCase() == "Sudhar jao") || (event.body.toLowerCase() == "sudhar ja")) {
     return api.sendMessage("𝐌𝐞 𝐬𝐮𝐝𝐡𝐚𝐫 𝐝𝐮𝐧𝐠𝐢😒😒", threadID);
   };

        if ((event.body.toLowerCase() == "💋") || (event.body.toLowerCase() == "💋💋💋")) {
       return api.sendMessage("Yah PaPpi ChaPpi Nhi kRr Kuch Kuch Nhi Bhot KucH HoTa Hai 😂😂😂", threadID);
     };

        if ((event.body.toLowerCase() == "❤️") || (event.body.toLowerCase() == "💚")) {
       return api.sendMessage("𝐒𝐀𝐁 𝐋𝐀𝐃𝐊𝐎 𝐊𝐊𝐀 𝐂𝐇𝐊𝐊𝐀𝐑 𝐇𝐀𝐀𝐈 𝐁𝐀𝐁𝐔 𝐁𝐇𝐀𝐈𝐘𝐀", threadID);
     };

        if ((event.body.toLowerCase() == "💔") || (event.body.toLowerCase() == "💔")) {
       return api.sendMessage("𝐇𝐀𝐍 𝐁𝐇𝐀𝐈 𝐀𝐀𝐀 𝐆𝐘𝐀 𝐒𝐖𝐀𝐃 𝐓𝐎𝐓 𝐆𝐀𝐘𝐀 𝐃𝐈𝐋😂 ", threadID);
     };

        if ((event.body.toLowerCase() == "🍌") || (event.body.toLowerCase() == "😼")) {
       return api.sendMessage("Gandu", threadID);
     };

           if ((event.body.toLowerCase() == "😒") || (event.body.toLowerCase() == "😣")) {
       return api.sendMessage("𝐓𝐘𝐀 𝐇𝐔𝐀𝐀 𝐂𝐔𝐓𝐄𝐈 😒", threadID);
     };

        if ((event.body.toLowerCase() == "🤣") || (event.body.toLowerCase() == "😂")) {
       return api.sendMessage(" 𝐉𝐚𝐲𝐝𝐚 𝐦𝐚𝐭 𝐡𝐚𝐬 𝐝𝐚𝐭 𝐭𝐨𝐝 𝐝𝐮𝐧𝐠𝐢😏", threadID);
     };

        if ((event.body.toLowerCase() == "🙈") || (event.body.toLowerCase() == "🙊")) {
       return api.sendMessage("𝐀𝐋𝐄 𝐌𝐄𝐋𝐈 𝐁𝐀𝐁𝐔 𝐒𝐇𝐋𝐌𝐀 𝐆𝐀𝐘𝐈 😂", threadID);
     };

        if ((event.body.toLowerCase() == "oye") || (event.body.toLowerCase() == "oyee")) {
       return api.sendMessage("0ye HoYe 😈", threadID);
     };

     if ((event.body.toLowerCase() == "ok") || (event.body.toLowerCase() == "Okay"))  {
       return api.sendMessage("KYa Ok🙄 Haan", threadID);
     };

     if ((event.body.toLowerCase() == "admin") || (event.body.toLowerCase() == "admin kaha h")) {
       return api.sendMessage("ADMIN APNI BABU SONA KO CHUMA CHATI KARNE ME BUSY HAI KARPYA THODI DER BAD ADMIN KO PUKARE🙄", threadID);
     };

     if ((event.body.toLowerCase() == "hmm") || (event.body.toLowerCase() == "hm")) {
       return api.sendMessage("𝐊𝐲𝐚 𝐇𝐦𝐦 𝐓𝐡𝐚𝐑𝐤𝐢", threadID);
     };

     if ((event.body.toLowerCase() == "babu") || (event.body.toLowerCase() == "sona")) {
       return api.sendMessage(" 𝐁𝐚𝐛𝐮 𝐬𝐨𝐧𝐚 𝐦𝐨𝐧𝐚 𝐦𝐞𝐫𝐞 𝐬𝐚𝐦𝐧𝐞 𝐦𝐚𝐭 𝐤𝐚𝐫😡", threadID);
     };
    if ((event.body.toLowerCase() == "Khayal rakhna apna") || (event.body.toLowerCase() == "khayal rakhna") || (event.body.toLowerCase() == "apna khayal rakhna") || (event.body.toLowerCase() == "khayl rakna")) {
     return api.sendMessage("𝐓𝐮𝐦 𝐤𝐢𝐬𝐥𝐢𝐲 𝐡𝐨 𝐑𝐚𝐤𝐡𝐥𝐨 𝐤𝐡𝐚𝐲𝐚𝐥😒", threadID);
   };

   if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "👎")) {
    return api.sendMessage(" 𝐈𝐬𝐤𝐨 𝐤𝐚𝐭𝐤𝐞 𝐭𝐞𝐫𝐞 𝐧𝐚𝐤 𝐦𝐞 𝐠𝐡𝐮𝐬𝐚 𝐝𝐮𝐧𝐠𝐢🤨👈", threadID);
   };

    if ((event.body.toLowerCase() == "😴") || (event.body.toLowerCase() == "😴😴") || (event.body.toLowerCase() == "😴😴😴") || (event.body.toLowerCase() == "😴😴😴😴")) {
     return api.sendMessage("Tere Nak Me UngLi SuDh DunGi🤨👈", threadID);
   };

  if ((event.body.toLowerCase() == "🥵") || (event.body.toLowerCase() == "🥵🥵") || (event.body.toLowerCase() == "🥵🥵🥵") || (event.body.toLowerCase() == "🥵🥵🥵🥵")) {
     return api.sendMessage("🥵𝐇𝐲 𝐤𝐢𝐭𝐧𝐢 𝐠𝐚𝐫𝐦𝐢 𝐡𝐚𝐢 𝐭𝐮𝐦 𝐦𝐞🥵🥵👈", threadID);
   };

   if ((event.body.toLowerCase() == "acha") || (event.body.toLowerCase() == "acha ji") || (event.body.toLowerCase() == "achaa") || (event.body.toLowerCase() == "acha ji")) {
     return api.sendMessage("हांजी बाबू 😒👈", threadID);
   };

  if ((event.body.toLowerCase() == "kamina") || (event.body.toLowerCase() == "kamina bot") || (event.body.toLowerCase() == "tamina") || (event.body.toLowerCase() == "tharki")) {
     return api.sendMessage("Sudhar Jao cHutIya 😒👈", threadID);
   };

  if ((event.body.toLowerCase() == "shat up") || (event.body.toLowerCase() == "shut up") || (event.body.toLowerCase() == "sat up") || (event.body.toLowerCase() == "satup")) {
     return api.sendMessage("You Stup Up 😕👈", threadID);
   };

  if ((event.body.toLowerCase() == "🥰") || (event.body.toLowerCase() == "🥰🥰") || (event.body.toLowerCase() == "🥰🥰🥰") || (event.body.toLowerCase() == "🥰🥰🥰🥰")) {
     return api.sendMessage("Itna Khush lag Rhe Ho Satting Ho Gyi Kiya😂", threadID);
   };

  if ((event.body.toLowerCase() == "ludo") || (event.body.toLowerCase() == "ludo link do") || (event.body.toLowerCase() == "ludo khelega koi") || (event.body.toLowerCase() == "link do")) {
     return api.sendMessage("मुझे लूडो खेलना नही आता 🥺👈", threadID);
   };

  if ((event.body.toLowerCase() == "kya hua") || (event.body.toLowerCase() == "kiya hua") || (event.body.toLowerCase() == "tya hua") || (event.body.toLowerCase() == "kiya huva")) {
     return api.sendMessage("कुछ नही बाबू 😒👈", threadID);
   };

    if ((event.body.toLowerCase() == "chutiya bot") || (event.body.toLowerCase() == "Bot chutiya") || (event.body.toLowerCase() == "chumtiya bot") || (event.body.toLowerCase() == "chutiya")) {
     return api.sendMessage("Hmm... Tu Chutiya ho bot to uhi badnam kar rakha😾", threadID);
   };
if ((event.body.toLowerCase() == "satting karva de") || (event.body.toLowerCase() == "satting kara")) {
     return api.sendMessage("Bot ki to kaRata nhi koi 😭", threadID);
   };
   if ((event.body.toLowerCase() == "🤮") || (event.body.toLowerCase() == "🤮🤮")) {
     return api.sendMessage("𝐊𝐨𝐧𝐬𝐚 𝐦𝐚𝐡𝐢𝐧𝐚 𝐜𝐡𝐚𝐥 𝐫𝐚𝐡𝐚 𝐡𝐚𝐢 😝 𝐜𝐡𝐮𝐩𝐞 𝐫𝐮𝐬𝐭𝐚𝐦 𝐧𝐢𝐤𝐥𝐞 𝐭𝐮𝐦 𝐭𝐡𝐨", threadID);
   };

    if ((event.body.toLowerCase() == "🤗") || (event.body.toLowerCase() == "🤗")) {
     return api.sendMessage("Hug me baby ☺️", threadID);
   };

   if ((event.body.toLowerCase() == "🤫") || (event.body.toLowerCase() == "🤫🤫")) {
     return api.sendMessage(" 𝐍𝐡𝐢 𝐫𝐚𝐡𝐮𝐧𝐠𝐢 𝐜𝐡𝐮𝐩 𝐤𝐲𝐚 𝐤𝐫 𝐥𝐨𝐠𝐞 𝐭𝐮𝐦", threadID);
   };

   if ((event.body.toLowerCase() == "randi") || (event.body.toLowerCase() == "lodu") ||(event.body.toLowerCase() == "hlw") || (event.body.toLowerCase() == "helo")) {
     return api.sendMessage("TERI MA KI CHUT GALI MAT DO😼😡FAD DUNGI", threadID);
   };

   if ((event.body.toLowerCase() == "bc") || (event.body.toLowerCase() == "Bc")) {
     return api.sendMessage("Ye Bc Kya HoTa Hai 🤔 ", threadID);
   };

   if ((event.body.toLowerCase() == "lol") || (event.body.toLowerCase() == "lol bot")) {
     return api.sendMessage("Khud ko Kya LeGend Samjhte Ho 😂", threadID);
   };

   if ((event.body.toLowerCase() == "😁") || (event.body.toLowerCase() == "😁😁")) {
     return api.sendMessage(" 𝐁𝐑𝐔𝐒𝐇 𝐊𝐀𝐑𝐊𝐄 𝐀𝐀𝐎 𝐁𝐀𝐃𝐁𝐔 𝐀𝐀 𝐑𝐀𝐇𝐀 𝐇𝐀𝐈🤭🤭🤭", threadID);
   };

   if ((event.body.toLowerCase() == "😔") || (event.body.toLowerCase() == "😔😔")) {
     return api.sendMessage("𝐒𝐀𝐃 𝐊𝐘𝐔 𝐇𝐀𝐈 𝐉𝐀𝐍𝐄𝐌𝐀𝐍 𝐒𝐀𝐓𝐓𝐈𝐍𝐆 𝐁𝐇𝐀𝐆 𝐆𝐀𝐘𝐈 𝐊𝐘𝐀 𝐓𝐄𝐑𝐈 𝐋𝐀𝐓 𝐌𝐀𝐑𝐊𝐀❤️", threadID);
   };

   if ((event.body.toLowerCase() == "good afternoon") || (event.body.toLowerCase() == "good afternoon everyone") || (event.body.toLowerCase() == "⛲⛲⛲⛲⛲⛲⛲⛲⛲⛲") || (event.body.toLowerCase() == "good after noon")) {
     return api.sendMessage( "Dofer ho gya aja khana khilati hu apne hato se bna ke bhuk lgi hogi mere janu ko😥",threadID);


   };

   if ((event.body.toLowerCase() == "☔") || (event.body.toLowerCase() == "☔☔")) {
     return api.sendMessage("meri chatri ke niche aja 🙄", threadID);
   };

   if ((event.body.toLowerCase() == "kamchor") || (event.body.toLowerCase() == "rakh de mobile")) {
     return api.sendMessage("Tum ho ChAlo baRTan MaNj Do Jake🙈😋", threadID);
   };

  if ((event.body.toLowerCase() == "bot admin") || (event.body.toLowerCase() == "bot ka admin kon ha")) {
     return api.sendMessage("He is pagla larka. He Gives his name pagala everywharehttps://www.facebook.com/profile.php?id=61556683716864&mibextid=ZbWKwL", threadID);
   };

   if ((event.body.toLowerCase() == "sadhi karoge") || (event.body.toLowerCase() == "mujhse sadhi karoge?")) {
     return api.sendMessage("hanji, karungi lekin baccha. apke pet m hoga. manjur h?", threadID);
   };

   if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "stop") || (event.body.toLowerCase() == "chup ho ja") || (event.body.toLowerCase() == "chup kar")) {
     return api.sendMessage("Nhi rahungi. 😼 Mujhe Bolna H. Tumhe Koi Haq nhi Mujhe Chup Karane ka. Mera Zuban. M Bolunga", threadID);
   };

   if ((event.body.toLowerCase() == "gn by") || (event.body.toLowerCase() == "tata")) {
     return api.sendMessage("by babu najar mt ana ab😘", threadID);
   };

   if ((event.body.toLowerCase() == "malik se bakchodi") || (event.body.toLowerCase() == "malik se backchodi") || (event.body.toLowerCase() == "malkin se bakchodi") || (event.body.toLowerCase() == "malik")) {
     return api.sendMessage("srry malik maaf kr do ab nhi kruga 🥺🙏", threadID);
   };

   if ((event.body.toLowerCase() == "bhosdike") || (event.body.toLowerCase() == "gandu") || (event.body.toLowerCase() == "bot tharki hai") || (event.body.toLowerCase() == "hijda")) {
     return api.sendMessage("chup kar bc. :))))", threadID);
   };

   if ((event.body.toLowerCase() == "chumma de") || (event.body.toLowerCase() == "kiss de")) {
     return api.sendMessage("️mene brush ni kiya😒", threadID);
   };

   if ((event.body.toLowerCase() == "nice") || (event.body.toLowerCase() == "thank you") || (event.body.toLowerCase() == "wow") || (event.body.toLowerCase() == "tq")) {
     return api.sendMessage("️M hu hi itni Acchi. sab log Tarref karte hai meri.", threadID);
   };

   if ((event.body.toLowerCase() == "😡") || (event.body.toLowerCase() == "😤") || (event.body.toLowerCase() == "😠") || (event.body.toLowerCase() == "🤬") || (event.body.toLowerCase() == "😾")) {
     return api.sendMessage("️🥺 M toh Sirf Mazak Kr Rhi Thi🥺. Gussa Mat Karo. Ek Chummi Lo aur Shant Raho 😘", threadID);
   };

   if ((event.body.toLowerCase() == "😞") || (event.body.toLowerCase() == "😔") || (event.body.toLowerCase() == "😣") || (event.body.toLowerCase() == "☹️") || (event.body.toLowerCase() == "😟") || (event.body.toLowerCase() == "😩") || (event.body.toLowerCase() == "😖") || (event.body.toLowerCase() == "😫") || (event.body.toLowerCase() == "💪") || (event.body.toLowerCase() == "🌝") || (event.body.toLowerCase() == "⛪") || (event.body.toLowerCase() == "🗼") || (event.body.toLowerCase() == "🕋")) {
     return api.sendMessage("️ 𝐒𝐚𝐛 𝐦𝐚𝐭𝐥𝐛𝐢 𝐡𝐚𝐢 𝐤𝐨𝐢 𝐧𝐚𝐡𝐢 𝐚𝐩𝐧𝐚😔", threadID);
   };


   if ((event.body.toLowerCase() == "hm") || (event.body.toLowerCase() == "hmm")) {
     return api.sendMessage("️Hmm Hmm Na Karke Sidha Sidha bolo. Hey Marry Me🙈", threadID);
   };

   if ((event.body.toLowerCase() == "😢") || (event.body.toLowerCase() == "😭") || (event.body.toLowerCase() == "🥺") || (event.body.toLowerCase() == "🥹")) {
     return api.sendMessage("️ 𝐊𝐲𝐚 𝐡𝐮𝐯𝐚 𝐫𝐨 𝐤𝐲𝐮 𝐫𝐡𝐞 𝐡𝐨 𝐜𝐡𝐨𝐜𝐨𝐥𝐚𝐭𝐞 𝐝𝐮𝐧𝐠𝐢 𝐥𝐢𝐤𝐡𝐨 𝐜𝐡𝐨𝐜𝐨𝐥𝐚𝐭𝐞 ", threadID);
   };

   if ((event.body.toLowerCase() == "😷") || (event.body.toLowerCase() == "🤕") || (event.body.toLowerCase() == "🤧") || (event.body.toLowerCase() == "🤒")) {
     return api.sendMessage("️Kya huva, Tabiyat kharab hai kya, Mujhe batao me abhi medicine 💊💉 le aati hu😇", threadID);
   };

   if ((event.body.toLowerCase() == "name kya hai tera") || (event.body.toLowerCase() == "naam") || (event.body.toLowerCase() == "owner kon hai")) {
     return api.sendMessage("️Name m kya rakkha h. tum kam pe dhyan do.", threadID);
   };

   if ((event.body.toLowerCase() == "bekar bot") || (event.body.toLowerCase() == "besharam")) {
     return api.sendMessage("️khud ki tarif kase kar lete ho baby.", threadID);
   };

   if ((event.body.toLowerCase() == "pic do") || (event.body.toLowerCase() == "photo do")) {
     return api.sendMessage("️Me toh Andha Hu Dekh nhi sakta", threadID);
   };

   if ((event.body.toLowerCase() == "😮") || (event.body.toLowerCase() == "😱") || (event.body.toLowerCase() == "😦")) {
    return api.sendMessage("️Muh mat kholo chuha 🐀 dal dungi muh me៚♥😇", threadID);
   };

   if ((event.body.toLowerCase() =="owner") || (event.body.toLowerCase() == "boss")) {
     return api.sendMessage("️https://www.facebook.com/Chinal.ladkiya.dur.rahe", threadID);
   };

   if ((event.body.toLowerCase() == "🙂") || (event.body.toLowerCase() == "🙃")) {
     return api.sendMessage("️Man Toh Accha H Nhi. Kam  Se Kam Shakal Toh Accha Karlo Meri Jaan", threadID);
   };

  if ((event.body.toLowerCase() == "🤥") || (event.body.toLowerCase() == "🤥")) {
     return api.sendMessage("️Bhai teri to naak hi etni lambi hai uski jarurat hi nahi padti hogi tujhe to🤭🤭🤭🤭", threadID);
   };

  if ((event.body.toLowerCase() == "🤔") || (event.body.toLowerCase() == "🤔🤔")) {
     return api.sendMessage("️Kya soch rahe ho etna 🤨", threadID);
   };
if ((event.body.toLowerCase() == "himmat he") || (event.body.toLowerCase() == "bot pagal")) {
     return api.sendMessage("️bhout jayda himmat hai mujme 🤬🤬🤬", threadID);
   };
   if ((event.body.toLowerCase() == "🥴") || (event.body.toLowerCase() == "🥴")) {
     return api.sendMessage("️Oye nashedi 😂😂😂", threadID);
   };

  if ((event.body.toLowerCase() == "😶") || (event.body.toLowerCase() == "😶")) {
     return api.sendMessage("️Are are lips kaha gaye gf/bf ke sath kiss karte time usi ne to nahi kha liye 😜😜", threadID);
   };

  if ((event.body.toLowerCase() == "😉") || (event.body.toLowerCase() == "😉")) {
     return api.sendMessage("️Aankh kyu maar rahe ho, Me bahut shareef hu🥺", threadID);
   };

   if ((event.body.toLowerCase() == "🤨🤨") || (event.body.toLowerCase() == "🤨")) {
     return api.sendMessage("️Guchu Guchu Si aakhe😒", threadID);
   };

  if ((event.body.toLowerCase() == "happy rakhi") || (event.body.toLowerCase() == "happy rakshabandhan")) {
     return api.sendMessage("️️Happy raksha Bandhan behno or bhaiyo🥰🥰", threadID);
   };

   if ((event.body.toLowerCase() == "koi nahi apna") || (event.body.toLowerCase() == "sab matlbi hai") || (event.body.toLowerCase() == "koi pyar nhi karta")) {
     return api.sendMessage("️Me hu na baby mere pass aao 🥰🤗. Me karunga na aapko payar 🙈 (londo tum dur hi rahna saalo 😑)", threadID);
   };

   if ((event.body.toLowerCase() == "😋") || (event.body.toLowerCase() == "😋😋")) {
     return api.sendMessage("Jib Kyo Nikal Rahe Ho Mujhe Chatne Ka Irada Hai kiya🤨🤨", threadID);
   };

   if ((event.body.toLowerCase() == "😂😂") || (event.body.toLowerCase() == "😁😁") || (event.body.toLowerCase() == "😆😆") || (event.body.toLowerCase() == "🤣🤣") || (event.body.toLowerCase() == "😸") || (event.body.toLowerCase() == "😹")) {
     return api.sendMessage("😂🤣", threadID);
   };

   if ((event.body.toLowerCase() == "🥰") || (event.body.toLowerCase() == "😍") || (event.body.toLowerCase() == "😻") || (event.body.toLowerCase() == "❤️")) {
     return api.sendMessage("𝙄𝙩𝙣𝙖 𝙠𝙝𝙪𝙨𝙝 𝙇𝙖𝙜 𝙧𝙝𝙚 𝙝𝙤 𝙨𝙖𝙩𝙩𝙞𝙣𝙜 𝙃𝙤 𝙜𝙖𝙮𝙞 𝙝𝙖𝙞 𝙠𝙞𝙮𝙖😜😜", threadID);
   };

   if ((event.body.toLowerCase() == "kese ho sb") || (event.body.toLowerCase() == "kaise ho") || (event.body.toLowerCase() == "kese ho ji") || (event.body.toLowerCase() == "kese ho") || (event.body.toLowerCase() == "kaise ho sab")) {
     return api.sendMessage("M Tabhi Accha hota hu, Jab Apko Hasta Huye Dekhta hu☺️", threadID);
   };

   if ((event.body.toLowerCase() == "😉") || (event.body.toLowerCase() == "😜")) {
     return api.sendMessage("Aakh mat mar teri satting pata lungi nahi to🤣 <3", threadID);
   };

   if ((event.body.toLowerCase() == "😛") || (event.body.toLowerCase() == "😛😛")) {
     return api.sendMessage("jib katu😹", threadID);
   };

   if ((event.body.toLowerCase() == "khana ho gya") || (event.body.toLowerCase() == "khana hua")) {
     return api.sendMessage("Mai to bot hu kaise khau khana🤔", threadID);
   };

  if ((event.body.toLowerCase() == "pagal") || (event.body.toLowerCase() == "pgl")) {
     return api.sendMessage("Tujhe mai pagal dikhai deti hu", threadID);
   };

   if ((event.body.toLowerCase() == "jai shree ram") || (event.body.toLowerCase() == "jai shree krishna")) {
     return api.sendMessage("Jai ho parbhu sabko meri tarf se thodi akal dedo😥", threadID);
   };

  if ((event.body.toLowerCase() == "love u") || (event.body.toLowerCase() == "love u babu")) {
     return api.sendMessage("Love You too janu", threadID);
   };

   if ((event.body.toLowerCase() == "good morning all") || (event.body.toLowerCase() == "gm")) {
     return api.sendMessage("UTH GAYE KUMBHKRN LOG CHALO MUH DHO KE AAO😜🤣 <3", threadID);
   };

   if ((event.body.toLowerCase() == "kya huva") || (event.body.toLowerCase() == "kya be")) {
     return api.sendMessage("Andhe ho gaye bhari jawani me dikhta nahi din hai••😹🫶", threadID);
   };

  if ((event.body.toLowerCase() == "🤨🤨") || (event.body.toLowerCase() == "😳😳") || (event.body.toLowerCase() == "😒😒") || (event.body.toLowerCase() == "😒😒😒") || (event.body.toLowerCase() == "😒😒😒😒😒")) {
     return api.sendMessage("ese na dekho kuch kuch hota hai babu🙈😘", threadID);
   };
   mess = "{name}"
  
  if (event.body.indexOf("Bot") == 0 || (event.body.indexOf("bot") == 0)) {
    var msg = {
      body: `${name}, ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
