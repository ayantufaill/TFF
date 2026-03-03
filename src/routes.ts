import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { DownloadsPage } from "./pages/DownloadsPage";
import { ArticlesPage } from "./pages/ArticlesPage";
// Lazy load other routes
const UnderConstructionPage = lazy(() => import("./pages/UnderConstructionPage").then(m => ({ default: m.UnderConstructionPage })));
// Deploy only homepage – other routes commented out
import { AboutPage } from "./pages/AboutPage";
import { DiscoveringIslamPage } from "./pages/DiscoveringIslamPage";
import { PlaylistPage } from "./pages/PlaylistPage";
// import { ProgramsPage } from "./pages/ProgramsPage";
// import { TrainingPage } from "./pages/TrainingPage";
// import { DonatePage } from "./pages/DonatePage";
// import { GetInvolvedPage } from "./pages/GetInvolvedPage";
// import { NotFoundPage } from "./pages/NotFoundPage";

type LazyComponent = React.ComponentType<any>;

const lazyFallback = React.createElement("div", {
  className: "min-h-[40vh] flex items-center justify-center",
  "aria-busy": "true",
}, "Loading...");

function LazyRoute({ Component }: { Component: LazyComponent }) {
  return React.createElement(Suspense, { fallback: lazyFallback }, React.createElement(Component));
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "privacy-policy", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "terms-and-conditions", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "donation-policy", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "refund-policy", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "accessibility-statement", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "impartiality-statement", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "cause-of-tff", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "daily-ayat-hadith", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "azkaar-dua", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "donate", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "volunteer", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "get-help", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "about-us", Component: AboutPage },
      { path: "discovering-islam", Component: DiscoveringIslamPage },
      { path: "programs", Component: () => React.createElement(LazyRoute, { Component: UnderConstructionPage }) },
      { path: "playlist", Component: PlaylistPage },
      { path: "downloads", Component: DownloadsPage },
      { path: "articles", Component: ArticlesPage },
      // { path: "about", Component: AboutPage },
      // { path: "programs", Component: ProgramsPage },
      // { path: "training", Component: TrainingPage },
      // { path: "donate", Component: DonatePage },
      // { path: "get-involved", Component: GetInvolvedPage },
      // { path: "*", Component: NotFoundPage },
      { path: "*", Component: HomePage }, // fallback to home for client demo
    ],
  },
]);
