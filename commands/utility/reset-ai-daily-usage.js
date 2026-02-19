const { EmbedBuilder, InteractionContextType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset-ai-daily-usage')
		.setDescription('Reset AI Daily Usage Manually.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {
		await interaction.deferReply({ flags: 64 });
		try {
			const rpdPath = path.join(process.cwd(), 'rpd.json');
			const cdPath = path.join(process.cwd(), 'cd.txt');
			let rpd = {
				a : 0,
				b : 0,
				c : 0,
				d : 0,
			};

			fs.writeFileSync(rpdPath, JSON.stringify(rpd));
			fs.writeFileSync(cdPath, String("False"));
			await interaction.editReply('Reset Successfully.');
			console.log('rpd changed.');
		} catch (error) {
			console.error(error);
		}
	}
}
