import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./Layout";
import Skills from "./pages/Skills";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { SkeletonTheme } from "react-loading-skeleton";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "skills",
        element: <Skills />,
      },
      {
        path: "education",
        element: <Education />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
  },
]);

function App() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <RouterProvider router={router} />
    </SkeletonTheme>
  );
}

export default App;
