/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log("Login:->", res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong!");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      // when user signup 1st time then 1st go to profile page
      return navigate("/profile");
    } catch (err) {
      // handle error case
      setError(err?.response?.data || "something went wrong!");
    }
  };
  return (
    <>
      <div className="flex justify-center my-10 ">
        <div className=" card bg-base-100 w-96 shadow-2xl">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "Signup"}
            </h2>

            <div>
              {!isLoginForm && (
                <>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">First Name :</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Last Name :</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </>
              )}

              {/* Email Id */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email Id :</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEmailID(e.target.value)}
                />
              </label>
            </div>

            {/* Password */}
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password :</span>
                </div>
                <input
                  type="password"
                  value={password}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500 ">{error}</p>
            <div className="card-actions justify-center m-2">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Signup"}
              </button>
            </div>
            <p
              className="m-auto py-2 cursor-pointer"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? SignUp here"
                : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
