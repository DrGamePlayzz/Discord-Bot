const { Events } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		for (const [id, guild] of client.guilds.cache) {
			try {
				await guild.roles.fetch();
				let roles = JSON.stringify(guild.roles.cache.map(r => r.toJSON())).replace(/,/g, ', \n');

				const filePath = `/sdcard/Dyru/MortalCompany/roles/${guild.id}.json`;
				fs.writeFileSync(filePath, roles);

				console.log('role gathered');
			} catch (error) {
				console.error('role fetch error', error);
			}
		}
	}
}
