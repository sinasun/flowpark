import React from "react";

const Statement = () => {
  return (
    <div className=" mt-10 flex flex-col items-center">
      <h1 className=" mt-8 text-[50px] font-bold mb-8">
        {" "}
        The Problem statement
      </h1>
      <p className="text-[18px] mb-4">
        With the global car population projected to increase significantly (with
        88.5 million units expected in 2024), busy cities and event organizers
        face a growing challenge. Finding a parking spot can be a frustrating,
        time-consuming experience, not just for drivers, but also for the
        environment. Current parking solutions often lack real-time data and
        efficient allocation, leading to:
      </p>
      <ul className="text-[18px]">
        <li className="mb-4">
          <span className="font-bold">Wasted time and frustration:</span>{" "}
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
      </ul>
    </div>
  );
};

export default Statement;
