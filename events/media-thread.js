const { Guild, Events, GatewayIntentBits, Attachments } = require('discord.js');

module.exports = async (message) => {
	async function threadLock(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		})
	};

	const msg = message;
	const idT = '1217998949869420694'; //media 1217998949869420694
	if (msg.channel.id !== idT) return;
	const roles = [
		'1190307685179072603',	//boss of the gym
		'1216884725667336212',	//dungeon master
		'1385138148601757766',	//vip-hammwr
		'1243995637964472370',	//knights
		'1234722673947578392',	//king of may 17
		'1244260144775168090',	//developer
		'1229113311946342420',	//retired
		'1221666210844905533',	//server booster
		'1346208669297147975',	//retro role
		'1346877046726328460',	//foxy role
		'1445403689253732503',	//the best and sharpest
		'1291408929284423753',	//supreme
		'1445402875823132714',	//leader
		'1323717788900266065',	//2024 sillies
	];
	const hasRole = roles.some(r => msg.member.roles.cache.has(r));

	if (hasRole && msg.channel.id === idT)  {
		if (msg.attachments.size) {
			await msg.startThread({
				autoArchiveDuration: 1440,
				name: "Media Comment",
				rateLimitPerUser: 5,
				reason: "Roles priviledge.",
			});
			if (msg.hasThread) {
				await msg.thread.send("This thread is created only for a spesific roles and will be locked after 20 hours.\nPlease follow the <#1190239217733869611>");
				await threadLock(1_200 * 60_000);
				await msg.thread.setLocked(true);
				if (msg.hasThread) {
					await msg.thread.send("Thread has been locked and will be deleted in 4 hours.");
					await threadLock(240 * 60_000);
					await msg.thread.delete("Thread's already old");
				}
			}
		} else {
			return;
		}
	}
};

