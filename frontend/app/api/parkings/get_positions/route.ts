// pages/api/getPositionValues.js

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'GET') {
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
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const { name } = req.query;

	try {
		const parking = await prisma.parking.findUnique({
			where: {
				name: name as string, 
			},
			select: {
				position1: true,
				position2: true,
				position3: true,
				position4: true,
				position5: true,
				position6: true,
				position7: true,
				position8: true,
			},
		});

		if (!parking) {
			return res.status(404).json({ message: 'Parking not found' });
		}

		// Extracting position values into an array
		const positionValues = Object.values(parking);

		res.status(200).json({ positionValues });
	} catch (error) {
		console.error('Error fetching position values:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	} finally {
		await prisma.$disconnect();
	}
}
