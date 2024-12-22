/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

// This is Request page that i have got all the CR
const Requests = () => {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();
  const reviewRequest = async (status, _id) => {
    try {
      // {{Base_Url}}/request/review/accepted/rejected/:id
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      // handle error case
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
      console.log(res);
    } catch (err) {
      //handle error case
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Request Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, photoUrl, gender, about } =
          request?.fromUserId;
        {
          return (
            <div
              key={_id}
              className="flex flex-col md:flex-row md:w-11/12 items-center   m-4 p-4 rounded-lg bg-base-300 w-full mx-auto"
            >
              <div className="my-1 md:w-3/12  lg:w-2/12">
                <img
                  className="w-32  rounded-full object-cover h-32"
                  alt="photo"
                  src={photoUrl}
                ></img>
              </div>
              <div className="text-left mx-4 w-6/12 lg:w-9/12 ">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
              <div className="md:w-3/12 lg:w-2/12 justify-center flex my-1  mx-4">
                <button
                  className="btn btn-primary mx-2 w-28"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary mx-2 w-28"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Requests;
