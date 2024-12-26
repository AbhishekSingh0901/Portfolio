import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/utils/sanity.config";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { motion } from "framer-motion";

interface ProjectDescription {
  _key: string;
  children: { text: string }[];
}

interface Project {
  title: string;
  description: ProjectDescription[];
  images?: SanityImageSource[];
}

interface ProjectContentProps {
  data: Project[];
}

function ProjectContent({ data }: ProjectContentProps) {
  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source: SanityImageSource): string {
    return builder.image(source).url();
  }

  const timelineData = data.map((project) => ({
    title: project.title,
    content: (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.08, delay: 0.15 }}
        viewport={{ once: true }}
      >
        <ul
          className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8"
          style={{ listStyleType: "circle" }}
        >
          {project.description.map((desc) => (
            <li key={desc._key} className="mb-4">
              <span className="font-medium">{desc.children[0]?.text}</span>
              <span>{desc.children[1]?.text}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-4 mb-5">
          {project.images?.map((image, index) => (
            <img
              key={index}
              src={urlFor(image)}
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            size="sm"
            className="px-6 bg-indigo-800 text-white hover:bg-indigo-800"
          >
            Visit
          </Button>
          <Button size="sm" className="px-6" variant="outline">
            Github
          </Button>
        </div>
      </motion.div>
    ),
  }));

  return <Timeline data={timelineData} />;
}

export default ProjectContent;
