/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice.jsx";
import { useEffect } from "react";
import UserCard from "./UserCard.jsx";
const Feed = () => {
  // read the feed
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  // console.log("feed data:-", feedData);
  // console.log(useSelector((store) => store.feed));

  const getFeed = async () => {
    if (feedData) return;

    // if feed is null then make api call
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log("feed:", res);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  // get the feed 1st time as soon as the page load
  useEffect(() => {
    getFeed();
  }, []);

  if (!feedData) return;
  if (feedData.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found</h1>;
  return (
    feedData && (
      <div className="flex justify-center my-10">
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
