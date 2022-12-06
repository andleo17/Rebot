import { ChannelType, InteractionType } from 'discord.js';
import { EventBuilder } from '../../structures/Event';

import type {
	ChatInputCommandInteraction,
	ModalSubmitInteraction,
} from 'discord.js';
import type { ReBot } from '../../structures/ReBot';

export default new EventBuilder('interactionCreate').setAction(
	async (client, interaction) => {
		if (!interaction.inCachedGuild()) {
			await interaction.guild?.fetch();
			throw new Error(
				'Ocurrió un error al ejecutar el comando. Por favor, inténtalo nuevamente.'
			);
		}

		if (interaction.isChatInputCommand()) {
			return handleChatInputCommand(client, interaction);
		}

		if (interaction.isModalSubmit()) {
			return handleModalSubmit(client, interaction);
		}

		return;
	}
);

async function handleChatInputCommand(
	client: ReBot,
	interaction: ChatInputCommandInteraction<'cached'>
) {
	const command = client.commands.get(interaction.commandName);

	if (!command) {
		return interaction.reply({
			content: 'Comando no encontrado',
			ephemeral: true,
		});
	}

	return command.execute({ client, interaction });
}

async function handleModalSubmit(
	client: ReBot,
	interaction: ModalSubmitInteraction<'cached'>
) {
	const action = client.customActions.find((a) => {
		const actionName = interaction.customId.split(':').at(0);
		return a.name === actionName;
	});

	if (!action) {
		return interaction.reply({
			content: 'Acción no encontrada',
			ephemeral: true,
		});
	}

	return action.run(interaction, client);
}
