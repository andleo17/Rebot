import { EmbedBuilder } from 'discord.js';
import { prisma } from '../../database/Database.service';
import { ShopService } from '../../services/Shop.service';
import { CommandBuilder } from '../../structures/Command';

export default new CommandBuilder()
	.setName('shop')
	.setDescription('Mira la lista de productos')
	.setAction(async ({ interaction }) => {
		const products = await ShopService.listProducts();
		const formatedProducts = products.map(
			(p) => `Producto: ${p.name}\nPrecio: ${p.price}`
		);

		const shopEmbed = new EmbedBuilder()
			.setTitle('Tienda rebelioner')
			.setColor('DarkBlue')
			.setDescription(
				formatedProducts.join('\n\n') || 'No hay productos en la tienda'
			);

		const guildConfig = await prisma.guildConfig.findUnique({
			where: { guildId: interaction.guildId },
		});

		if (!guildConfig) throw new Error('Canal no configurado');

		const botChannel = await interaction.guild.channels.fetch(
			guildConfig.botChannel!
		);

		if (!botChannel?.isTextBased()) throw new Error('El canal no es de texto');

		await botChannel.send({
			embeds: [shopEmbed],
		});

		return interaction.reply({
			content: 'Tienda mostrada',
			ephemeral: true,
		});
	});
