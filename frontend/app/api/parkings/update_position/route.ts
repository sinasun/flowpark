import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	const { name, position, status } = await request.json();

	try {
		const updatedParking = await prisma.parking.update({
			where: {
				name: name,
			},
			data: {
				[getPositionColumn(position)]: status as number,
			},
		});

		NextResponse.json({
			message: `Status updated for position ${position} of parking ${name}`,
		});
	} catch (error) {
		console.error('Error updating status:', error);
	} finally {
		await prisma.$disconnect();
	}
}

function getPositionColumn(position: number): string {
	return `position${position}`;
}
