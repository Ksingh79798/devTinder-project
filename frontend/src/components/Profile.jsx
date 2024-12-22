import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  return (
    user /* only be called if the user is present */ && (
      <>
        <EditProfile user={user} />
      </>
    )
  );
};

export default Profile;
