const { Message, InteractionContextType, PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('edit')
		.setDescription("Edit an embed of Mortal Employee")
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
		.addStringOption((option) => option.setName('message-id').setDescription('Embed Messsge ID').setRequired(true))
		.addStringOption((option) => option.setName('big-title').setDescription('A big text for a big title'))
		.addStringOption((option) => option.setName('description').setDescription('A description text for a big title'))
		.addStringOption((option) => option.setName('title').setDescription('1st layer of title for embed text layer'))
		.addStringOption((option) => option.setName('text').setDescription('1st layer of text for embed include 2nd text layers'))
		.addStringOption((option) => option.setName('title-2').setDescription('2nd layer of title for embed include 3rd text layers'))
		.addStringOption((option) => option.setName('text-2').setDescription('2nd layer of text for embed include 4th text layers'))
		.addStringOption((option) => option.setName('image').setDescription('Put an image link layer of text for embed include media layer'))
		.addStringOption((option) => option.setName('thumbnail').setDescription('Put a thumbnail link layer of text for embed include media thumbnail layer'))
		.addStringOption((option) =>
			option
				.setName('color')
				.setDescription('Set the color of embed')
				.addChoices(
					{ name: 'Black', value: '000000' },
					{ name: 'Blue', value: '0000FF' },
					{ name: 'Cyan', value: '00FFFF' },
					{ name: 'Default (Gray)', value: '363737' },
					{ name: 'Green', value: '008000' },
					{ name: 'Orange', value: 'FFA500' },
					{ name: 'Pink', value: 'FFC0CB' },
					{ name: 'Purple', value: '800080' },
					{ name: 'Red', value: 'FF0000' },
					{ name: 'Yellow', value: 'FFFF00' },
					{ name: 'White', value: 'FFFFFF' },
				))
		.addStringOption((option) =>
			option
				.setName('no-header')
				.setDescription('Set a header layer of text for embed to true/false, if true no-header')
				.addChoices(
					{ name: '(Default) False', value: 'is False' },
					{ name: '(Hide) True', value: 'hide' },
				))
		.addStringOption((option) =>
			option
				.setName('no-time')
				.setDescription('Set a time layer of text for embed to true/false, if true no-time')
				.addChoices(
					{ name: '(Default) False', value: 'is False' },
					{ name: '(Hide) True', value: 'hide' },
				))
		.addStringOption((option) =>
			option
				.setName('no-editors')
				.setDescription('Set editors visibility.')
				.addChoices(
					{ name: '(Default) False', value: 'is False' },
					{ name: '(Hide) True', value: 'hide' },
				))
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {

// =========Interaction=========

		await interaction.deferReply({ flags: 64 });
		const msgId = interaction.options.getString('message-id');
		const id = interaction.channelId;
		const usrN = interaction.user.displayName;
		const usrAva = interaction.member.displayAvatarURL() ?? interaction.member.defaultAvatarURL();
		const bigTitle = interaction.options.getString('big-title');
		const desc = interaction.options.getString('description');
		const title = interaction.options.getString('title');
		const text = interaction.options.getString('text');
		const titleTwo = interaction.options.getString('title-2');
		const textTwo = interaction.options.getString('text-2');
		const image = interaction.options.getString('image');
		const thumbnail = interaction.options.getString('thumbnail');
		const color = interaction.options.getString("color");
		const noHeader = interaction.options.getString('no-header');
		const noTime = interaction.options.getString('no-time');
		const noEditors = interaction.options.getString('no-editors');
		const ch = interaction.guild.channels.cache;

//=========File========

		let i;
		let fP = `/sdcard/Dyru/MortalCompany/embedFile/${msgId}/`;
		let ii = fP + "i.txt";
		try {
			i = fs.readFileSync(ii, "utf8");
		} catch {
			await interaction.editReply(`There's no message id with ${msgId}`);
		}
		
		i = parseInt(i);

		const checkI = i - 1;
		let expectedFile = `/sdcard/Dyru/MortalCompany/embedFile/${msgId}/edit${checkI}.json`;
		let defaultFile = `/sdcard/Dyru/MortalCompany/embedFile/${msgId}/${msgId}.json`;
		let logFile = fs.existsSync(expectedFile) ? expectedFile : defaultFile;
		if (!fs.existsSync(fP)) return await interaction.editReply(`There's no Message with the ID ${msgId}`);
		const rawEmbed = await fs.readFileSync(logFile, 'utf8');
		rawLog = await JSON.parse(rawEmbed);
		logs = rawLog[0];
		log = rawLog[1];
		chid = logs.sMsgChId;
		mid = logs.sMsgIds;

		const guild = await interaction.client.guilds.cache.get(interaction.guildId);
		const channel = await guild.channels.cache.get(chid) ?? await guild.channels.fetch(chid);
		const message = await channel.messages.cache.get(mid) ?? await channel.messages.fetch(mid);
		const msg = await guild.channels.cache;

		const oE = message.embeds[0];
		let up = null;
		up = EmbedBuilder.from(oE);
		let field = null;
		let eE = new EmbedBuilder();
		let ee = "";
		let ae = "";
		let temporary = "";
		let saveEmbed = null;

//========= Configure ========

		let isBigTitle;
		let isDesc;
		let isTitle;
		let isText;
		let isTitleTwo;
		let isTextTwo;
		let isImage;
		let isThumbnail;
		let isColor;
		let isNoHeader;
		let isNoTime;
		let isNoEditors;
		
		eE.setColor('FFFF00');
		eE.setTitle('Embed Edited');
		eE.setDescription(`Edited by <@${interaction.user.id}>`)

		if (bigTitle != null) {
			if (bigTitle === "0") {
				up.setTitle(null);
				bigTitle = null;
				
				if (log.sIsBigTitle === "null") {
					ee += '**big-title:** `null`\n';
				} else {
					ee += '**big-title:** `is True → null`\n';
				}
				if (logs.sBigTitle != null) {
					ae += `**title:** ${logs.sBigTitle}\n\n`;
				}
				
			} else {
				up.setTitle(bigTitle);
				isBigTitle = "is True";
				
				if (log.sIsBigTitle === "null") {
					ee += '**big-title:** `null → is True`\n';
				} else if (log.sIsBigTitle === "is True") {
					ee += '**big-title:** `is True`\n';
				}

				if (logs.sBigTitle != null) {
					ae += `**title:** ${logs.sBigTitle}\n\n`;
				}
			}
		} else {
			ee += `**big-title:** \`${log.sIsBigTitle}\`\n`;
		}

		if (desc != null) {
			if (desc === "0") {
				up.setDescription(null);
				desc = null;
				
				if (log.sIsDescription === "null") {
					ee += '**description:** `null`\n';
				} else if (log.sIsDescription ==="is True") {
					ee += '**description:** `is True → null`\n';
				}

				if (logs.sDesc != null) {
					ae += `**description:** ${logs.sDesc}\n\n`;
				}
				
			} else {
				up.setDescription(desc);
				isDesc = "is True";
				
				if (log.sIsDescription === "null") {
					ee += '**description:** `null → is True`\n';
				} else if (log.sIsDescription === "is True") {
					ee += '**description:** `is True`\n';
				}

				if (logs.sDesc != null) {
					ae += `**description:** ${logs.sDesc}\n\n`;
				}
			}
		} else {
			ee += `**description:** \`${log.sIsDescription}\`\n`;
		}

		if (title != null && text != null) {
			if (title === "0" && text === "0") {
				up.spliceFields(0, 1);
				title = null;
				text = null;
			
				if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "is True") {
					ee += '**title:** `is True → null → is True` ***Turn `True` again because title-two is exist***\n**text:** `is True → null` ***Turn `True` again because text-two is exist***\n';
					isTitle = "is True";
					isText = "is True";
				} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "null") {
					ee += '**title:** `is True → null → is True` ***Turn `True` again because title-two is exist***\n**text:** `is True → null`\n';
					isTitle = "is True";
				} else if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "is True") {
					ee += '**title:** `is True → null`\n**text:** `is True → null` ***Turn `True` again because text-two is exist***\n';
					isText = "is True";
				} else if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "null") {
					ee += '**title:** `is True → null`\n**text:** `is True → null`\n';
				}

				if (logs.sTitle != null && logs.sText != null) {
					ae += `**title:** ${logs.sTitle}\n\n**text:** ${logs.sText}\n\n`;
				}
				
			} else if (title === "0" && text != null) {
				if (log.sIsTitleTwo !== "null" || log.sIsTextTwo !== "null") {
					field = [
						{ name: '\u200b', value: text },
						oE.data.fields[1]
					];
					up.setFields(field);
				} else {
					field = [
						{ name: `\u200b`, value: text },
					];
					up.setFields(field);
				}
				title = null;
				isText = "is True";

				if (logs.sTitle != null && logs.sText != null) {
					ae += `**title:** ${logs.sTitle}\n\n**text:** ${logs.sText}\n\n`;
				} else if (logs.sTitle != null) {
					ae += `**title:** ${logs.sTitle}\n\n`;
				} else if (logs.sText != null) {
					ae += `**text:** ${logs.sText}\n\n`;
				}
				//===== Log Section =====
				
				if (log.sIsTitle === "null" && log.sIsText === "null") {
					ee += '**title:** `null`\n**text:** `null → is True`\n';
				} else if (log.sIsTitle === "null" && log.sIsText === "is True") {
					ee += '**title:** `null`\n**text:** `is True`\n';
				} else if (log.sIsTitle === "is True" && log.sIsText === "null") {
					ee += '**title:** `is True → null`\n**text:** `null → is True`\n';
				} else if (log.sIsTitle === "is True" && log.sIsText === "is True") {
					ee += '**title:** `is True → null`\n**text:** `is True`\n';
				}

				//===== End of Log ======
				
			} else if (title != null && text === "0" ) {
				if (log.sIsTitleTwo !== "null" || log.sIsTextTwo !== "null") {
					field = [
						{ name: title, value: '\u200b' },
						oE.data.fields[1]
					];
					up.setFields(field);
				} else {
					field = [
						{ name: title, value: '\u200b' },
					];
					up.setFields(field);
				}
				isTitle = "is True";
				text = null;

				if (logs.sTitle != null && logs.sText != null) {
					ae += `**title:** ${logs.sTitle}\n\n**text:** ${logs.sText}\n\n`;
				} else if (logs.sTitle != null) {
					ae += `**title:** ${logs.sTitle}\n\n`;
				} else if (logs.sText != null) {
					ae += `**text:** ${logs.sText}\n\n`;
				}

				if (log.sIsTitle === "null" && log.sIsText === "null") {
					ee += '**title:** `null → is True`\n**text:** `null`\n';
				} else if (log.sIsTitle === "is True" && log.sIsText === "null") {
					ee += '**title:** `is True`\n**text:** `null`\n';
				} else if (log.sIsTitle === "null" && log.sIsText === "is True") {
					ee += '**title:** `null → is True`\n**text:** `is True → null`\n';
				} else if (log.sIsTitle === "is True" && log.sIsText === "is True") {
					ee += '**title:** `is True`\n**text:** `is True → null`\n';
				}
				
			} else {
				if (log.sIsTitleTwo !== "null" || log.sIsTextTwo !== "null") {
					field = [
						{ name: title, value: text },
						oE.data.fields[1]
					];
					up.setFields(field);
				} else {
					field = [
						{ name: title, value: text },
					];
					up.setFields(field);
				}
				isTitle = "is True";
				isText = "is True";

				if (logs.sTitle != null && logs.sText != null) {
					ae += `**title:** ${logs.sTitle}\n\n**text:** ${logs.sText}\n\n`;
				} else if (logs.sTitle != null) {
					ae += `**title:** ${logs.sTitle}\n\n`;
				} else if (logs.sText != null) {
					ae += `**text:** ${logs.sText}\n\n`;
				}

				if (log.sIsTitle === "null" && log.sIsText === "null") {
					ee += '**title:** `null → is True`\n**text:** `null → is True`\n';
				} else if (log.sIsTitle === "is True" && log.sIsText === "null") {
					ee += '**title:** `is True`\n**text:** `null → is True`\n';
				} else if (log.sIsTitle === "null" && log.sIsText === "is True") {
					ee += '**title:** `null → is True`\n**text:** `is True`\n';
				} else if (log.sIsTitle === "is True" && log.sIsText === "is True") {
					ee += '**title:** `is True`\n**text:** `is True`\n';
				}
				
			}
		} else if (title == null && text != null) {
			if (text === "0") {
				if (log.sIsTitleTwo !== "null" || log.sIsTextTwo !== "null") {
					field = [
						{ name: logs.sTitle, value: "\u200b" },
						oE.data.fields[1]
					];
					up.setFields(field);
				} else {
					field = [
						{ name: logs.sTitle, value: "\u200b" }
					];
					up.setFields(field);
				}
				text = null;

				if (logs.sText != null) {
					ae += `**text:** ${logs.sText}\n\n`;
				}

				if (log.sIsText === "null") {
					ee += `**title:** \`${log.sIsTitle}\`\n**text:** \`null\`\n`;
				} else {
					ee += `**title:** \`${log.sIsTitle}\`\n**text:** \`is True → null\`\n`;
				}

			} else {
				if (log.sIsTitleTwo !== "null" || log.sIsTextTwo !== "null") {
					field = [
						{ name: logs.sTitle, value: text },
						oE.data.fields[1]
					];
					up.setFields(field);					
				} else {
					field = [
						{ name: logs.sTitle, value: text }
					];
					up.setFields(field);
				}
				isText = "is True";

				if (logs.sText != null) {
					ae += `**text:** ${logs.sText}\n\n`;
				}

				if (log.sIsText === "null") {
					ee += `**title:** \`${log.sIsTitle}\`\n**text:** \`null → is True\`\n`;
				} else {
					ee += `**title:** \`${log.sIsTitle}\`\n**text:** \`is True\`\n`;
				}
				
			}
		} else if (title != null && text == null) {
			if (title === "0") {
				if (log.sIsTitleTwo !== "null" || log.sIsTextTwo !== "null") {
					field = [
						{ name: "\u200b", value: logs.sText },
						oE.data.fields[1]
					];
					up.setFields(field);
				} else {
					field = [
						{ name: "\u200b", value: logs.sText }
					];
					up.setFields(field);
				}
				title = null;

				if (logs.sTitle != null) {
					ae += `**title:** ${logs.sTitle}\n\n`;
				}
				
				if (log.sIsTitle === "null") {
					ee += `**title:** \`null\`\n**text:** \`${log.sIsText}\`\n`;
				} else {
					ee += `**title:** \`is True → null\`\n**text:** \`${log.sIsText}\`\n`;
				}
				
			} else {
				if (log.sIsTitleTwo !== "null" || log.sIsTextTwo !== "null") {
					field = [
						{ name: title, value: logs.sText },
						oE.data.fields[1]
					];
					up.setFields(field);					
				} else {
					field = [
						{ name: title, value: logs.sText },
					];
					up.setFields(field);
				}
				isTitle = "is True";

				if (logs.sTitle != null) {
					ae += `**title:** ${logs.sTitle}\n\n`;
				}

				if (log.sIsTitle === "null") {
					ee += `**title:** \`null → is True\`\n**text:** \`${log.sIsText}\`\n`;
				} else {
					ee += `**title:** \`is True\`\n**text:** \`${log.sIsText}\`\n`;
				}

			}
		} else {
			ee += `**title:** \`${log.sIsTitle}\`\n**text:** \`${log.sIsText}\`\n`;
		}

		if (log.isTitleTwo !== "is False" || log.isTextTwo !== "is False") {
			if (titleTwo != null && textTwo != null) {
				if (titleTwo === "0" && textTwo === "0") {
					up.spliceFields(1, 1);
					ee += '**title-two:** `is True → null`\n**text-two:** `is True → null`\n';
					
					titleTwo = null;	
					textTwo = null;

					if (logs.sTitle != null && logs.sText != null) {
						ae += `**title:** ${logs.sTitle}\n\n**text:** ${logs.sText}\n\n`;
					}

					if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `is True → null`\n**text-two:** `is True → null`\n';
					} else if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `null`\n**text-two:** `is True → null`\n';
					} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "null") {
						ee += '**title-two:** `is True → null`\n**text-two:** `null`\n';
					} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `is True → null`\n**text-two:** `is True → null`\n';
					}
	
				} else if (titleTwo === "0" && textTwo != null) {
					field = [
						{ name: title ?? oE.data.fields[0].name, value: text ?? oE.data.fields[0].value },
						{ name: '\u200b', value: textTwo }
					];
					up.setFields(field);
					titleTwo = null;
					isTextTwo = "is True";

					if (logs.sTitleTwo != null && logs.sTextTwo != null) {
						ae += `**title-two:** ${logs.sTitleTwo}\n\n**text-two:** ${logs.sTextTwo}\n\n`;
					} else if (logs.sTitleTwo != null) {
						ae += `**title-two:** ${logs.sTitleTwo}\n\n`;
					} else if (logs.sTextTwo != null) {
						ae += `**text-two:** ${logs.sTextTwo}\n\n`;
					}

					//===== Log Section =====

					if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "null") {
						ee += '**title-two:** `null`\n**text-two:** `null → is True`\n';
					} else if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `null`\n**text-two:** `is True`\n';
					} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "null") {
						ee += '**title-two:** `is True → null`\n**text-two:** `null → is True`\n';
					} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `is True → null`\n**text-two:** `is True`\n';
					}

					//===== End of Log ======
	
				} else if (titleTwo != null && textTwo === "0" ) {
					field = [
						{ name: title ?? oE.data.fields[0].name, value: text ?? oE.data.fields[0].value },
						{ name: titleTwo, value: '\u200b' }
					];
					up.setFields(field);
					isTitleTwo = "is True";
					textTwo = null;

					if (logs.sTitleTwo != null && logs.sTextTwo != null) {
						ae += `**title-two:** ${logs.sTitleTwo}\n\n**text-two:** ${logs.sTextTwo}\n\n`;
					} else if (logs.sTitleTwo != null) {
						ae += `**title-two:** ${logs.sTitleTwo}\n\n`;
					} else if (logs.sTextTwo != null) {
						ae += `**text-two:** ${logs.sTextTwo}\n\n`;
					}

					if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "null") {
						ee += '**title-two:** `null → is True`\n**text-two:** `null`\n';
					} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "null") {
						ee += '**title-two:** `is True`\n**text-two:** `null`\n';
					} else if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `null → is True`\n**text-two:** `is True → null`\n';
					} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `is True`\n**text-two:** `is True → null`\n';
					}

				} else {
					if (title == null || text == null) {
						field = [
							{ name: title ?? oE.data.fields[0].name, value: text ?? oE.data.fields[0].value },
							{ name: titleTwo, value: textTwo }
						];
						up.setFields(field);
						isTitle = "is True";
						isText = "is True";
						isTitleTwo = "is True";
						isTextTwo = "is True";
					} else {
						field = [
							{ name: title, value: text},
							{ name: titleTwo, value: textTwo }
						];
						up.setFields(field);
						isTitleTwo = "is True";
						isTextTwo = "is True";
					}

					if (logs.sTitleTwo != null && logs.sTextTwo != null) {
						ae += `**title-two:** ${logs.sTitleTwo}\n\n**text-two:** ${logs.sTextTwo}\n\n`;
					} else if (logs.sTitleTwo != null) {
						ae += `**title-two:** ${logs.sTitleTwo}\n\n`;
					} else if (logs.sTextTwo != null) {
						ae += `**text-two:** ${logs.sTextTwo}\n\n`;
					}

					if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "null") {
						ee += '**title-two:** `null → is True`\n**text-two:** `null → is True`\n';
					} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "null") {
						ee += '**title-two:** `is True`\n**text-two:** `null → is True`\n';
					} else if (log.sIsTitleTwo === "null" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `null → is True`\n**text-two:** `is True`\n';
					} else if (log.sIsTitleTwo === "is True" && log.sIsTextTwo === "is True") {
						ee += '**title-two:** `is True`\n**text-two:** `is True`\n';
					}
				}
			} else if (titleTwo == null && textTwo != null) {
				if (text === "0") {
					field = [
						{ name: title ?? oE.data.fields[0].name, value: text ?? oE.data.fields[0].value },
						{ name: logs.sTitleTwo, value: "\u200b" }
					];
					up.setFields(field);
					textTwo = null;

					if (logs.sTextTwo != null) {
						ae += `**text-two:** ${logs.sTextTwo}\n\n`;
					}

					if (log.sIsTextTwo === "null") {
						ee += `**title-two:** \`${log.sIsTitleTwo}\`\n**text-two:** \`null\`\n`;
					} else {
						ee += `**title-two:** \`${log.sIsTitleTwo}\`\n**text-two:** \`is True → null\`\n`;
					}
				} else {
					field = [
						{ name: title ?? oE.data.fields[0].name, value: text ?? oE.data.fields[0].value },
						{ name: logs.sTitle, value: textTwo }
					];
					up.setFields(field);
					isTextTwo = "is True";

					if (logs.sTextTwo != null) {
						ae += `**text-two:** ${logs.sTextTwo}\n\n`;
					}

					if (log.sIsTextTwo === "null") {
						ee += `**title:** \`${log.sIsTitleTwo}\`\n**text-two:** \`null → is True\`\n`;
					} else {
						ee += `**title:** \`${log.sIsTitleTwo}\`\n**text-two:** \`is True\`\n`;
					}

				}
			} else if (titleTwo != null && textTwo == null) {
				if (titleTwo === "0") {
					field = [
						{ name: title ?? oE.data.fields[0].name, value: text ?? oE.data.fields[0].value },
						{ name: "\u200b", value: logs.sTextTwo }
					];
					up.setFields(field);
					titleTwo = null;

					if (logs.sTitleTwo != null) {
						ae += `**title-two:** ${logs.sTitleTwo}\n\n`;
					}

					if (log.sIsTitleTwo === "null") {
						ee += `**title-two:** \`null\`\n**text-two:** \`${log.sIsTextTwo}\`\n`;
					} else {
						ee += `**title-two:** \`is True → null\`\n**text-two:** \`${log.sIsTextTwo}\`\n`;
					}

				} else {
					field = [
						{ name: title ?? oE.data.fields[0].name, value: text ?? oE.data.fields[0].value },
						{ name: titleTwo, value: logs.sTextTwo },
					];
					up.setFields(field);
					isTitleTwo = "is True";

					if (logs.sTitleTwo != null) {
						ae += `**title-two:** ${logs.sTitleTwo}\n\n`;
					}

					if (log.sIsTitleTwo === "null") {
						ee += `**title-two:** \`null → is True\`\n**text-two:** \`${log.sIsTextTwo}\`\n`;
					} else {
						ee += `**title-two:** \`is True\`\n**text-two:** \`${log.sIsTextTwo}\`\n`;
					}

				}
			} else {
				ee += `**title-two:** \`${log.sIsTitleTwo}\`\n**text-two:** \`${log.sIsTextTwo}\`\n`;
			}
		}

		if (image != null) {
			if (image === "0") {
				up.setImage(null);
				
				if (log.sIsImage === "null") {
					ee += '**image:** `null`\n';
				} else if (log.sIsImage ==="is True") {
					ee += '**image:** `is True → null`\n';
				}
				
			} else {
				up.setImage(image);
				isImage = "is True";
				
				if (log.sIsImage === "null") {
					ee += '**image:** `null → is True`\n';
				} else if (log.sIsImage === "is True") {
					ee += '**image:** `is True`\n';
				}
				
			}
		} else {
			ee += `**image:** \`${log.sIsImage}\`\n`;
		}

		if (thumbnail != null) {
			if (thumbnail === "0") {
				up.setThumbnail(null);
				
				if (log.sIsThumbnail === "null") {
					ee += '**thumbnail:** `null`\n';
				} else if (log.sIsThumbnail ==="is True") {
					ee += '**thumbnail:** `is True → null`\n';
				}
				
			} else {
				up.setThumbnail(thumbnail);
				isThumbnail = "is True";
				
				if (log.sIsThumbnail === "null") {
					ee += '**thumbnail:** `null → is True`\n';
				} else if (log.sIsThumbnail === "is True") {
					ee += '**thumbnail:** `is True`\n';
				}
				
			}
		} else {
			ee += `**thumbnail:** \`${log.sIsThumbnail}\`\n`;
		}

		if (color != null) {
			up.setColor(color);
			ee += `**color:** \`${color}\`\n`;
		} else {
			ee += `**color:** \`${logs.sColor}\`\n`;
		}

		if (noHeader == "is False") {	
			if (noHeader === "is False") {
				up.setAuthor({ name: `Requested By ${logs.sAuthorN}`, iconURL: `${logs.sAuthorAvaURL}` });
				isNoHeader = "is False";
				
				if (log.sIsNoHeader === "hide") {
					ee += '**no-header:** `(Hide) True → (Default) False`\n';
				} else if (log.sIsNoHeader ==="is False") {
					ee += '**no-header:** `(Default) False`\n';
				}
				
			}
		} else if (noHeader === "hide") {
			up.setAuthor(null);
			isNoHeader = "hide";

			if (log.sIsNoHeader === "hide") {
				ee += '**no-header:** `(Hide) True`\n';
			} else if (log.sIsNoHeader === "is False") {
				ee += '**no-header:** `(Default) False → (Hide) True`\n';
			}
		} else {
			ee += `**no-header:** \`${log.sIsNoHeader}\`\n`;
		}

		if (noTime == "is False") {	
			if (noTime === "is False") {
				up.setTimestamp();
				isNoTime = "is False";
				
				if (log.sIsNoTime === "hide") {
					ee += '**no-time:** `(Hide) True → (Default) False`\n';
				} else if (log.sIsNoTime ==="is False") {
					ee += '**no-time:** `(Default) False`\n';
				}
				
			}
		} else if (noTime === "hide") {
			up.setTimestamp(null);
			isNoTime = "hide";

			if (log.sIsNoTime === "hide") {
				ee += '**no-time:** `(Hide) True`\n';
			} else if (log.sIsNoTime === "is False") {
				ee += '**no-time:** `(Default) False → (Hide) True`\n';
			}
		} else {
			ee += `**no-time:** \`${log.sIsNoTime}\`\n`;
		}

		let oldEditors = null;
		let eBy = "Editors:";
		oldEditors = logs.sEditors;
		let filterE = oldEditors.replace(` ${usrN}`, "");
		let editor = ` ${usrN}` + filterE;
		let editors = eBy + editor;

		if (noEditors === "is False") {	
			up.setFooter({ text: editors });
			isNoEditors = "is False";

			if (log.sIsNoEditors === "hide") {
				ee += '**no-editors:** `(Hide) True → (Default) False`\n';
			} else if (log.sIsNoEditors ==="is False") {
				ee += '**no-editors:** `(Default) False`\n';
			}

		} else if (noEditors === "hide") {
			up.setFooter(null);
			isNoEditors == "hide";

			if (log.sIsNoEditors === "hide") {
				ee += '**no-editors:** `(Hide) True`\n';
			} else if (log.sIsNoEditors === "is False") {
				ee += '**no-editors:** `(Default) False → (Hide) True`\n';
			}
		} else if (log.sIsNoEditors = "is False") {
			up.setFooter({ text: editors });
			ee += '**no-editors:** is False\n';
		} else {
			ee += `**no-editors:** \`${log.sIsNoEditors}\`\n`;
		}

		await message.edit({ embeds: [up] });
		await interaction.editReply('Embed edited');

		ee += `**channel-id:** \`${logs.sMsgChId}\`\n**message-id:**\`${logs.sMsgIds}\` [go to embed](${message.url})`;


		eE.addFields({ name: 'Options', value: ee });
		if (ae != null) eE.addFields({ name: 'Before', value: ae });
		await msg.get('1220146867615043635').send({ embeds: [eE] }); //server-logs 1220146867615043635 

