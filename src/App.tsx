import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import "./assets/styles/App.css";
import LyricsPage from "./pages/LyricsPage/LyricsPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";

type TRouteItem = RouteObject;

const routes: TRouteItem[] = [
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "/lyrics/track/:id",
    element: <LyricsPage />,
  },
];

function App() {
  return useRoutes([{ path: "/", element: <MainLayout />, children: routes }]);
}

export default App;
