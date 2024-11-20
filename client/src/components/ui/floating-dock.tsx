import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Define item type for props
interface DockItem {
  title: string;
  icon: React.ReactNode;
}

interface FloatingDockProps {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) => {
  const location = useLocation();

  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        pathname={location.pathname}
      />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

interface FloatingDockMobileProps {
  items: DockItem[];
  className?: string;
}

const FloatingDockMobile = ({ items, className }: FloatingDockMobileProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute right-full mr-2 top-0 bottom-0 flex flex-row-reverse gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  to={
                    item.title.toLowerCase() === "home"
                      ? "/"
                      : `/${item.title.toLowerCase()}`
                  }
                  className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400 -rotate-90" />
      </button>
    </div>
  );
};

interface FloatingDockDesktopProps {
  items: DockItem[];
  className?: string;
  pathname: string;
}

const FloatingDockDesktop = ({
  items,
  className,
  pathname,
}: FloatingDockDesktopProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "hidden mx-auto md:flex h-16 gap-4 items-end rounded-2xl glass-effect px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          pathname={pathname}
          mouseX={mouseX}
          key={item.title}
          {...item}
        />
      ))}
    </motion.div>
  );
};

interface IconContainerProps extends DockItem {
  mouseX: MotionValue;
  pathname: string;
}

function IconContainer({ mouseX, title, icon, pathname }: IconContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link to={title.toLowerCase() === "home" ? "/" : title.toLowerCase()}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`aspect-square rounded-full ${
          pathname.includes(title.toLowerCase()) ||
          (pathname == "/" && title.toLowerCase() === "home")
            ? "bg-gradient-to-br from-red-800 via-pink-800 to-indigo-800"
            : "bg-neutral-800"
        } flex items-center justify-center relative`}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
