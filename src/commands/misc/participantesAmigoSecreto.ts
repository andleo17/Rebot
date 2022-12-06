import { EmbedBuilder } from '@discordjs/builders';
import { AmigoSecretoService } from '../../services/AmigoSecreto.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('listaramigosecreto')
	.setDescription('Lista quienes están participando en el amigo secreto')
	.setAction(async ({ interaction }) => {
		const participants = await AmigoSecretoService.listParticipants();

		const formatedParticipants = participants
			.map((p) => `- <@!${p.id}>`)
			.join('\n');

		const responseEmbed = new EmbedBuilder()
			.setTitle('Participantes del amigo secreto')
			.setDescription(
				formatedParticipants === ''
					? 'Aún no hay participantes'
					: formatedParticipants
			);

		return interaction.reply({ embeds: [responseEmbed] });
	});
