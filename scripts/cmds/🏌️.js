module.exports = {
    config: {
        name: "🏌️",
        version: "1.0",
        author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "🏌️") return message.reply("☁️     ☁️     ☁️   ☁️\n            .    .    \n     .                  . \n   ⚾                  ⚾\n🏌️.                         ⛳");
}
};