//==========Log Edit Embed Collector===========

		saveEmbed = [
			{
				sAuthorN: logs.sAuthorN,
				sAuthorAvaURL: logs.sAuthorAvaURL,
				sBigTitle: bigTitle ?? logs.sBigTitle,
				sDesc: desc ?? logs.sDesc,
				sTitle: title ?? logs.sTitle ?? "\u200b",
				sText: text ?? logs.sText ?? "\u200b",
				sTitleTwo: titleTwo ?? logs.sTitleTwo ?? "\u200b",
				sTextTwo: textTwo ?? logs.sTextTwo ?? "\u200b",
				sImage: image ?? logs.sImage,
				sThumbnail: thumbnail ?? logs.sThumbnail,
				sColor: color ?? logs.sColor,
				sNoHeader: noHeader ?? logs.sNoHeader,
				sNoTime: noTime ?? logs.sNoTime,
				sMsgChId: logs.sMsgChId,
				sMsgIds: logs.sMsgIds,
				sEditors: editor,
			},
			{
				sIsBigTitle: isBigTitle ?? log.sIsBigTitle,
				sIsDescription: isDesc ?? log.sIsDescription,
				sIsTitle: isTitle ?? log.sIsTitle,
				sIsText: isText ?? log.sIsText,
				sIsTitleTwo: isTitleTwo ?? log.sIsTitleTwo,
				sIsTextTwo: isTextTwo ?? log.sIsTextTwo,
				sIsColor: color ?? log.sIsColor,
				sIsImage: isImage ?? log.sIsImage,
				sIsThumbnail: isThumbnail ?? log.sIsThumbnail,
				sIsNoHeader: isNoHeader ?? log.sIsNoHeader,
				sIsNoTime: isNoTime ?? log.sIsNoTime,
				sIsNoEditors: isNoEditors ?? log.sIsNoEditors,
			}
		]

		//save
		const save = await JSON.stringify(saveEmbed, null, 2);
		let saveEdit = fP + `edit${i}.json`;
		fs.writeFileSync(saveEdit, save);
		i+=1;
		fs.writeFileSync(ii, String(i));		
	}
};
