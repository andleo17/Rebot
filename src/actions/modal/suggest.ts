import { Embed, EmbedBuilder, TextInputBuilder } from 'discord.js';
import { ActionBuilder } from '../../structures/Action';

export default new ActionBuilder('SUGGEST_MODAL').setAction(
	async (interaction) => {
		if (!interaction.isModalSubmit()) return;

		const featureTitle =
			interaction.fields.getTextInputValue('txtFeatureTitle');
		const featureDescription = interaction.fields.getTextInputValue(
			'txtFeatureDescription'
		);

		const responseEmbed = new EmbedBuilder()
			.setTitle('Nueva sugerencia para el bot')
			.setFields(
				{
					name: 'Título',
					value: featureTitle,
				},
				{
					name: 'Descripción de la sugerencia',
					value: featureDescription,
				}
			)
			.setAuthor({
				name: interaction.user.username,
				iconURL: interaction.user.avatarURL({ forceStatic: false })!,
			})
			.setTimestamp();

		return interaction.reply({
			embeds: [responseEmbed],
		});
	}
);
