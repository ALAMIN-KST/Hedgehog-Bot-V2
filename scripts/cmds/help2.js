const fs = require('fs');

module.exports = {
  config: {
    name: "help2",
    version: "1.0",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡", // don't change credits 
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "utility",
  },
 
  onStart: async function() {},
 
  onChat: async function({ event, message, getLang, api }) {
   const link = [
"https://i.imgur.com/AWOJTqj.png",
"https://i.imgur.com/zxYs4cd.png",
"https://i.imgur.com/WGfrlr7.png",
"https://i.imgur.com/HUpKEbR.png",
"https://i.imgur.com/clnOOc1.png",
]
  let img =
link[Math.floor(Math.random()*link.length)]
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "#help":
          const replies = [
            "",
          ];
          api.setMessageReaction("💿", event.messageID, event.messageID, api); 
          const randomIndex = Math.floor(Math.random() * replies.length);
          message.reply({
            body: replies[randomIndex],
attachment: await global.utils.getStreamFromURL(img)})
          break;
        default:
          return; 
      }
    }
  },
};
