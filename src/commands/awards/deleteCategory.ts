import { EmbedBuilder } from '@discordjs/builders';
import { Awards } from '../../services/awards/Category.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('eliminarcategoria')
	.setDescription('Borra una categoría de los premios')
	.addIntegerOption((o) =>
		o
			.setName('id')
			.setDescription('Número identificador de la categoría')
			.setRequired(true)
	)
	.setAction(async ({ interaction }) => {
		const id = interaction.options.getInteger('id', true);

		const category = await Awards.Category.remove(id);

		const response = new EmbedBuilder()
			.setColor([200, 255, 200])
			.setDescription(
				`La categoría **[${category.id}] ${category.name}** ha sido eliminada.`
			);

		return interaction.reply({
			embeds: [response],
		});
	});
