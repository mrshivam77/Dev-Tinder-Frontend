import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connection from "./components/Connection";
import Requests from "./components/Requests";
import SplashScreen from "./components/SplashScreen"; // Import the SplashScreen
import { useState, useEffect } from "react";
import Premium from "./components/Premium";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500); // Show splash screen for 2.5 seconds
  }, []);

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        {loading ? ( 
          <SplashScreen />
        ) : (
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connection />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premium" element={<Premium/>} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
