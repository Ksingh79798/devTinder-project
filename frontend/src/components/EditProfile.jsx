/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  // console.log(user);
  // console.log(user?.user?.firstName);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      // clear the toast
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 ">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300  w-96 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title justify-center">Edit Profile</h2>

              {/* First Name */}
              <div>
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
              </div>

              {/* Last Name */}
              <div>
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
              </div>

              {/* age */}
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Age :</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
              </div>

              {/* Gender   */}
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Gender :</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
              </div>

              {/* H.W-make gender shouid be dropdown menu */}
              {/* <details className="dropdown">
                <summary className="btn m-1">Gender :</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <a onClick={() => setGender("male")}>male</a>
                  </li>
                  <li>
                    <a>female</a>
                  </li>
                  <li>
                    <a>other</a>
                  </li>
                </ul>
              </details> */}

              {/* photoUrl*/}
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label grid">
                    <span className="label-text">Photo Url :</span>
                  </div>

                  <input
                    type="text"
                    value={photoUrl}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>

              {/* About*/}
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">About :</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <div className="card-actions justify-center">
                <p className="text-red-500 ">{error}</p>
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, gender, age, photoUrl, about }}
        />
      </div>

      {/* show some notification when data is save or not */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Data Save successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
