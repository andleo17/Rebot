import { EmbedBuilder } from '@discordjs/builders';
import { AmigoSecretoService } from '../../services/AmigoSecreto.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('saliramigosecreto')
	.setDescription('Deja de participar en el amigo secreto')
	.setAction(async ({ interaction }) => {
		const userId = interaction.user.id;

		const estaParticipando = await AmigoSecretoService.estaParticipando(userId);

		if (!estaParticipando)
			return interaction.reply({
				ephemeral: true,
				content:
					'Si no estás participando porqué chucha te quieres salir oh ctmr.',
			});

		const deletedParticipant = await AmigoSecretoService.deleteParticipant(
			userId
		);

		const responseMessage =
			deletedParticipant.amigo !== null
				? `Eres cagón con <@!${deletedParticipant.amigo}> no más diré.\n\n`
				: '';

		const responseEmbed = new EmbedBuilder()
			.setTitle('Amigo secreto')
			.setDescription(
				`Dejaste de participar del amigo secreto.\n${responseMessage}Si quieres volver a participar escribe \`/amigosecreto\`.`
			);

		return interaction.reply({ ephemeral: true, embeds: [responseEmbed] });
	});
