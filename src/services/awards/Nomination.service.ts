import { Prisma } from '@prisma/client';
import { prisma } from '../../database/Database.service';

export namespace Awards {
	export namespace Nomination {
		export async function getMany(id: number) {
			return prisma.awardCategory.findUnique({
				where: { id },
				include: { nominations: true },
			});
		}

		export async function save(
			data: Prisma.AwardNominationUncheckedCreateInput
		) {
			return prisma.awardNomination.create({
				data,
				include: { category: true },
			});
		}

		export async function update(
			id: number,
			data: Prisma.AwardNominationUpdateInput
		) {
			return prisma.awardNomination.update({ where: { id }, data });
		}

		export async function remove(id: number) {
			return prisma.awardNomination.delete({ where: { id } });
		}
	}
}
