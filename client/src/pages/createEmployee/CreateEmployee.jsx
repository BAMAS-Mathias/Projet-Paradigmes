import axios from "axios";
import React from "react";
import { useState } from "react";

const CreateEmployee = () => {
  const [employee, setEmployee] = React.useState({
    name: "",
    position: "",
    level: "",
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
      <p className="font-bold text-2xl">Créer un employé</p>
      <input
        type="text"
        name="name"
        placeholder="Nom"
        onChange={handleChange}
        className="w-max text-[#000000]"
      />
      <input
        type="text"
        name="surname"
        placeholder="Prénom"
        className="w-max text-[#000000]"
      />
      <input
        type="text"
        name="salary"
        placeholder="Salaire"
        className="w-max text-[#000000]"
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        className="w-max text-[#000000]"
        onChange={handleChange}
      />
      <select
        name="level"
        onChange={handleChange}
        className="w-max text-[#000000]"
      >
        <option value="">Select Level</option>
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>
      <button
        type="button"
        className="w-max self-center"
        onClick={() =>
          createEmployee(employee.name, employee.position, employee.level)
        }
      >
        Créer
      </button>
    </form>
  );
};

export default CreateEmployee;
