import { Badge } from "@/components/ui/badge";
import GlassCard from "@/components/ui/glass-card";
import SectionHeading from "@/components/ui/section-heading";
import { sanityClient } from "@/utils/sanity.config";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import GlassCardSkeleton from "@/components/ui/glass-card-skeleton";

export interface EducationType {
  degree?: string;
  institution?: string;
  startDate?: string;
  gpa?: number;
  url?: string;
  logo?: SanityImageSource;
  endDate?: string;
}

export interface ExperienceType {
  company?: string;
  position?: string;
  logo?: SanityImageSource;
  url?: string;
  startDate?: string;
  endDate?: string;
}
function Education() {
  const [education, setEducation] = useState<EducationType[]>([]);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [educationLoading, setEducationLoading] = useState(true);
  const [experienceLoading, setExperienceLoading] = useState(true);

  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source: SanityImageSource): string {
    return builder.image(source).url();
  }
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "education"]`)
      .then((data) => {
        setEducation(data);
      })
      .finally(() => setEducationLoading(false));
    sanityClient
      .fetch(`*[_type == "experience"]`)
      .then((data) => {
        setExperience(data);
      })
      .finally(() => setExperienceLoading(false));
  }, []);
  return (
    <div className="absolute z-30 h-screen w-screen p-6 mt-8 text-white overflow-y-scroll cool-scroll">
      <SectionHeading heading="My Education" />
      <div className="mt-32 md:mt-44 lg:mt-52 2xl:mt-60">
        <motion.h3
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { delay: 0.05 } }}
          className="text-3xl md:text-4xl lg:text-5xl"
        >
          The{" "}
          <span className="bg-gradient-to-br from-red-500 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
            <span className="border-b-4 border-red-500">Learn</span>
            ing
          </span>{" "}
          and Experience.
        </motion.h3>
      </div>
      <div className="grid lg:grid-cols-2 md:w-2/3 lg:w-full max-w-6xl mx-auto gap-10 my-14">
        <div className="flex flex-col gap-3">
          <Badge className="w-fit bg-red-600">EDUCATION</Badge>
          {educationLoading
            ? [1, 2].map((_, idx) => <GlassCardSkeleton key={idx} />)
            : education.map((edu, idx) => (
                <GlassCard
                  key={edu.institution}
                  title={edu.institution}
                  link={edu.url}
                  description={edu.degree}
                  logo={edu.logo ? urlFor(edu.logo) : undefined}
                  startDate={edu.startDate}
                  endDate={edu.endDate}
                  idx={idx}
                />
              ))}
        </div>
        <div className="flex flex-col gap-3">
          <Badge className="w-fit bg-red-600">EXPERIENCE</Badge>
          {experienceLoading
            ? [1, 2].map((_, idx) => <GlassCardSkeleton key={idx} />)
            : experience.map((exp, idx) => (
                <GlassCard
                  idx={idx}
                  key={exp.company}
                  title={exp.company}
                  description={exp.position}
                  logo={exp.logo ? urlFor(exp.logo) : undefined}
                  startDate={exp.startDate}
                  endDate={exp.endDate}
                  link={exp.url}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Education;
