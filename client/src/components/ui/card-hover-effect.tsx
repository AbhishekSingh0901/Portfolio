import { cn } from "@/lib/utils";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AnimatePresence, motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { useState, ReactNode } from "react";
import { sanityClient } from "@/utils/sanity.config";
import { SkillData } from "@/pages/Skills";

// Define types for items in HoverEffect

interface HoverEffectProps {
  items: SkillData[];
  className?: string;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({
  items,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>();
  const builder = imageUrlBuilder(sanityClient);

  function urlFor(source: SanityImageSource): string {
    return builder.image(source).url();
  }
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 py-10 gap-2 md:gap-8 ",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{
            transition: { duration: 0.07, delay: 0.04 * (idx + 1) },
            scale: 1,
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, transition: { duration: 0.08 } }}
          key={item?.title}
          className="relative group flex justify-center items-center p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute  h-full w-40  bg-gradient-to-br from-red-900 via-pink-900 to-indigo-900 block rounded-full"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.5,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="transition-all duration-200 h-36 w-36">
            <h4 className="text-xs md:text-sm font-thin">{item.title}</h4>
            <img
              className="h-10 md:h-12"
              src={item.imgUrl ? urlFor(item.imgUrl) : ""}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// Card Component Props
interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-full p-4 overflow-hidden bg-black glass-effect hover:border-neutral-300 relative z-20 ",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4 flex flex-col justify-center items-center gap-2 ">
          {children}
        </div>
      </div>
    </div>
  );
};
