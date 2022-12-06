import { EmbedBuilder } from '@discordjs/builders';
import { Awards } from '../../services/awards/Nomination.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('nominar')
	.setDescription('Agrega una nominación a los premios rebelión')
	.addIntegerOption((o) =>
		o
			.setName('id')
			.setDescription('Número identificador de la categoría de la nominación')
			.setRequired(true)
	)
	.addUserOption((o) =>
		o
			.setName('usuario')
			.setDescription('Usuario relacionado a la nominación')
			.setRequired(true)
	)
	.addStringOption((o) =>
		o
			.setName('descripcion')
			.setDescription('Descripción de la nominación')
			.setRequired(true)
	)
	.addAttachmentOption((o) =>
		o
			.setName('multimedia')
			.setDescription('Imágen o video que hace referencia a la nominación')
			.setRequired(false)
	)
	.setAction(async ({ interaction }) => {
		const id = interaction.options.getInteger('id', true);
		const member = interaction.options.getMember('usuario');
		const description = interaction.options.getString('descripcion', true);
		const media = interaction.options.getAttachment('multimedia');

		const nomination = await Awards.Nomination.save({
			categoryId: id,
			member: member!.id,
			description,
			url: media?.url,
		});

		const response = new EmbedBuilder()
			.setColor([200, 255, 200])
			.setDescription(
				`Se ha nominado a **${member}** a **${nomination.category.name}** por **${description}**.`
			);

		return interaction.reply({
			embeds: [response],
		});
	});
