import axios from "axios";
import { useEffect, useState } from "react";
import Employee from "./Employee";

const Dashboard = () => {
  const [userList, setUserList] = useState([]);

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

  return (
    <div>
      {userList.map((employee, index) => (
        <div key={index}>
          <Employee employee={employee} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
