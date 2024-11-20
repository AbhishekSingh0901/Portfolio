import { Spotlight } from "@/components/ui/spotlight";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative h-screen w-screen bg-neutral-900 antialiased bg-grid-white/[0.05] overflow-hidden ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Navbar />
      <Outlet />
    </div>
  );
}
