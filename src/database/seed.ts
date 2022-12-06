import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.product.createMany({
		data: [
			{
				name: 'Admin por un día',
				description: 'Obten el rol de administrador por 24H',
				price: 99999,
			},
			{
				name: 'Porno en general',
				description: 'Obten un pase gratis para mandar porno en general',
				price: 5000,
			},
			{
				name: 'Renombrar un rol',
				description: 'Cambia el nombre a un rol de tu elección',
				price: 8700,
			},
		],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
