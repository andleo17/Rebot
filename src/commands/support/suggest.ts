import {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('sugerir')
	.setDescription('Sugiere característica que podría tener el bot.')
	.setAction(async ({ interaction }) => {
		const featureTitleInput = new TextInputBuilder()
			.setLabel('Característica')
			.setCustomId('txtFeatureTitle')
			.setRequired(true)
			.setStyle(TextInputStyle.Short)
			.setPlaceholder('Comando pipilink');

		const featureDescriptionInput = new TextInputBuilder()
			.setLabel('Descripción')
			.setCustomId('txtFeatureDescription')
			.setRequired(true)
			.setStyle(TextInputStyle.Paragraph)
			.setPlaceholder('El comando deberá mostrar una pinga');

		const modal = new ModalBuilder()
			.setCustomId('SUGGEST_MODAL')
			.setTitle('Sugiere una característica')
			.addComponents(
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					featureTitleInput
				),
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					featureDescriptionInput
				)
			);

		await interaction.showModal(modal);
	});
