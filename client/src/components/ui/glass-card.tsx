import { motion } from "framer-motion";
import { Link } from "lucide-react";

interface GlassCardProps {
  title?: string;
  description?: string;
  logo?: string; // Should be a URL string
  link?: string; // Should be a URL string
  startDate?: string;
  endDate?: string;
  idx: number; // Index of the card in the parent component
}
function GlassCard({
  title,
  link,
  startDate,
  endDate,
  description,
  logo,
  idx,
}: GlassCardProps) {
  function formatDate(dateString: string | undefined): string {
    if (!dateString) return ""; // Handle empty strings
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{
        transition: { duration: 0.07, delay: 0.04 * (idx + 1) },
        scale: 1,
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, transition: { duration: 0.08 } }}
      className="flex justify-center p-4"
    >
      <div className=" w-full glass-effect rounded-xl flex flex-col overflow-hidden p-2">
        <div className="flex justify-between items-center">
          <div className=" text-lg font-medium leading-normal text-white border-b border-b-red-700 w-3/4 flex items-center gap-2">
            <img src={logo} className="h-10 rounded-md" />
            <h3>{title}</h3>
          </div>
          <a
            href={link}
            className=" flex text-sm items-center text-neutral-100 bg-transparent border-b border-transparent hover:border-red-600"
          >
            <Link className="h-10" />
          </a>
        </div>
        <div className="flex justify-between items-center pl-8 p-2 mt-5 font-light text-sm">
          <span className="">{description}</span>
          <div className="flex justify-between items-center">
            {formatDate(startDate)}-{formatDate(endDate)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GlassCard;
