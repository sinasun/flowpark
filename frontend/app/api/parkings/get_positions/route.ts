// pages/api/getPositionValues.js

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	const { name } = await request.json();
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
	try {
		const parking = await prisma.parking.findUnique({
			where: {
				name: name as string,
			},
			select: {
				id: true,
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

		// Extracting position values into an array
		const positionValues = Object.values(parking);

		NextResponse.json({ positionValues });
	} catch (error) {
		console.error('Error fetching position values:', error);
	} finally {
		await prisma.$disconnect();
	}
}
