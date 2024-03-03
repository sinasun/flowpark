export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Park Spoter',
	description: 'UottawaHack.',
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
	],
	navMenuItems: [
		{
			label: 'Dashboard',
			href: '/dashboard',
		},
	],
	links: {
		github: 'https://github.com/sinasun/uottawahack',
	},
};
