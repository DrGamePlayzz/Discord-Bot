const { EmbedBuilder, InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Send a Message as Mortal Employee.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.addStringOption((option) =>
			option
				.setName('text')
				.setDescription('Text for a message')
				.setRequired(true))
		.addStringOption((option) =>
			option
				.setName('channel-id')
				.setDescription('Put a channel id to send to a spesific channel.'))
		.addStringOption((option) =>
			option
				.setName('message-id-to-reply')
				.setDescription('Put a Message ID to reply someone message'))
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {
		await interaction.deferReply({ flags: 64 });
		const cchid = interaction.options.getString('channel-id');
		const msgId = interaction.options.getString('message-id-to-reply');
		const msg = interaction.options.getString('text');
		let message;

		const chid = cchid ?? interaction.channelId;
		const channel = interaction.guild.channels.cache.get(chid);
		const cchannel = interaction.guild.channels.cache;
		if (channel.type == 4 || channel.type == 14 || channel.type == 15) return await interaction.editReply("The channel type isn't sendable");

		let messageSend;
		if (msgId != null) {
			message = channel.messages.cache.get(msgId) ?? await channel.messages.fetch(msgId).catch(() => null);
			if (!message) return await interaction.editReply(`There's no message with ID ${msgId} in <#${chid}> to reply`);
			messageSend = await message.reply(msg);
		} else {
			messageSend = await channel.send(msg);
		}
		
		const id = await messageSend.id;
		const url = await messageSend.url;

		const elog = new EmbedBuilder()
			.setColor('008000')
			.setTitle(`Message Created`)
			.setDescription(`Requested by <@${interaction.user.id}>\nmessage-id: [${id}](${url})\nchannel: <#${chid}>`)
		cchannel.get('1220146867615043635').send({ embeds: [elog] });	//logs
		await interaction.editReply({ content: `Message created at [${id}](${url})`});

	}
}
