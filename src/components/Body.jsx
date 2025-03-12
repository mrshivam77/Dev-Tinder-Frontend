import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if (userData) return;
      const res = await axios.get(BASEURL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      navigate("/login");
      console.log(error);
      
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []); // Run once on mount

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
     <div
  className="absolute inset-0 -z-10"
  style={{
    backgroundImage: `url(${"https://plus.unsplash.com/premium_photo-1680404114169-e254afa55a16?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    imageRendering: "crisp-edges"
  }}
></div>


      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <NavBar />
      </div>

      {/* Add padding so content doesn't hide under navbar */}
      <div className="flex flex-col justify-between pt-20">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Body;
