import axios from "axios";
import { useEffect, useState } from "react";
import Employee from "./Employee";
import "./employee.css";
import UserDetails from "./UserDetails";
const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const [userDetailsId, setUserDetailsId] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/employees/")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/employees/" + id)
      .then((response) => {
        setUserList(userList.filter((user) => user._id !== id));
        setUserDetailsId(null);
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  return (
    <>
      <input type="text" className="opacity-100 h-10 min-w-[450px] mb-5" />
      <div className="employee-grid">
        {userList.map((employee, index) => (
          <Employee
            key={index}
            employee={employee}
            onclick={() => setUserDetailsId(employee._id)}
          />
        ))}
      </div>
      {userDetailsId != null && (
        <UserDetails
          _id={userDetailsId}
          closeMenu={() => setUserDetailsId(null)}
          deleteUser={deleteUser}
        />
      )}
    </>
  );
};

export default Dashboard;
