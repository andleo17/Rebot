import {
	ActionRowBuilder,
	EmbedBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
import { Awards } from '../../services/awards/Category.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('editarcategoria')
	.setDescription('Edita una categoría de los premios')
	.addIntegerOption((o) =>
		o
			.setName('id')
			.setDescription('Número identificador de la categoría')
			.setRequired(true)
	)
	.setAction(async ({ interaction }) => {
		const id = interaction.options.getInteger('id', true);

		const category = await Awards.Category.find(id);

		if (!category) {
			return interaction.reply({
				ephemeral: true,
				content: 'Categoría no encontrada.',
			});
		}

		const modalId = 'UPDATE_CATEGORY_FORM';
		const payload = JSON.stringify({ id });

		const modal = new ModalBuilder()
			.setCustomId(modalId + ':' + payload)
			.setTitle('Modificar categoría de nominación')
			.addComponents(
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					new TextInputBuilder()
						.setLabel('Nombre')
						.setCustomId('txt_category_name')
						.setRequired(true)
						.setStyle(TextInputStyle.Short)
						.setPlaceholder('Nombre de la categoría')
						.setValue(category.name)
				),
				new ActionRowBuilder<TextInputBuilder>().addComponents(
					new TextInputBuilder()
						.setLabel('Descripción')
						.setCustomId('txt_category_description')
						.setRequired(true)
						.setStyle(TextInputStyle.Paragraph)
						.setPlaceholder('Descripción de la categoría')
						.setValue(category.description)
				)
			);

		return interaction.showModal(modal);
	});
