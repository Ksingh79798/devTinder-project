/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeFeed } from "../utils/feedSlice";

// eslint-disable-next-line react/prop-types
const UserCard = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();
  const token = useSelector((store) => store?.user?.token);

  // eslint-disable-next-line react/prop-types
  const { _id, firstName, lastName, age, about, photoUrl, gender } = user;
  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASEURL +
          "/request/send/" +
          status +
          "/" +
          toUserId,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(removeFeed(toUserId));
      console.log(res);
    } catch (err) {
      // handle error case
    }
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96  shadow-xl">
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + "," + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center m-4">
            <button
              className="btn btn-primary text-white"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary text-white"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
