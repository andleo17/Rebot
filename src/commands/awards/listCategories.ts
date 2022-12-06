import { EmbedBuilder } from '@discordjs/builders';
import { Awards } from '../../services/awards/Category.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('categorias')
	.setDescription('Lista las categorías de los premios')
	.setAction(async ({ interaction }) => {
		const categories = await Awards.Category.getMany();

		const response = new EmbedBuilder()
			.setTitle('Categorías de los premios Rebelión 2022')
			.setDescription(
				categories
					.map((c) => `**[${c.id}]** ${c.name}\n${c.description}`)
					.join('\n\n')
			);

		return interaction.reply({
			embeds: [response],
		});
	});
