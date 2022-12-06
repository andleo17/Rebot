import { EmbedBuilder } from '@discordjs/builders';
import { Awards } from '../../services/awards/Category.service';
import { ActionBuilder } from '../../structures/Action';

export default new ActionBuilder('ADD_CATEGORY_FORM').setAction(
	async (interaction) => {
		if (!interaction.isModalSubmit()) return;

		const categoryName =
			interaction.fields.getTextInputValue('txt_category_name');
		const categoryDescription = interaction.fields.getTextInputValue(
			'txt_category_description'
		);

		await Awards.Category.save({
			name: categoryName,
			description: categoryDescription,
		});

		const responseEmbed = new EmbedBuilder()
			.setTitle('Una nueva categoría ha sido agregada')
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
