import React from "react";
import {RouteObject, useRoutes} from "react-router-dom";
import LyricsPage from "./pages/LyricsPage/LyricsPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import SearchedTracksPage from "./pages/SearchedTracksPage/SearchedTracksPage";
import "./assets/styles/App.css";

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
  {
    path: "/search/tracks/:searchValue",
    element: <SearchedTracksPage />,
  },
];

function App() {
  return useRoutes([{ path: "/", element: <MainLayout />, children: routes }]);
}

export default App;
