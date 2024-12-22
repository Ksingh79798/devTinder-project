/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// existing friends here
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("allconnections:-", res);
      dispatch(addConnections(res?.data));
    } catch (err) {
      // Handle error Case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  console.log(connections);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, photoUrl, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row md:w-11/12 items-center   m-4 p-4 rounded-lg bg-base-300 w-full mx-auto"
          >
            <div className="my-1 md:w-3/12  lg:w-2/12">
              <img
                className="w-32 rounded-full object-cover h-32"
                alt="photo"
                src={photoUrl}
              ></img>
            </div>
            <div className="text-left mx-2 w-9/12 lg:w-9/12 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
