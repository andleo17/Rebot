import {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('agregarcategoria')
	.setDescription('Agrega una categoría de premio')
	.setAction(async ({ interaction }) => {
		const modal = new ModalBuilder()
			.setCustomId('ADD_CATEGORY_FORM')
			.setTitle('Agregar categoría de nominación')
			.addComponents(
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					new TextInputBuilder()
						.setLabel('Nombre')
						.setCustomId('txt_category_name')
						.setRequired(true)
						.setStyle(TextInputStyle.Short)
						.setPlaceholder('Nombre de la categoría')
				),
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					new TextInputBuilder()
						.setLabel('Descripción')
						.setCustomId('txt_category_description')
						.setRequired(true)
						.setStyle(TextInputStyle.Paragraph)
						.setPlaceholder('Descripción de la categoría')
				)
			);

		return interaction.showModal(modal);
	});
