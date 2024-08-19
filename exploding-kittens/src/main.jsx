import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import GamePage from "./routes/GamePage";
import MainMenu from "./routes/MainMenu";
import GameLobby from "./routes/GameLobby";


//Refactor this so routes have correct children routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "gamePage",
    element: <GamePage/>,
  },
  {
    path: "mainMenu",
    element: <MainMenu/>,
  },
  {
    path: "gameLobby",
    element: <GameLobby/>,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);