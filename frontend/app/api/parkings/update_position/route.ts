import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const { name, position, status } = req.body;

	try {
		const updatedParking = await prisma.parking.update({
			where: {
				name: name as string,
			},
			data: {
				[getPositionColumn(position)]: status as number,
			},
		});

		res.status(200).json({
			message: `Status updated for position ${position} of parking ${name}`,
		});
	} catch (error) {
		console.error('Error updating status:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	} finally {
		await prisma.$disconnect();
	}
}

function getPositionColumn(position: number): string {
	return `position${position}`;
}
