import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Exploding kittens</h1>
          <nav>
            <ul>
              <li>
                <a href={`/gamePage`}>Finish navbar later</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
        <Outlet />
      </div>
      </>
    );
  }