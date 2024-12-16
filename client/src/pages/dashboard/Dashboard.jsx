import axios from "axios";
import { useEffect, useState } from "react";
import Employee from "./Employee";
import "./employee.css";
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
    <>
      <input type="text" className="opacity-100 h-10 min-w-[450px] mb-5" />
      <div className="employee-grid">
        {userList.map((employee, index) => (
          <Employee key={index} employee={employee} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
