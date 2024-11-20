import { motion } from "framer-motion";

function AnimatedContact() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#161616"
        viewBox="0 0 24 24"
        strokeWidth={0.08}
        stroke="#f5f5f5"
        className=" w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="#fc015d"
        strokeWidth={3}
        stroke="#ffffff"
        className=" w-1/3 h-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 256 256"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5,
            delay: 1,
          }}
          d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.42,29.84l85.62,40.55,40.55,85.62A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14L118.42,148.9l47.24-47.25a8,8,0,0,0-11.31-11.31L107.1,137.58,24,98.22l.14,0L216,40Z"
        ></motion.path>
      </motion.svg>
    </>
  );
}

export default AnimatedContact;
