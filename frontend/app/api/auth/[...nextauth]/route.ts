import NextAuth, { AuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import Auth0Provider from 'next-auth/providers/auth0';

import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/app/api/lib';

const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		Auth0Provider({
			clientId: process.env.AUTH_CLIENT_ID!,
			clientSecret: process.env.AUTH_SECRET_KEY!,
			issuer: process.env.AUTH_DOMAIN,
		}),
	],
	session: { strategy: 'jwt' },
};

function handler(req: NextRequest, res: NextApiResponse) {
	return NextAuth(req as unknown as NextApiRequest, res, authOptions);
}

export { handler as GET, handler as POST };
