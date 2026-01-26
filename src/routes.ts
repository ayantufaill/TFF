import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { TrainingPage } from "./pages/TrainingPage";
import { DonatePage } from "./pages/DonatePage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "programs", Component: ProgramsPage },
      { path: "training", Component: TrainingPage },
      { path: "donate", Component: DonatePage },
      { path: "get-involved", Component: GetInvolvedPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
