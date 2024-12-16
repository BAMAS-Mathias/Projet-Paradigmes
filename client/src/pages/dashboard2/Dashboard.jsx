import axios from "axios";
import { useEffect, useState } from "react";
import Employee from "../dashboard/Employee";

const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const [poste, setPoste] = useState("");
  const [salaireMin, setSalaireMin] = useState(0);
  const [salaireMax, setSalaireMax] = useState(0);
  const [experienceFilter, setExperienceFilter] = useState([]);

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

  const handleSearch = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/employees/search/", {
        level: experienceFilter,
        salaire: {
          min: parseInt(salaireMin),
          max: parseInt(salaireMax),
        },
        poste: poste,
      })
      .then((response) => {
        setUserList(response.data);
      });
  };

  const handleCheckboxChange = (event, level) => {
    const { name, checked } = event.target;
    setExperienceFilter((prev) => {
      if (checked) {
        return [...prev, level];
      } else {
        return prev.filter((item) => item !== level);
      }
    });
  };

  useEffect(() => {
    handleSearch();
  }, [experienceFilter, salaireMin, salaireMax, poste]);

  return (
    <>
      <div className="items-center justify-center w-screen h-full ">
        <div className="bg-[#100e0e] w-full h-[230px] px-12 pt-10 overflow-hidden relative">
          <p className="text-white text-3xl font-medium w-[700px] ">
            Vous cherchez un nouvel employé ?
          </p>

          <form
            action={handleSearch}
            className="flex bg-white rounded-full items-center mt-7 h-16 z-10 relative"
          >
            <svg
              className="h-8 w-8 opacity-50 fill-[#3F3F3F] ml-10"
              viewBox="0 -960 960 960"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <input
              type="input"
              className="w-full h-full bg-transparent px-2 text-[#100e0e] focus:outline-none z-10"
              placeholder="Nom du poste"
              onChange={(e) => {
                setPoste(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-[#0084f8] mr-2 h-[80%] text-sm rounded-full px-10 z-[99]"
              onClick={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              Rechercher
            </button>
          </form>

          <img
            className="absolute blur-sm rounded-full right-[10%] w-[850px] h-[400px] object-cover top-5 opacity-20"
            src="https://media.istockphoto.com/id/1384110533/photo/asian-male-director-is-interviewing-to-recruit-new-employees.jpg?s=612x612&w=0&k=20&c=rR1-wkWClaIfcH7vwut8L2AXK3LML2RLQ-xZ60ZrwEE="
          ></img>
        </div>
      </div>
      <p className="px-12 py-10 text-2xl font-semibold text-[#100e0e] ">
        Liste des employés ({userList.length})
      </p>
      <div className="w-full h-screen flex">
        <div className="h-full w-[25%] text-[#100e0e] ">
          <div className="pl-12 pr-4">
            <p className="font-semibold pb-2">Expérience</p>
            <div className="flex items-center gap-2 text-sm">
              <input
                className="rounded"
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, "junior")}
              ></input>
              <p>Junior</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <input
                className="rounded"
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, "mid")}
              ></input>
              <p>Intermediare</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <input
                className="rounded"
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, "senior")}
              ></input>
              <p>Senior</p>
            </div>

            <p className="font-semibold pb-2 mt-5">Salaire minimum</p>
            <input
              className="px-2"
              type="number"
              onChange={(e) => setSalaireMin(e.target.value)}
            ></input>

            <p className="font-semibold pb-2 mt-5">Salaire maximum</p>
            <input
              className="px-2"
              type="number"
              onChange={(e) => setSalaireMax(e.target.value)}
            ></input>

            <button
              onClick={handleSearch}
              className="w-full bg-[#0084f8] text-white text-sm py-2 mt-4 rounded"
            >
              Rechercher
            </button>
          </div>
        </div>
        <div className="h-full w-full px-4 py-4 pr-16 ">
          <div className="employee-grid">
            {userList.map((employee, index) => (
              <Employee key={index} employee={employee} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
