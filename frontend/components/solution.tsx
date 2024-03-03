export const Solution = () => {
	return (
		<div className=" mt-10 flex flex-col items-center">
			<h1 className=" mt-8 text-[50px] font-bold mb-8"> The Solution</h1>
			<p className="text-[18px] mb-4">
				The proposed applications works by using advance low latency sonar rang
				detection systems to assist cities, organizers, and drivers tackle the
				rising problem of parking in our busy society offering a cost effective
				implementation over the competition.
			</p>
			<ul className="text-[18px] mb-4">
				<li>Utilizes advanced low-latency sonar range detection systems</li>
				<li>
					Assists cities, organizers, and drivers in addressing parking
					challenges
				</li>
			</ul>
			<ul className="text-[18px]">
				<li className="mb-4">
					<span className="font-bold">Wasted time and frustration:</span>{' '}
					Drivers spend precious time searching for parking, increasing stress
					and potentially impacting their schedules.
				</li>
				<li className="mb-4">
					<span className="font-bold">Traffic congestion:</span> Circles
					searching for parking contribute to traffic jams, further increasing
					frustration and pollution.
				</li>
				<li className="mb-4">
					<span className="font-bold">Increased emissions:</span> Idling
					vehicles searching for parking contribute to unnecessary emissions,
					harming the environment.
				</li>
				<li>Provides real-time parking information</li>
				<li>Offers a cost-effective solution compared to competitors</li>
			</ul>

			{/*
     
      this is an impact:

      * Improved Efficiency
        Real-time data: By using a cloud-based sonar system, real-time data can be sent to users in order to quickly and effectively direct them to parking spaces that are available.
        Users can obtain precise and current information by utilizing innovative technology such as
        event driven architecture, which cuts down on the time spent looking for parking and increases efficiency overall.

      *Ease of installation
        The sonar system's cloud-based infrastructure simplifies setup 
        and provides users with an easier installation experience. Because of how simple 
        it is to implement, businesses may effectively streamline this operations.


      *Evironmental effective
        By cutting down on the amount of time needed to find parking, FlowPark,  reduces vehicle emissions and carbon footprint. This maximizes the use of parking resources while 
        providing users with substantial financial rewards that are in line with sustainability goals.
      By unitizing cloud base architecture   */}
		</div>
	);
};

export default Solution;
