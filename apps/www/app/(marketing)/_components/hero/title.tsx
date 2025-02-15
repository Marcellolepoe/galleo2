import { motion } from "framer-motion";
import { siteConfig } from "~/lib/site-config";
import { ease } from "./constant";

export function HeroTitle() {
  return (
    <div className="flex w-full max-w-5xl flex-col items-center space-y-4 overflow-hidden">
      <motion.h1
        className="text-center font-medium text-4xl text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        {siteConfig.hero.title.map((text, index) => (
          <motion.span
            key={text}
            className="inline-block text-balance px-1 font-semibold leading-[1.1] tracking-wider md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease,
            }}
          >
            {text}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="mx-auto max-w-4xl text-balance text-center text-lg text-muted-foreground leading-7 sm:text-xl sm:leading-snug"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        {siteConfig.hero.description}
      </motion.p>
    </div>
  );
}
