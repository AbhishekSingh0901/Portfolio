import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import CodeEfftect from "@/components/CodeEfftect";
import { useEffect, useState } from "react";

export default function Home() {
  const [showSpline, setShowSpline] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpline(
        "https://prod.spline.design/vjLtI1U83vSCIUye/scene.splinecode"
      );
    }, 2000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="absolute w-full h-full z-30 p-5 md:p-10">
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-200 font-caveat w-full max-w-6xl p-6 py-24 lg:p-36"
        >
          <h1 className="font-kalam">नमस्ते !</h1>
          <h2 className="font-extrabold relative">
            I'm{" "}
            <span className="bg-gradient-to-br from-red-500 via-pink-500 to-indigo-500 text-transparent bg-clip-text">
              <span className="border-b-2 border-red-500">Ab</span>hishek Singh
            </span>
          </h2>
          <CodeEfftect />
          <motion.button
            initial={{ translateY: 20, opacity: 0 }}
            whileInView={{ translateY: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
            className="text-white font-thin text-base md:text-lg lg:text-xl glass-effect py-2 lg:py-3 px-6 rounded-lg font-rubik cursor-pointer z-50"
          >
            <motion.a
              viewport={{ once: true }}
              href="https://drive.google.com/file/d/15lTNd1jZY-IKJ19WnQneooVgqCZNC4lx/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Get Resume
            </motion.a>
          </motion.button>
        </motion.div>
      </div>

      {showSpline && (
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
          className="absolute bottom-0 md:right-20 md:w-[650px] md:h-full w-full h-[50%] z-40"
        >
          <Spline scene={showSpline} />
        </motion.div>
      )}
    </>
  );
}
