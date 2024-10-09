const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "gay",
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡", // New version 
    countDown: 1,
    role: 0,
    shortDescription: "gay poster",
    longDescription: "",
    category: "fun",
    guide: "{pn} {{[on | off]}}",
    envConfig: {
      deltaNext: 5
    }
  },

  langs: {
    vi: {
      noTag: "Tag the gay user"
    },
    en: {
      noTag: "You must tag one user "
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) 
  {

    let mention = Object.keys(event.mentions)
    let uid;

  

    if(event.type == "message_reply"){
    uid = event.messageReply.senderID
    } else{
      if (mention[0]){
        uid = mention[0]
      }else{
        console.log(" jsjsj")
        uid = event.senderID}
    }

let url = await usersData.getAvatarUrl(uid)
let avt = await new DIG.Gay().getImage(url)


 
      const pathSave = `${__dirname}/tmp/gay.png`;
  fs.writeFileSync(pathSave, Buffer.from(avt));
    let body = "𝘎𝘢𝘺 𝘜𝘴𝘦𝘳⛔💁"
    if(!mention[0]) body="𝘛𝘩𝘪𝘴 𝘶𝘴𝘦𝘳 𝘪𝘴 𝘎𝘢𝘺💁⛔"
    message.reply({body:body,
attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));


  }
    }
