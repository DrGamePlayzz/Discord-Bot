const { EmbedBuilder, InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message-edit')
		.setDescription("Edit Mortal Employee's message")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.addStringOption((option) => option.setName('message-id').setDescription('Message ID to edit').setRequired(true))
		.addStringOption((option) => option.setName('text').setDescription('[!!] Copy the original text message first, otherwise it will rewrite whole message').setRequired(true))
		.addStringOption((option) => option.setName('channel-id').setDescription('Channel ID of the message that it in'))
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {
		await interaction.deferReply({ flags: 64 });
		const cchid = interaction.options.getString('channel-id');
		const msgid = interaction.options.getString('message-id');
		const text = interaction.options.getString('text');
		let message;

		const chid = cchid ?? interaction.channelId;
		const channel = interaction.guild.channels.cache.get(chid) ?? await interaction.guild.chqnn
		const cchannel = interaction.guild.channels.cache;
		if (channel.type == 4 || channel.type == 14 || channel.type == 15) return await interaction.editReply("The channel type isn't sendable/editable");

		message = channel.messages.cache.get(msgid) ?? await channel.messages.fetch(msgid).catch(() => null);
		if (!message) return await interaction.editReply(`There's no Message with ID ${msgid} in Channel <#${chid}>.`);
		if (message.author.id !== '1445076761506218064') return await interaction.editReply("The message isn't from Mortal Employee.");	//bot id 1445076761506218064
		const lastM = message.content;
		await message.edit(text);

		const elog = new EmbedBuilder()
			.setColor('FFFF00')
			.setTitle('Message Edited')
			.setDescription(`Requested by <@${interaction.user.id}>\nChannel : <#${chid}>\nPrevious Message : ${lastM}\n[Jump into Message](${message.url})`)
		cchannel.get('1220146867615043635').send({ embeds: [elog] });	//log 1220146867615043635
		await interaction.editReply(`Message with ID ${msgid} has been edited at <#${chid}>\n[Jump into message](${message.url})`);
	}
}
