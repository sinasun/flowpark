import { Link } from '@nextui-org/link';

import { button as buttonStyles } from '@nextui-org/theme';
import { Card, CardFooter, Image, Button } from '@nextui-org/react';

export default function Dashboard() {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-around">
				<Card isFooterBlurred radius="lg" className="border-none">
					<Image
						alt="Parking image"
						className="object-cover p-2"
						height={800}
						src="/images/parking.jpg"
						width={200}
					/>
					<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
						<p className="text-tiny text-white/80">Parking 1</p>
						<Link href="/dashboard/parking1">
							<Button
								className="text-tiny text-white bg-black/20"
								variant="flat"
								color="default"
								radius="lg"
								size="sm"
							>
								See parking
							</Button>
						</Link>
					</CardFooter>
				</Card>

				<Card isFooterBlurred radius="lg" className="border-none">
					<Image
						alt="Parking image"
						className="object-cover p-2"
						height={800}
						src="/images/parking.jpg"
						width={200}
					/>
					<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
						<p className="text-tiny text-white/80">Parking 2</p>
						<Link href="/dashboard/parking2">
							<Button
								className="text-tiny text-white bg-black/20"
								variant="flat"
								color="default"
								radius="lg"
								size="sm"
							>
								See parking
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
			<div className="flex flex-row justify-around mt-10">
				<Card isFooterBlurred radius="lg" className="border-none">
					<Image
						alt="Parking image"
						className="object-cover p-2"
						height={800}
						src="/images/parking.jpg"
						width={200}
					/>
					<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
						<p className="text-tiny text-white/80">Parking 3</p>
						<Link href="/dashboard/parking3">
							<Button
								className="text-tiny text-white bg-black/20"
								variant="flat"
								color="default"
								radius="lg"
								size="sm"
							>
								See parking
							</Button>
						</Link>
					</CardFooter>
				</Card>

				<Card isFooterBlurred radius="lg" className="border-none">
					<Image
						alt="Parking image"
						className="object-cover p-2"
						height={800}
						src="/images/parking.jpg"
						width={200}
					/>
					<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
						<p className="text-tiny text-white/80">Parking 4</p>
						<Link href="/dashboard/parking4">
							<Button
								className="text-tiny text-white bg-black/20"
								variant="flat"
								color="default"
								radius="lg"
								size="sm"
							>
								See parking
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
