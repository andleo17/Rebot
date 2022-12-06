import { Prisma } from '@prisma/client';
import { prisma } from '../database/Database.service';

export namespace AmigoSecretoService {
	export async function estaParticipando(id: string) {
		const participant = await prisma.amigoSecreto.findUnique({ where: { id } });
		return participant !== null;
	}

	export async function addParticipant(data: Prisma.AmigoSecretoCreateInput) {
		return prisma.amigoSecreto.create({ data });
	}

	export async function deleteParticipant(id: string) {
		return prisma.amigoSecreto.delete({ where: { id } });
	}

	export async function listParticipants() {
		return prisma.amigoSecreto.findMany();
	}

	export async function chocolatear() {
		const participants = await prisma.amigoSecreto.findMany();
		let pool = [...participants];

		for (const p of participants) {
			const filteredList = pool.filter((par) => par.id !== p.id);
			const amigoSecretoIndex = Math.floor(Math.random() * filteredList.length);
			const amigoSecreto = filteredList.at(amigoSecretoIndex);

			pool = pool.filter((par) => par.id !== amigoSecreto!.id);

			await prisma.amigoSecreto.update({
				where: { id: p.id },
				data: { amigo: amigoSecreto!.id },
			});
		}
	}
}
