module.exports = {
  config: {
    name: "porn",
    aliases: ["sex"],
    version: "1.1",
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
    countDown: 5,
    role: 0,
    shortDescription: "Cartoon video ",
    longDescription: "send you cartoon video porn",
    category: "18+",
    guide: "{p}{n}",
  },

  sentVideos: [],

  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;

    const loadingMessage = await message.reply({
      body: "💿 | 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐂𝐚𝐫𝐭𝐨𝐨𝐧 𝐯𝐢𝐝𝐞𝐨 𝐩𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭...",
    });

    const link = [
"https://i.imgur.com/AsN45cz.mp4",
"https://i.imgur.com/6X0Mx6C.mp4",
"https://tinyurl.com/yqq3fheg",
"https://tinyurl.com/ys3gdj42",
"https://tinyurl.com/yvn9xdsd",
"https://tinyurl.com/ym8mj5y8",
"https://tinyurl.com/yoxgllel",
"https://tinyurl.com/yssxsd5f",
"https://tinyurl.com/yr5jecua",
"https://tinyurl.com/yr8npjfw",
"https://tinyurl.com/yw459g5e",
    ];

    const availableVideos = link.filter(video => !this.sentVideos.includes(video));

    if (availableVideos.length === 0) {
      this.sentVideos = [];
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const randomVideo = availableVideos[randomIndex];

    this.sentVideos.push(randomVideo);

    if (senderID !== null) {
      message.reply({
        body: '🌶| 𝗖𝗮𝗿𝘁𝗼𝗼𝗻 𝘃𝗶𝗱𝗲𝗼 𝗹𝗼𝗮𝗱𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆\n━━━━━━━━━━━━━━━━\n💻| 𝗦𝘁𝗼𝗰𝗸 : 20𝗠𝗕\n━━━━━━━━━━━━━━━━\n🎯| 𝗢𝘄𝗻𝗲𝗿 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 : https://facebook.com/sonic.shisui.1492\n━━━━━━━━━━━━━━━━\n📲| 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘄𝗮𝘁𝗰𝗵𝗶𝗻𝗴',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });

      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
