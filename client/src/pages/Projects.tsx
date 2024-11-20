import ProjectContent from "@/components/ProjectContent";
import SectionHeading from "@/components/ui/section-heading";
import { sanityClient } from "@/utils/sanity.config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// interface projectData {
//   title: string;
// }

function Projects() {
  const [projectsData, setProjectsData] = useState();

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "project"]`)
      .then((data) => {
        setProjectsData(data);
      })
      .catch((error) => console.error("Error fetching about data:", error));
  }, []);
  // console.log(projectsData);
  return (
    <div className="absolute z-30 h-screen w-screen p-6 mt-8 text-white overflow-y-scroll cool-scroll">
      <SectionHeading heading="My Projects" />
      <div className="mt-32 md:mt-44 lg:mt-52 2xl:mt-60">
        <motion.h3
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0, transition: { delay: 0.05 } }}
          className="text-3xl md:text-4xl lg:text-5xl"
        >
          Cool{" "}
          <span className="bg-gradient-to-br from-red-500 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
            <span className="border-b-4 border-red-500">Pro</span>
            jects
          </span>{" "}
          made during my learning journey
        </motion.h3>
      </div>
      <div className=" max-w-6xl mx-auto gap-10 mt-8">
        {projectsData && <ProjectContent data={projectsData} />}
        {/* <Timeline data={data} /> */}
      </div>
    </div>
  );
}

export default Projects;
