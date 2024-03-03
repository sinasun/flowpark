"use client";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import About from "@/components/about";
import Statement from "@/components/statement";
import Solution from "@/components/solution";
import { TypewriterEffectSmooth } from "@/components/type-writer";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const user = session && session.user;
  const words = [
    {
      text: "Imagine",
    },
    {
      text: "a",
    },
    {
      text: "Society",
    },
    {
      text: "Where",
    },
    {
      text: "Finding",
    },
    {
      text: "Parking",
    },
    {
      text: "is",
    },
    {
      text: "Effortless!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const router = useRouter();

  const handleButtonClick = async () => {
    if (session?.user) {
      router.push("/dashboard");
    } else {
      await signIn("auth0", {
        callbackUrl: "/dashboard",
      });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col text-center justify-center">
        <TypewriterEffectSmooth words={words} />
        <p className="mt-4">
          <strong>Flow Park</strong> provides real-time data about parking
          spot around you.
        </p>
      </div>

      <div className="flex gap-3 mt-12">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
        <Button color="primary" onClick={handleButtonClick} variant="flat">
          Access the App
        </Button>
      </div>

      <div className=" flex flex-row ml-auto">
        <About />
      </div>

      <div>
        <Statement />
      </div>

      <div>
        <Solution />
      </div>
    </section>
  );
}
