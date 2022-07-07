import { NextPage } from "next";
import { useContext } from "react";
import { UserContext } from "../auth";

const Dashboard: NextPage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div>
        dashboard : {user.currentUser.firstName} {user.currentUser.lastName}
      </div>
    </>
  );
};

export default Dashboard;
