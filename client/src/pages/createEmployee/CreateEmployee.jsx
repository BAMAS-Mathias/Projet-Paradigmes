import axios from "axios";
import React from "react";
import { useState } from "react";

const CreateEmployee = () => {
  const [employee, setEmployee] = React.useState({
    name: "",
    position: "",
    level: "",
    salary: Number,
    description: "",
    surname: "",
  });

  const [isCreating, setIsCreating] = useState(false);

  const createEmployee = (nom, position, level) => {
    setIsCreating(true);
    axios
      .post(import.meta.env.VITE_API_URL + "/employees/", {
        name: nom,
        position: position,
        level: level.toLowerCase(),
      })
      .then(() => {
        setIsCreating(false);
      })
      .catch((error) => {
        setIsCreating(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  return (
    <form className="flex flex-col p-5 gap-y-2 w-fit">
      <p className="font-bold text-2xl self-center mb-2">Créer un employé</p>
      <input
        type="text"
        name="name"
        placeholder="Nom"
        onChange={handleChange}
        className="w-max text-[#000000] rounded-md p-1"
      />
      <input
        type="text"
        name="surname"
        placeholder="Prénom"
        className="w-max text-[#000000] rounded-md p-1"
        onChange={handleChange}
      />
      <input
        type="text"
        name="salary"
        placeholder="Salaire"
        className="w-max text-[#000000] rounded-md p-1"
        onChange={handleChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        className="w-max text-[#000000] rounded-md p-1"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="w-max text-[#000000] rounded-md p-1"
        onChange={handleChange}
      />
      <select
        name="level"
        onChange={handleChange}
        className="w-max text-[#000000] rounded-md p-1"
      >
        <option value="">Select Level</option>
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
      <button
        type="button"
        className="w-max self-center mt-2"
        onClick={() =>
          createEmployee(employee.name, employee.position, employee.level)
        }
      >
        {isCreating ? "Création..." : "Créer"}
      </button>
    </form>
  );
};

export default CreateEmployee;
