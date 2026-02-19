const { Message, Events, GatewayIntentBits } = require('discord.js');
const rImmortal = [
	'1190307685179072603',	//boss of the gym
	'1216884725667336212',	//dungeon master
	'1385138148601757766',	//vip-hammwr
	'1243995637964472370',	//knights
	'1234722673947578392',	//king of may 17
	'1244260144775168090',	//developer
	'1229113311946342420',	//retired
	'1221666210844905533',	//server booster
];
const chs = [
	'1217998028401807471',	//gen-1
	'1383506624160993432',	//gen-2
	'1339642306138996767',	//port
	'1339643762946867240',	//russ
	'1339860294545178718',	//span
	'1349559187520094208',	//arab
	'1369134772214825120',	//germ
	'1339643827186696273',	//fren
	'1389380997534978058',	//pers
	'1389317301584658593',	//indi
	'1404386802160107520',	//turk
	'1384135493427531846',	//indo
	'1217998949869420694',	//media
	'1218009065263857764',	//memes
	'1383544864557502504',	//commands
	'1218011393773535272',	//art
	'1220931280338948166',	//show-work
	'1450694046514155541',	//playground
	'1406919991923576933',	//r-c
	'1240960735677382656',	//n-m
	'1190239217733869618',	//vc1
	'1217998182806720592',	//vc2
	'1217998217489154069',	//vc3
	'1383684454224236705',	//vc4
	'1383684524054941706',	//vc5
	'1383684558683111554',	//vc6
	'1383684604229058580',	//vc7
	'1383684637494349887',	//vc8
	'1383684669471723550',	//vc9
	'1383684704984895511',	//vc10
]

module.exports = async (message) => {
	const msg = message;
	const id = '1448650033162358957'; //channel for auto ban 1448650033162358957
	let con;
	let aid;
	if (msg.channel.id !== id) return;
	let immortal = rImmortal.some(immortal => msg.member.roles.cache.has(immortal));
	if (msg.channel.id === id && !immortal && !msg.author.bot) {
		try {
			con = msg.content;
			aid = msg.author.id;
			await msg.member.ban({ deleteMessageSeconds: 3, reason: 'Bot spam.' });
			for (const c of chs) {
				let ch = msg.guild.channels.cache.get(c);
				if (!ch) continue;

				let fetched = await ch.messages.fetch({ limit: 5 });
				
				fetched.forEach(m => {
					if (m.author.id === aid && m.content === con) {
						m.delete().catch(console.error);
					}
				});

				fetched.forEach(m => ch.messages.cache.delete(m.id));
			}
		} catch (error) {
			console.error(error);
		}
	} else {
		console.log("can't ban/or something error");
	}
};
