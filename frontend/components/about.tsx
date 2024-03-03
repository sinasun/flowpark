import React from 'react';
import { Image } from '@nextui-org/react';
const About = () => {
	return (
		<div className="mt-10  flex flex-col items-center ">
			<Image
				isZoomed={true}
				width={600}
				height={600}
				alt="about image"
				src="/images/about_image.png"
			></Image>
			<div className="flex flex-col lg:flex-row mt-24">
				<div className="flex flex-col mr-8">
					<h1 className="mb-8 font-bold  text-2xl lg:text-5xl">
						Get Notified in Seconds
					</h1>
					<p className="text-lg">
						Flow Park is sonar based application that provides precise
						monitoring of parking availability and real-time vehicle detection,
						improving the parking experience. Flow Park makes it possible to
						identify open spots in real time, which cuts down on distress and
						search time while also possibly saving fuel use. Flow Park 
						provides regular drivers with an easy and effective parking
						solution, whether they are navigating busy parking lots or city
						streets.
					</p>
				</div>
				<Image
					src="/images/empty_parking.jpg"
					alt="Empty parking"
					className="lg:max-w-2xl"
				/>
			</div>
			<div className="flex flex-col lg:flex-row-reverse mt-24">
				<div className="flex flex-col ml-8">
					<h1 className="mb-8 font-bold  text-2xl lg:text-5xl">
						All Parking Areas in one Place
					</h1>
					<p className="text-lg">
						You can easily switch between different parkings, to see which one
						has an available spot. You&apos;re not only limited to one location,
						but all parkings around the town.
					</p>
				</div>
				<Image
					src="/images/parking_example.jpg"
					alt="Empty parking"
					className="lg:max-w-xl"
				/>
			</div>
		</div>
	);
};

export default About;
