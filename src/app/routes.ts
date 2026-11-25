import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Works } from "./pages/Works";
import { WorkList } from "./pages/WorkList";
import { WorkDetail } from "./pages/WorkDetail";
import { DesignValue } from "./pages/DesignValue";
import { ExperienceValue } from "./pages/ExperienceValue";
import { Contact } from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "works", Component: Works },
      { path: "works/:cat", Component: WorkList },
      { path: "works/:cat/:item", Component: WorkDetail },
      { path: "design-value", Component: DesignValue },
      { path: "experience-value", Component: ExperienceValue },
      { path: "contact", Component: Contact },
    ],
  },
]);