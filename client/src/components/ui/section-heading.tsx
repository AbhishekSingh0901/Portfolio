import { motion } from "framer-motion";

function SectionHeading({ heading }: { heading: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="relative font-caveat mt-20 md:mt-0 font-bold text-3xl md:text-4xl lg:text-5xl -rotate-12 items-center">
        {heading}
        <img className="absolute left-20" src="/assets/downArr.svg" />
      </h3>
    </motion.div>
  );
}

export default SectionHeading;
