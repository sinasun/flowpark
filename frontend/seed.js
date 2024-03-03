import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient();

async function main() {
	await prisma.parking.createMany({
		data: [
			{
				name: 'parking1',
				position1: 1,
				position2: 1,
				position3: 1,
				position4: 1,
				position5: 1,
				position6: 1,
				position7: 1,
				position8: 1,
			},
			{
				name: 'parking2',
				position1: 1,
				position2: 1,
				position3: 1,
				position4: 1,
				position5: 1,
				position6: 1,
				position7: 1,
				position8: 1,
			},
			{
				name: 'parking3',
				position1: 1,
				position2: 1,
				position3: 1,
				position4: 1,
				position5: 1,
				position6: 1,
				position7: 1,
				position8: 1,
			},
			{
				name: 'parking4',
				position1: 1,
				position2: 1,
				position3: 1,
				position4: 1,
				position5: 1,
				position6: 1,
				position7: 1,
				position8: 1,
			},
		],
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
