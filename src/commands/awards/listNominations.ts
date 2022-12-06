import { EmbedBuilder } from '@discordjs/builders';
import { Awards } from '../../services/awards/Nomination.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('nominados')
	.setDescription('Lista los nominados a una categoría')
	.addIntegerOption((o) =>
		o
			.setName('categoria')
			.setDescription('Número identificador de la catgoría')
			.setRequired(true)
	)
	.setAction(async ({ interaction }) => {
		const id = interaction.options.getInteger('categoria', true);
		const category = await Awards.Nomination.getMany(id);

		if (!category)
			return interaction.reply({
				ephemeral: true,
				content: 'La categoría no existe',
			});

		const response = new EmbedBuilder()
			.setTitle(`Nominados a ${category?.name}`)
			.setDescription(category?.description ?? null);

		const nominationsEmbed = await Promise.all(
			category.nominations.map(async (n) => {
				const member = await interaction.guild.members.fetch(n.member);

				return new EmbedBuilder()
					.setAuthor({
						name: member.nickname!,
						iconURL: member.displayAvatarURL(),
					})
					.setDescription(n.description + '\n' + n.url);
			})
		);

		return interaction.reply({
			embeds: [response, ...nominationsEmbed],
		});
	});
