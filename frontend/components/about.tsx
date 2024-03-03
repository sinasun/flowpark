import React from "react";
import { Image } from "@nextui-org/react";
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
      <h1 className=" mt-8  mb-8 font-bold text-[60px]  ">Park Spotter</h1>
      <p className="text-[18px]">
        Park Spotter is sonar based application that provides precise monitoring
        of parking availability and real-time vehicle detection, improving the
        parking experience. Park Spotter makes it possible to identify open
        spots in real time, which cuts down on distress and search time while
        also possibly saving fuel use. Park Spotter provides regular drivers
        with an easy and effective parking solution, whether they are navigating
        busy parking lots or city streets.
      </p>
    </div>
  );
};

export default About;
