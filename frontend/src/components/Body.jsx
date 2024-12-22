import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  // console.log(userData);
  // console.log(useSelector((store) => store.user));
  const fetchUser = async () => {
    if (userData) return;
    try {
      // make  Db api call
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // update the store
      dispatch(addUser(res?.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
