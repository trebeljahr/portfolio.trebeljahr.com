import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function AboutMeBio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto"
    >
      <div className="block mt-10 sm:flex sm:gap-10 sm:mt-20">
        <div id="profile-image" className="w-full sm:w-1/4 mb-7 sm:mb-0">
          <Image
            src="/images/cropped/profile-books-serious.jpeg"
            width="0"
            height="0"
            sizes="(min-width: 1540px) 246px, (min-width: 1280px) 214px, (min-width: 1040px) 166px, (min-width: 780px) 150px, (min-width: 640px) 118px, calc(100vw - 64px)"
            className="w-full h-auto rounded-lg switchero"
            alt="Profile Image Serious"
          />
          <Image
            src="/images/cropped/profile-books-quirky.jpeg"
            width="0"
            height="0"
            sizes="(min-width: 1540px) 246px, (min-width: 1280px) 214px, (min-width: 1040px) 166px, (min-width: 780px) 150px, (min-width: 640px) 118px, calc(100vw - 64px)"
            className="w-full h-auto rounded-lg hide-switchero"
            alt="Profile Image Quirky"
          />
        </div>

        <div className="w-full text-left sm:w-3/4">
          <p className="mb-4 text-lg leading-normal text-ternary-dark dark:text-ternary-light">
            I&apos;m a self-taught fullstack engineer. I built the initial version of a{" "}
            <a href="https://playtiao.com" className="hover-underline-animation">
              multiplayer board game
            </a>{" "}
            in 2 weeks, then continued developing it: real-time gameplay, matchmaking,
            authentication, analytics, payment infrastructure. Before that I worked at the{" "}
            <span className="font-general-semibold">European Space Agency</span>,{" "}
            <span className="font-general-semibold">Klarna</span>,{" "}
            <span className="font-general-semibold">Henkel</span>, and taught 50+ career changers at{" "}
            <span className="font-general-semibold">Ironhack</span>.
          </p>
          <p className="mb-4 text-lg leading-normal text-ternary-dark dark:text-ternary-light">
            I have a portfolio of deployed personal projects, with selected work open source. Among
            them: a{" "}
            <a href="https://fractal.garden" className="hover-underline-animation">
              fractal exhibition
            </a>{" "}
            with interactive parameter controls, a{" "}
            <a href="https://mc.trebeljahr.com" className="hover-underline-animation">
              Minecraft clone
            </a>
            , multiplayer games, 40+ interactive 3D demos, and a published npm CLI tool. I&apos;ve
            shipped production code in TypeScript, Go, Python, and GLSL, usually picking up the
            stack on the job.
          </p>
          <p className="text-lg leading-normal text-ternary-dark dark:text-ternary-light">
            I prefer project-based work with milestone payments. Currently open for new projects.
            For more details,{" "}
            <Link href="/cv" className="hover-underline-animation">
              check out my CV.
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
