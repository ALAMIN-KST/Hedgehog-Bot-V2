let messageCounts = {};

const spamThreshold = 5;

const spamInterval = 60;



module.exports = {

  config: {

    name: "spamban",

    aliases: [],

    version: "1.0",

    author: "Jonell Magallanes & BLUE & kshitiz",

    countDown: 5,

    role: 0,

    shortDescription: "Automatically detect and act on spam",

    longDescription: "Automatically detect and act on spam",

    category: "owner",

    guide: "{pn}",

  },



  onStart: async function ({ api, event, args }) {

    api.sendMessage("This command functionality kicks the user when they are spamming in group chats", event.threadID, event.messageID);

  },



  onChat: function ({ api, event }) {

    const { threadID, messageID, senderID } = event;



    if (!messageCounts[threadID]) {

      messageCounts[threadID] = {};

    }



    if (!messageCounts[threadID][senderID]) {

      messageCounts[threadID][senderID] = {

        count: 1,

        timer: setTimeout(() => {

          delete messageCounts[threadID][senderID];

        }, spamInterval),

      };

    } else {

      messageCounts[threadID][senderID].count++;

      if (messageCounts[threadID][senderID].count > spamThreshold) {

        api.sendMessage("🚨| 𝐒𝐩𝐚𝐦𝐦𝐞 𝐥𝐨𝐜𝐚𝐥𝐢𝐬𝐞...𝐥𝐞 𝐬𝐩𝐚𝐦𝐦𝐞𝐮𝐫 𝐬𝐞𝐫𝐚 𝐢𝐦𝐦𝐞𝐝𝐢𝐚𝐭𝐞𝐦𝐞𝐧𝐭 𝐞𝐱𝐩𝐮𝐥𝐬𝐞 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞", threadID, messageID);

        api.removeUserFromGroup(senderID, threadID);

      }

    }

  },

}
