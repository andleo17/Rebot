import { EmbedBuilder } from '@discordjs/builders';
import { AmigoSecretoService } from '../../services/AmigoSecreto.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('amigosecreto')
	.setDescription('Participa en el amigo secreto')
	.setAction(async ({ interaction }) => {
		const userId = interaction.user.id;

		const estaParticipando = await AmigoSecretoService.estaParticipando(userId);

		if (estaParticipando)
			return interaction.reply({
				ephemeral: true,
				content: 'Ya estás participando oh ctmr.',
			});

		await AmigoSecretoService.addParticipant({ id: userId });

		const responseEmbed = new EmbedBuilder()
			.setTitle('Amigo secreto')
			.setDescription(
				'Estás participando en el amigo secreto.\nNo seas cagón con tu regalo no más.\nSi quieres dejar de participar escribe `/saliramigosecreto`.\n\nEspera a que se realice el sorteo, tu amigo secreto se te mostrará en el DM.'
			);

		return interaction.reply({ ephemeral: true, embeds: [responseEmbed] });
	});
