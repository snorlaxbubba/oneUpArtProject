import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import RouteGuard from "./RouteGuard";

import Login from "./Login";
import Profile from "./PrivateComponents/Profile/Profile";
import NavBar from "./publicComponents/Nav/NavBar";
import Paint from './publicComponents/Paint';
import Art from "./publicComponents/Art";
import EditArt from "./publicComponents/EditArt";
import NewPost from "./PrivateComponents/NewPost";

import Home from "./publicComponents/Home/Home";

const amplifyConfig = {
  Auth: {
    mandatorySignIn: false,
    region: import.meta.env.VITE_APP_REGION,
    userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    // identityPoolId: import.meta.env.VITE_APP_IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: import.meta.env.VITE_APP_API_URL,
        region: import.meta.env.VITE_APP_REGION,
      },
    ],
  },
};
Amplify.configure(amplifyConfig);

export default function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <Profile />
                </RouteGuard>
              }
            />
            <Route path="/new-post" element={<RouteGuard><NewPost /></RouteGuard>} />

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/art" element={<Art />} />
            <Route path="/edit-art" element={<EditArt />} />
            <Route path="/paint" element={<Paint />} />

          </Routes>
        </main>
      </BrowserRouter>
    </Authenticator.Provider>
  );
}