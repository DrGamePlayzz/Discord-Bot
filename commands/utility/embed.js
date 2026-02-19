const { InteractionContextType, PermissionFlagsBits, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Send a message of yours to became an embed on Mortal Employee')
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
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
				.setDescription('if True atleast should have a Text, Set a header embed to true/false, if true no-header')
				.addChoices(
					{ name: '(Default) False', value: 'is False' },
					{ name: '(Hide) True', value: 'hide' },
				))
		.addStringOption((option) =>
			option
				.setName('no-time')
				.setDescription('Set a time embed to true/false, if true no-time')
				.addChoices(
					{ name: '(Default) False', value: 'is False' },
					{ name: '(Hide) True', value: 'hide' },
				))
		.addStringOption((option) => option.setName('channel-id').setDescription('Send an embed to the targeted channel, skip/blank send to this chamnel'))
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {

//=========Interaction=========

		const id = interaction.channelId;
		const usrN = interaction.user.displayName;
		const usr = interaction.user.avatarURL();
		const usrAva = interaction.member.displayAvatarURL() ?? interaction.member.defaultAvatarURL();
		await interaction.deferReply({ flags: 64 });
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
		const chid = interaction.options.getString('channel-id');
		const channel = interaction.guild.channels.cache;

//=========Log and Standby=========
		
		const gray = 0x363737;
		let cP;
		let fP;

		let field = [];
		let fields =[];
		let embed = new EmbedBuilder();

		let isBigTitle = "null";
		let isDesc = "null";
		let isTitle = "null";
		let isText = "null";
		let isTitleTwo = "null";
		let isTextTwo = "null";
		let isImage = "null";
		let isThumbnail = "null";
		let isColor = "363737";
		let isNoHeader = "hide";
		let isNoTime = "hide";
		let isNoEditors = "is False";

//============Embed Parts============

		if (color == null) {
			embed.setColor(gray);
		} else {
			embed.setColor(color);
			isColor = color;
		}

		if (bigTitle != null) {
			embed.setTitle(bigTitle);
			isBigTitle = "is True";
		}

		if (desc != null) {
			embed.setDescription(desc);
			isDesc = "is True";
		}

		if (title != null && text != null) {
			field = [
				{ name: title, value: text }
			];
			embed.addFields(field);
			isTitle = "is True";
			isText = "is True";
		} else if (title == null && text != null) {
			field = [
				{ name: '\u200b', value: text }
			];
			embed.addFields(field);
			isTitle = "is False";
			isText = "is True";
		} else if (title != null && text == null) {
			field = [
				{ name: title, value: '\u200b' }
			];
			embed.addFields(field);
			isTitle = "is True";
			isText = "is False";
		}

		if (titleTwo != null && textTwo != null) {
			field = [
				{ name: titleTwo, value: textTwo }
			];
			embed.addFields(field);
			isTitleTwo = "is True";
			isTextTwo = "is True";
		} else if (titleTwo == null && textTwo != null) {
			field = [
				{ name: '\u200b', value: textTwo }
			];
			embed.addFields(field);
			isTitleTwo = "is False";
			isTextTwo = "is True";
		} else if (titleTwo != null && textTwo == null) {
			field = [
				{ name: titleTwo, value: '\u200b' }
			];
			embed.addFields(field);
			isTitleTwo = "is True";
			isTextTwo = "is False";
		}

		if (image != null) {
			embed.setImage(image);
			isImage = "is True";
		}

		if (thumbnail != null) {
			embed.setThumbnail(thumbnail);
			isThumbnail = "is True";
		}

		let nHlog;

		if (noHeader == null || noHeader == 'is False') {
			embed.setAuthor({ name: `Requested by ${usrN}`, iconURL: `${usrAva}` })
			isNoHeader = "is False";
			nHlog = "(Default) False";
		} else {
			nHlog = "(Hide) True";
		}

		let nTlog;

		if (noTime == null || noTime == 'is False') {
			embed.setTimestamp();
			isNoTime = "is False";
			nTlog = "(Default) False";
		} else {
			nTlog = "(Hide) True";
		}

		let msgId;
		let emb;
		let msgChId = chid ?? id;
		let chget = channel.get(msgChId);
		let url;

		if (msgChId != null) {
			if (!chget) {
				return interaction.editReply(`There's no channel with id ${msgChId}`)
			}
			try {
				emb = await chget.send({ embeds: [embed] });
				msgId = emb.id;
				url = emb.url;
			} catch {
				await interaction.editReply("Sending failed");
				return;
			}
		}

		let editors = ".";

//============Log History Collector===========

		let saveEmbed = [
			{
				sAuthorN: usrN,
				sAuthorAvaURL: usrAva,
				sBigTitle: bigTitle,
				sDesc: desc,
				sTitle: title ?? "\u200b",
				sText: text ?? "\u200b",
				sTitleTwo: titleTwo ?? "\u200b",
				sTextTwo: textTwo ?? "\u200b",
				sImage: image,
				sThumbnail: thumbnail,
				sColor: color ?? "363737",
				sNoHeader: noHeader,
				sNoTime: noTime,
				sMsgChId: msgChId,
				sMsgIds: msgId,
				sEditors: editors,
			},
			{
				sIsBigTitle: isBigTitle,
				sIsDescription: isDesc,
				sIsTitle: isTitle,
				sIsText: isText,
				sIsTitleTwo: isTitleTwo,
				sIsTextTwo: isTextTwo,
				sIsColor: isColor,
				sIsImage: isImage,
				sIsThumbnail: isThumbnail,
				sIsNoHeader: isNoHeader,
				sIsNoTime: isNoTime,
				sIsNoEditors: isNoEditors,
			}
		];

		cP = `/sdcard/Dyru/MortalCompany/embedFile/${msgId}`;
		fP = `/sdcard/Dyru/MortalCompany/embedFile/${msgId}/${msgId}.json`;
		await fs.promises.mkdir(cP, { recursive: true });
		str = JSON.stringify(saveEmbed, null, 2);
		await fs.writeFileSync(fP, str);

		let i = 0;
		i++;
		cP += '/i.txt';
		fs.writeFileSync(cP, String(i));

//==========Discord server Log============

		const embedCreated = new EmbedBuilder()
			.setTitle(`Embed Created`)
			.setDescription(`Requested by <@${interaction.user.id}>`)
			.addFields({ name: 'Options:', value: `**big-title:** \`${isBigTitle}\`\n**description:** \`${isDesc}\`\n**title:** \`${isTitle}\`\n**text:** \`${isText}\`\n**title-two:** \`${isTitleTwo}\`\n**text-two:** \`${isTextTwo}\`\n**image:** \`${isImage}\`\n**thumbnail:** \`${isThumbnail}\`\n**color:** \`${color}\`\n**no-header:** \`${nHlog}\`\n**no-time:** \`${nTlog}\`\n**channel-id:** <#${msgChId}>\n**message-id:** \`${msgId}\` [go to embed](${url})`})
			.setColor('008000')
			.setTimestamp();
		
		await channel.get('1220146867615043635').send({ embeds: [embedCreated] }); //server-logs 1220146867615043635
		await interaction.editReply(`Embed sent [go to embed](${url})`);
	}
}
