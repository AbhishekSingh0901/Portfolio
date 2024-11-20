import { HoverEffect } from "@/components/ui/card-hover-effect";
import SectionHeading from "@/components/ui/section-heading";
import { sanityClient } from "@/utils/sanity.config";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface SkillData {
  title?: string;
  imgUrl?: SanityImageSource;
}

function Skills() {
  const [skills, setSkills] = useState<SkillData[]>([]);

  useEffect(() => {
    sanityClient
      .fetch<SkillData[]>(`*[_type == "skills"]`)
      .then((data) => {
        setSkills(data);
      })
      .catch((error) => console.error("Error fetching about data:", error));
  }, []);

  return (
    <div className="absolute z-30 h-screen w-screen p-6 mt-8 text-white overflow-y-scroll cool-scroll">
      <SectionHeading heading="My Skills" />
      <div className="mt-32 md:mt-44 lg:mt-52 2xl:mt-60">
        <motion.h3
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { delay: 0.05 } }}
          className="text-3xl md:text-4xl lg:text-5xl"
        >
          <span className="bg-gradient-to-br from-red-500 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
            <span className="border-b-4 border-red-500">Tech</span>
            nical
          </span>{" "}
          skills / experience
        </motion.h3>
      </div>
      <HoverEffect items={skills} className="max-w-5xl mt-10 mx-auto" />
    </div>
  );
}

export default Skills;
