"use client";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/GridPattern";

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div layout className="relative isolate flex w-full flex-col pt-9">
      <GridPattern
        className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        yOffset={-96}
        interactive
      />

      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </motion.div>
  );
}
