import { Prisma } from '@prisma/client';
import { prisma } from '../../database/Database.service';

export namespace Awards {
	export namespace Category {
		export async function getMany() {
			return prisma.awardCategory.findMany();
		}

		export async function find(id: number) {
			return prisma.awardCategory.findUnique({ where: { id } });
		}

		export async function save(data: Prisma.AwardCategoryCreateInput) {
			return prisma.awardCategory.create({ data });
		}

		export async function update(
			id: number,
			data: Prisma.AwardCategoryUpdateInput
		) {
			return prisma.awardCategory.update({ where: { id }, data });
		}

		export async function remove(id: number) {
			return prisma.awardCategory.delete({ where: { id } });
		}
	}
}
