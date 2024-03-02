import { Link } from '@nextui-org/link';
import { button as buttonStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { GithubIcon } from '@/components/icons';

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center"></div>

			<div className="flex gap-3">
				<Link
					isExternal
					className={buttonStyles({ variant: 'bordered', radius: 'full' })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>
		</section>
	);
}
