import { FlipWords } from "@/components/ui/flip-words";

const words = [
  "Frontend developer",
  "Fullstack developer",
  "Designer",
  "Problem Solver",
];
function CodeEfftect() {
  return (
    <div className="text-xl md:text-4xl mt-4 lg:mt-8  mb-4 dark font-normal text-neutral-200 dark:text-neutral-200 font-rubik">
      a <FlipWords words={words} />
    </div>
  );
}

export default CodeEfftect;
