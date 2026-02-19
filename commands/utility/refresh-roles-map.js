const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
	    .setName('refresh-roles-map')
	    .setDescription('Refreshing all Roles in bot cache')
	    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction) {
		await interaction.deferReply();
		const froles = await interaction.guild.roles.fetch();
   		const filePath = `/sdcard/Dyru/MortalCompany/roles/${interaction.guild.id}.json`;
    	fs.writeFileSync(filePath, JSON.stringify(froles, null, 2));

		await interaction.editReply('Roles has been Refetched');
	}
}
