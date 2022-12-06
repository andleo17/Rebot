import { EmbedBuilder } from '@discordjs/builders';
import { AmigoSecretoService } from '../../services/AmigoSecreto.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('chocolatearamigosecreto')
	.setDescription('Chocolatea para el amigo secreto.')
	.setAction(async ({ interaction }) => {
		if (interaction.user.id !== '632620598190931988')
			return interaction.reply({
				ephemeral: true,
				content: 'No eres el admin jijiji.',
			});

		await AmigoSecretoService.chocolatear();

		const participants = await AmigoSecretoService.listParticipants();

		for await (const p of participants) {
			try {
				const member = await interaction.guild.members.fetch(p.id);

				const notificationEmbed = new EmbedBuilder()
					.setTitle('Amigo secreto Rebelión 2022')
					.setDescription(`Tu amigo secreto es <@!${p.amigo}>`);

				await member.send({ embeds: [notificationEmbed] });
			} catch (error) {
				console.log(error);
			}
		}

		const responseEmbed = new EmbedBuilder()
			.setTitle('Amigo secreto Rebelión 2022')
			.setDescription(
				'Ya gente, revisen sus DMs.\nLes envié quienes son sus amigos secretos'
			);

		return interaction.reply({ embeds: [responseEmbed] });
	});
