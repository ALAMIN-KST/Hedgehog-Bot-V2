const axios = require("axios");
const fs = require("fs");
const path = require("path");


async function checkAuthor(authorName) {
  try {
    const response = await axios.get('https://author-check.vercel.app/name');
    const apiAuthor = response.data.name;
    return apiAuthor === authorName;
  } catch (error) {
    console.error("Error checking author:", error);
    return false;
  }
}

module.exports = {
  config: {
    name: "porn",
    aliases: ["sex"],
    author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡", // new version
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: "Get OnlyFans video",
    longDescription: "Fetches a random video from OnlyFans",
    category: "18+",
    guide: "{p}onlyfans"
  },

  onStart: async function ({ api, event, args, message }) {
  
    const isAuthorValid = await checkAuthor(module.exports.config.author);
    if (!isAuthorValid) {
      await message.reply("Author changer alert! This command belongs to Vex_Kshitiz.");
      return;
    }

    const apiUrl = "https://only-fans-iota.vercel.app/kshitiz";

    try {
      const response = await axios.get(apiUrl);
      const { videoUrl, title } = response.data;

 
      const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempVideoPath);
      const videoResponse = await axios.get(videoUrl, { responseType: "stream" });
      videoResponse.data.pipe(writer);

      writer.on("finish", () => {
        const stream = fs.createReadStream(tempVideoPath);

        message.reply({
          body: `🌶| 𝗣𝗼𝗿𝗻𝗼𝗴𝗿𝗮𝗽𝗵𝘆 𝗹𝗼𝗮𝗱𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝘂𝗳𝗳𝘆\n💻 𝗦𝘁𝗼𝗰𝗸 : 20𝗠𝗕\📲| 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘄𝗮𝘁𝗰𝗵𝗶𝗻𝗴\🎯| 𝗢𝘄𝗻𝗲𝗿 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 : https://facebook.com/sonic.shisui.1492`,
          attachment: stream,
        });
      });

    } catch (error) {
      console.error("Error fetching OnlyFans video:", error);
      message.reply("Sorry, an error occurred while processing your request.");
    }
  }
  };
