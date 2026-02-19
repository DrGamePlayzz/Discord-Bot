const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('send-proof')
		.setDescription('Get your Supporter Role by sending your proof now!'),
	async execute(interaction) {
		const intr = interaction;
		await intr.deferReply();
		const chid = interaction.channelId;
		const chName = interaction.channel.name;
		const ch = interaction.guild.channels.cache.get(chid)
		
		if (!chName.includes("ticket")) {
			return await intr.editReply("You're not in the ticket channel, create one and then use this command");
		}

		const startingCode = new EmbedBuilder()
			.setTitle('Confirm your proof to get Supporter Role.')
			.setDescription("You must have the Notification of this channel is turned On!\nThwre's a __limit__ of sending codes, so go quick as possible.\n**1. Record your screen from here.\n2. Tap __Start Codes!__ button below.\n3. Tap __Link__ button below, and will bring you to the __Mortal Company Play Store!__\n4. Tap __Play__ button on __Mortal Company Play Store__.\n5. Wait 3 seconds in __Mortal Company Menu__.\n6. Then go back to this channel.\n7. Type the latest Codes Correctly and Stop the Recording.\n8. Then send your recorded video in here and wait for the staff confirmation.**\n# READ THE INSTRUCTIONS BEFORE TAP __Start Codes!__ BUTTON.");
		//ch.send({ embeds: [starting],  })

		const startCodes = new ButtonBuilder().setCustomId('start').setLabel('Start Codes!').setStyle(ButtonStyle.Primary);
		const row = new ActionRowBuilder().addComponents(startCodes);
		const response = await intr.editReply({ embeds: [startingCode], components: [row], withResponse: true });
		
		const filtered = m => !m.author.bot && m.author.id === intr.user.id && m.channel.id === chid;

		let i = 0;

		const collectorFilter = (i) => i.user.id === interaction.user.id;

		const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });
		if (confirmation.customId === 'start') {
			await confirmation.update({ components: [] });
			async function code() {
				
				let min = 0000;
				let max = 9999;

				let codes = Math.floor(Math.random() * (max - min + 1)) + min;
				codes = codes.toString().padStart(4, "0");

				await ch.send(`<@${intr.user.id}> your code is: __**${codes}**__`);

				const collected = await intr.channel.awaitMessages({
					filter: filtered,
					max: 1,
					time: 10_000,
				});

				let msg = collected.first() || { content: "" };

				if (i <= 12 && codes === msg.content) {
					await ch.send('Send your recorded video to here and wait for the staff to confirm your proof!');
				} else {
					msg = { content: "" };
					i++;
					if ( i >= 11 ) {
						await ch.send({ content: 'The amount of sending codes is running out', ephemeral: true });
						return;
					}
					return await code();
				}
			};
			await code();
		}
	}
}
