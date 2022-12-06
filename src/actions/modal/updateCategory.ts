import { EmbedBuilder } from '@discordjs/builders';
import { Awards } from '../../services/awards/Category.service';
import { ActionBuilder } from '../../structures/Action';
import { getActionPayload } from '../../utils/getActionPayload';

export default new ActionBuilder('UPDATE_CATEGORY_FORM').setAction(
	async (interaction) => {
		if (!interaction.isModalSubmit()) return;

		const payload = getActionPayload<{ id: number }>(interaction.customId);

		const categoryName =
			interaction.fields.getTextInputValue('txt_category_name');
		const categoryDescription = interaction.fields.getTextInputValue(
			'txt_category_description'
		);

		await Awards.Category.update(payload!.id, {
			name: categoryName,
			description: categoryDescription,
		});

		const responseEmbed = new EmbedBuilder()
			.setTitle('La categoría ha sido modificada correctamente')
			.setFields(
				{
					name: 'Nombre',
					value: categoryName,
				},
				{ name: 'Descripción', value: categoryDescription }
			)
			.setTimestamp();

		return interaction.reply({ embeds: [responseEmbed] });
	}
);
