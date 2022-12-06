import { ChannelType } from 'discord.js';
import { prisma } from '../../database/Database.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('setbotchannel')
	.setDescription('Configura el canal de spam del bot')
	.addChannelOption((o) =>
		o
			.setName('canal')
			.setDescription('Canal a escoger')
			.addChannelTypes(ChannelType.GuildText)
	)
	.setAction(async ({ interaction }) => {
		const channel = interaction.options.getChannel('canal');
		if (channel?.type !== ChannelType.GuildText)
			throw new Error('El canal no es de texto.');

		const guildConfig = await prisma.guildConfig.findUnique({
			where: { guildId: channel.guildId },
		});

		if (!guildConfig)
			await prisma.guildConfig.create({
				data: { guildId: channel.guildId, botChannel: channel.id },
			});

		await prisma.guildConfig.update({
			where: { guildId: channel.guildId },
			data: { botChannel: channel.id },
		});

		return interaction.reply({
			content: 'Canal configurado',
			ephemeral: true,
		});
	});
