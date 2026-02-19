const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const fs = require('node:fs');

module.exports = async (message) => {
	if (message.channel.id !== "1450694046514155541") return;

	async function wait(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		})
	};
	const fp = '/data/data/com.termux/files/home/MortalEmployee/';
	let fpcd = fp + "cd.txt";
	let isCooldowns;
	const msg = message;
	let msgHas = msg.content;
	if (msgHas.includes("<@1445076761506218064>")) {
		isCooldowns = fs.readFileSync(fpcd, 'utf8').trim();
		if (isCooldowns === "False") {
			fs.writeFileSync(fpcd, String("True"));
			let theMsg = msgHas.replace("<@1445076761506218064>", "");
			let response;
			let text;
			
			async function template(mode) {
				try {
					response = await ai.models.generateContent({
						model: mode,
						contents: theMsg,
						config: {
							systemInstruction: "You're a character from a game named Mortal Company(a reference game from lethal company and it's not a copy from original lethal company) and your name is unknown the reason is private information, if possible try with a little joke, send randomly around 150-500 characters.",
						},
					});
					
					return response = response.text;
				} catch (err) {
					console.error(err);
					return null;
				}
			};
			
			let fprpd = fp + "rpd.json";
			let rawrpd = fs.readFileSync(fprpd, 'utf8');
			let rpd = JSON.parse(rawrpd);
			
			if (rpd.a <= 18) {
				text = await template("gemini-2.5-flash");
				rpd.a++;
			} else if (rpd.b <= 18) {
				text = await template("gemini-2.5-flash-lite");
				rpd.b++;
			} else if (rpd.c <= 18) {
				text = await template("gemini-robotics-er-1.5-preview");
				rpd.c++;
			} else if (rpd.d <= 14_000) {
				text = await template("gemma-3-27b");
				rpd.d++;
			} else {
				return await msg.reply("Credits exceeded.");
			}

			if (!text) {
				await msg.reply("There's something wrong with AI");
				await wait(10_000);
				fs.writeFileSync(fpcd, String("False"));
				return;
			}

			fs.writeFileSync(fprpd, JSON.stringify(rpd));
			await msg.reply("." + response);
			await wait(10_000);
			fs.writeFileSync(fpcd, String("False"));
		}
	}
}
