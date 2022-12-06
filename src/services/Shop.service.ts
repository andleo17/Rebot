import { prisma } from '../database/Database.service';

export namespace ShopService {
	export async function listProducts() {
		return prisma.product.findMany({
			where: { isActive: true },
			orderBy: {
				price: 'asc',
			},
		});
	}
}
