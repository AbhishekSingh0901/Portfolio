import { FloatingDock } from "@/components/ui/floating-dock";

import {
  Briefcase,
  FolderGit,
  GraduationCap,
  HomeIcon,
  MailIcon,
  User2Icon,
} from "lucide-react";

const links = [
  {
    title: "Home",
    icon: (
      <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },

  {
    title: "About",
    icon: (
      <User2Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    title: "Skills",
    icon: (
      <Briefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },

  {
    title: "Education",
    icon: (
      <GraduationCap className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    title: "Projects",
    icon: (
      <FolderGit className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
  {
    title: "Contact",
    icon: (
      <MailIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
  },
];
function Navbar() {
  return (
    <div className="absolute z-50 md:my-10 w-fit md:left-1/2 md:bottom-auto md:-translate-x-1/2 dark md:hover:translate-y-1/2 right-8 top-8 transition-all duration-150">
      <FloatingDock items={links} />
    </div>
  );
}

export default Navbar;
