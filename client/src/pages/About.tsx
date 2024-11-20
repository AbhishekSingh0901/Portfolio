import SectionHeading from "@/components/ui/section-heading";
import { sanityClient } from "@/utils/sanity.config";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { easeInOut, motion } from "framer-motion";

import { Dna, Globe2Icon, Heart, LanguagesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";

interface AboutData {
  description?: string;
  languages?: string[];
  nationality?: string;
  hobbies?: string[];
  imgUrl?: SanityImageSource; // Replace `any` with the specific type of the image object if you know it
}

export default function About() {
  const [about, setAbout] = useState<AboutData[]>([]);

  useEffect(() => {
    sanityClient
      .fetch<AboutData[]>(`*[_type == "about"]`)
      .then((data) => {
        setAbout(data);
      })
      .catch((error) => console.error("Error fetching about data:", error));
  }, []);

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source: SanityImageSource): string {
    return builder.image(source).url();
  }

  const aboutData = about[0];

  return (
    <div className="absolute z-30 h-screen w-screen p-6 pt-8 text-white overflow-y-scroll cool-scroll">
      <SectionHeading heading="About Me" />
      <div className="mt-32 md:mt-44 lg:mt-52 2xl:mt-60">
        <motion.h3
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { delay: 0.05 } }}
          className="text-3xl md:text-4xl lg:text-5xl"
        >
          Web{" "}
          <span className="bg-gradient-to-br from-red-500 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
            <span className="border-b-4 border-red-500">Dev</span>
            eloper
          </span>
          , based in India
        </motion.h3>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ ease: easeInOut }}
          viewport={{ once: true }}
          className="flex flex-col-reverse md:flex-row max-w-6xl mx-auto my-10 gap-2 glass-effect justify-between items-center md:items-start pt-6"
        >
          <div className="w-full md:w-2/3 text-sm md:text-base px-8 font-thin text-justify">
            <ReactTyped
              strings={[aboutData?.description || "Welcome to my portfolio!"]}
              typeSpeed={8}
              showCursor={true}
            />
            <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 mt-8 gap-3">
              <div className="p-2 flex flex-col gap-2 md:col-span-2 lg:col-span-1">
                <h4 className="flex items-center text-xl gap-2 font-medium border-b border-red-700 p-1">
                  <LanguagesIcon className="text-red-700" /> Languages
                </h4>
                <ul
                  style={{ listStyleType: "circle" }}
                  className="flex gap-10 ml-11"
                >
                  {aboutData?.languages?.map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
              </div>
              <div className="p-2 flex flex-col gap-2">
                <h4 className="flex items-center text-xl gap-2 font-medium border-b border-red-700 p-1">
                  <Globe2Icon className="text-red-700" /> Nationality
                </h4>
                <ul style={{ listStyleType: "circle" }} className="ml-11">
                  {aboutData?.nationality && <li>{aboutData.nationality}</li>}
                </ul>
              </div>
              <div className="p-2 flex flex-col gap-2">
                <h4 className="flex items-center text-xl gap-2 font-medium border-b border-red-700 p-1">
                  <Dna className="text-red-700" /> Gender
                </h4>
                <ul style={{ listStyleType: "circle" }} className="ml-11">
                  <li>Male</li>
                </ul>
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2 p-2">
                <h4 className="flex items-center text-xl gap-2 font-medium border-b border-red-700 p-1">
                  <Heart className="text-red-700" /> Hobbies
                </h4>
                <ul
                  className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-3 ml-11"
                  style={{ listStyleType: "circle" }}
                >
                  {aboutData?.hobbies?.map((hobby) => (
                    <li key={hobby}>{hobby}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="md:h-full flex items-end">
            <img
              className="h-[200px] md:h-[350px] align-bottom"
              src={aboutData?.imgUrl ? urlFor(aboutData.imgUrl) : ""}
              alt="About me"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
