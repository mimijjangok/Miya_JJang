import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Works } from "./pages/Works";
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
      { path: "design-value", Component: DesignValue },
      { path: "experience-value", Component: ExperienceValue },
      { path: "contact", Component: Contact },
    ],
  },
]);