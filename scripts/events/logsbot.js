const { getTime } = global.utils;

module.exports = {
	config: {
		name: "logsbot",
		isBot: true,
		version: "1.4",
		author: "NTKhang",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		vi: {
			title: "====== Nhật ký bot ======",
			added: "\n✅\nSự kiện: bot được thêm vào nhóm mới\n- Người thêm: %1",
			kicked: "\n❌\nSự kiện: bot bị kick\n- Người kick: %1",
			footer: "\n- User ID: %1\n- Nhóm: %2\n- ID nhóm: %3\n- Thời gian: %4"
		},
		en: {
			title: "🔔==🤍𝗦𝗢𝗡𝗜𝗖 𝗟𝗢𝗚𝗦🤍==🔔",
			added: "\n🫠\n𝐈𝐧𝐟𝐨: 𝐋𝐞 𝐇𝐞𝐝𝐠𝐞𝐡𝐨𝐠𝐛𝐨𝐭 𝐚 𝐞𝐭𝐞 𝐚𝐣𝐨𝐮𝐭𝐞 𝐝𝐚𝐧𝐬 𝐮𝐧 𝐠𝐫𝐨𝐮𝐩𝐞\n✰ 𝐀𝐣𝐨𝐮𝐭𝐞 𝐩𝐚𝐫: %1",
			kicked: "\n🙆\n𝐈𝐧𝐟𝐨: 𝐋𝐞 𝐡𝐞𝐝𝐠𝐞𝐡𝐨𝐠𝐛𝐨𝐭 𝐚 𝐞𝐭𝐞 𝐫𝐞𝐭𝐢𝐫𝐞 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞\n✰ 𝐑𝐞𝐭𝐢𝐫𝐞 𝐩𝐚𝐫: %1",
			footer: "\n✰ 𝐔𝐬𝐞𝐫 𝐈𝐃: %1\n✰ 𝐆𝐫𝐨𝐮𝐩: %2\n✰ 𝐆𝐫𝐨𝐮𝐩 𝐈𝐃: %3\n✰ 𝐓𝐢𝐦𝐫: %4"
		}
	},

	onStart: async ({ usersData, threadsData, event, api, getLang }) => {
		if (
			(event.logMessageType == "log:subscribe" && event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
			|| (event.logMessageType == "log:unsubscribe" && event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
		) return async function () {
			let msg = getLang("title");
			const { author, threadID } = event;
			if (author == api.getCurrentUserID())
				return;
			let threadName;
			const { config } = global.GoatBot;

			if (event.logMessageType == "log:subscribe") {
				if (!event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
					return;
				threadName = (await api.getThreadInfo(threadID)).threadName;
				const authorName = await usersData.getName(author);
				msg += getLang("added", authorName);
			}
			else if (event.logMessageType == "log:unsubscribe") {
				if (event.logMessageData.leftParticipantFbId != api.getCurrentUserID())
					return;
				const authorName = await usersData.getName(author);
				const threadData = await threadsData.get(threadID);
				threadName = threadData.threadName;
				msg += getLang("kicked", authorName);
			}
			const time = getTime("DD/MM/YYYY HH:mm:ss");
			msg += getLang("footer", author, threadName, threadID, time);

			for (const adminID of config.adminBot)
				api.sendMessage(msg, adminID);
		};
	}
};
